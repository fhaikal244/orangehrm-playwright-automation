# OrangeHRM Automation Framework 🎭

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

UI Automation Framework built from scratch using Playwright TypeScript with Page Object Model design pattern.

---

## 🛠️ Tech Stack
- **Playwright** — UI Automation
- **TypeScript** — Programming Language
- **Allure** — Test Reporting
- **GitHub Actions** — CI/CD

---

## 📁 Project Structure

├── .github/workflows/    # CI/CD pipeline
├── pages/                # Page Object Model
├── tests/                # Test cases
├── data/                 # JSON test data
├── utils/                # Custom WebElement helper
├── fixtures/             # Custom fixtures
└── playwright.config.ts  # Framework config

---

## ✅ Test Coverage

| TC | Test Case | Status |
|---|---|---|
| TC001 | Valid login | ✅ |
| TC002 | Invalid login | ✅ |
| TC003 | Empty credentials | ✅ |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Run all tests
npm run test:all

# Run with report
npm run test:report
```

---

## 🌐 Target App
- **URL** → https://opensource-demo.orangehrmlive.com
