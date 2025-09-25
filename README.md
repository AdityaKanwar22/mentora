# Mentora

Mentora is a Node.js Express API with MongoDB (Mongoose), JWT auth (access & refresh), and an MVC structure.

## Scripts

- `npm run dev` — start with nodemon
- `npm start` — start production server
- `npm run lint` — lint
- `npm run lint:fix` — lint with fix
- `npm run format` — format with Prettier

## Environment

Copy `.env.example` to `.env` and set values:

```
PORT=4000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/mentora
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
COOKIE_SECURE=false
```

## Endpoints

- `GET /api/health` — health check
- `POST /api/auth/register` — name, email, password, role("student"|"instructor"|"admin")
- `POST /api/auth/login` — email, password
- `POST /api/auth/refresh` — refreshToken
- `POST /api/auth/logout` — refreshToken
- `GET /api/auth/me` — requires `Authorization: Bearer <accessToken>`

### Roles & RBAC
- Roles supported: `student`, `instructor`, `admin`.
- Protect routes using `auth` middleware and gate roles with `requireRole('instructor')` etc.

### Security
- Helmet is enabled and a basic rate limiter (100 req/15m) is applied globally.

## Project Structure

```
src/
  app.js
  server.js
  config/
    env.js
    database.js
  models/
    User.js
  controllers/
    auth.controller.js
  routes/
    health.routes.js
    auth.routes.js
  middlewares/
    auth.js
    error.js
  utils/
    tokens.js
```

## Notes
- Uses ESLint + Prettier (configs in repo)
- CORS enabled with credentials
- Cookies middleware included (unused by default)


