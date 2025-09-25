const User = require('../models/User');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../utils/tokens');

function buildTokenPair(user) {
  const payload = { id: user._id.toString(), email: user.email, name: user.name, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  return { accessToken, refreshToken };
}

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already in use' });
  const user = await User.create({ name, email, password, role });
  const { accessToken, refreshToken } = buildTokenPair(user);
  user.refreshTokens.push({ token: refreshToken, expiresAt: new Date(Date.now() + 7 * 864e5) });
  await user.save();
  return res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, accessToken, refreshToken });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await user.comparePassword(password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const { accessToken, refreshToken } = buildTokenPair(user);
  // Rotation: invalidate old tokens from same client if provided (optional clientId)
  user.refreshTokens.push({ token: refreshToken, expiresAt: new Date(Date.now() + 7 * 864e5) });
  await user.save();
  return res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, accessToken, refreshToken });
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: 'refreshToken required' });
  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
  const user = await User.findById(payload.id);
  if (!user) return res.status(401).json({ message: 'Invalid refresh token' });
  const exists = user.refreshTokens.some((t) => t.token === refreshToken);
  if (!exists) return res.status(401).json({ message: 'Invalid refresh token' });
  // Rotate: remove used refresh token, issue a new one
  user.refreshTokens = user.refreshTokens.filter((t) => t.token !== refreshToken);
  const { accessToken, refreshToken: newRefreshToken } = buildTokenPair(user);
  user.refreshTokens.push({ token: newRefreshToken, expiresAt: new Date(Date.now() + 7 * 864e5) });
  await user.save();
  return res.json({ accessToken, refreshToken: newRefreshToken });
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: 'refreshToken required' });
  try {
    const payload = verifyRefreshToken(refreshToken);
    const user = await User.findById(payload.id);
    if (!user) return res.status(200).json({ message: 'Logged out' });
    user.refreshTokens = user.refreshTokens.filter((t) => t.token !== refreshToken);
    await user.save();
  } catch (_) {
    // ignore
  }
  return res.json({ message: 'Logged out' });
};

exports.me = async (req, res) => {
  const user = await User.findById(req.user.id).select('name email role');
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};


