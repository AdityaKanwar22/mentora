import re
from playwright.sync_api import Page, expect, sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Home page
    page.goto("http://localhost:5173/")
    expect(page.get_by_role("heading", name="Welcome to Mentora")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/01_home_page.png")

    # Courses page
    page.get_by_role("link", name="Courses").click()
    expect(page.get_by_role("heading", name="Our Courses")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/02_courses_page.png")

    # Signup page
    page.get_by_role("link", name="Signup").click()
    expect(page.get_by_role("heading", name="Create your account")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/03_signup_page.png")

    # Signup flow
    page.get_by_placeholder("Full Name").fill("Test User")
    page.get_by_placeholder("Email address").fill("test.user@example.com")
    page.get_by_placeholder("Password").fill("password123")
    page.get_by_role("button", name="Create account").click()

    # Wait for navigation to dashboard
    expect(page.get_by_text("Student Dashboard")).to_be_visible()
    expect(page.get_by_role("button", name="Logout")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/04_student_dashboard.png")

    # Logout
    page.get_by_role("button", name="Logout").click()
    expect(page.get_by_role("link", name="Login")).to_be_visible()
    expect(page.get_by_role("link", name="Signup")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/05_home_after_logout.png")

    # Login page
    page.get_by_role("link", name="Login").click()
    expect(page.get_by_role("heading", name="Sign in to your account")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/06_login_page.png")

    # Login flow
    page.get_by_placeholder("Email address").fill("test.user@example.com")
    page.get_by_placeholder("Password").fill("password123")
    page.get_by_role("button", name="Sign in").click()

    # Wait for navigation to dashboard
    expect(page.get_by_text("Student Dashboard")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/07_student_dashboard_after_login.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)