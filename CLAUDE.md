# Project Context: Karas Calculator

**Auto-Update Instruction:** This file should be automatically updated with any new, significant context discovered about the project. This includes new libraries, architectural changes, or key development workflows.

---

This document provides a high-level overview of the Karas Calculator project to ensure consistent context for development assistance.

## 1. Project Purpose

This is a web application built with React that serves as a specialized calculator for a game. Its primary function is to help users determine the different combinations of in-game multipliers required to get from a current point value to a target point value.

## 2. Technology Stack

- **Frontend:** React
- **Language:** TypeScript
- **Testing:** Jest, with `ts-jest` for TypeScript support.
- **Package Management:** npm

## 3. Key Files & Modules

- `src/App.tsx`: The main React component that holds the primary state and UI structure.
- `src/calculate-new.ts`: **(Recommended)** The new, high-performance calculation engine. It uses native integer arithmetic and the modulo operator to avoid floating-point errors while being significantly faster than the original.
- `src/calculate.ts`: **(Legacy)** The original calculation engine that uses `bignumber.js`. It is kept for reference but is much slower.
- `src/Changelog/Changelog.tsx`: A static component that displays the version history and release notes to the user in Russian.
- `src/Footer.tsx`: Contains the application's version number, which should be updated with each new release.
- `src/calculate.test.ts`: The Jest test suite for the calculation logic. It contains a comprehensive set of tests for edge cases and floating-point precision.

## 4. Architectural Notes

- **Performance Refactoring:** The core calculation logic was refactored from using `BigNumber.js` to using native JavaScript integers. This was done to address a major performance bottleneck. The new implementation in `calculate-new.ts` is hundreds of times faster and is protected against floating-point errors by using the modulo (`%`) operator to verify divisibility before performing any division.
- **Application State:** The main application state (points, multipliers, etc.) is managed within the `App.tsx` component.
- **Code Style:** The code uses functional components with React Hooks. The variable and function names in `calculate-new.ts` have been refactored for improved readability.

## 5. Development Scripts

- **Package Manager:** `bun` is the preferred package manager. The executable is located at `/Users/majex/.bun/bin/bun`.
- **Run Tests:** `npm test` (or `bun test` if configured).
- **Check for TypeScript Errors:** `npx tsc`
  - This is the most reliable way to get a complete list of all TypeScript errors in the project.
  - The test suite is configured in `jest.config.js` to only run `*.test.ts` files.

## 6. Component Overview

- **`src/index.tsx`**: The main entry point of the application. It sets up the `react-router-dom` routing.
- **`src/App.tsx`**: The core component of the main calculator. It manages state, handles user input, and orchestrates the calculation.
- **`src/Form.tsx`**: The main input form for the calculator.
- **`src/MultiplierInput.tsx`**: A reusable input field for a single multiplier.
- **`src/Footer.tsx`**: The application footer, containing the version number and links.
- **`src/Results/AllWithTabs.tsx`**: Organizes calculation results into a tabbed view.
- **`src/Results/Results.tsx`**: Renders the list of calculation results and handles clicks to show hints.
- **`src/Results/HintPopup.tsx`**: A popup that displays a detailed breakdown of a calculation result.
- **`src/Results/HintPopupCell.tsx`**: A helper component for rendering cells within the hint popup.
- **`src/Changelog/Changelog.tsx`**: A static page displaying the application's version history.
- **`src/Clanquest/Clanquest.tsx`**: A separate, specialized calculator for "Clan Quests".
- **`src/Farewell/Farewell.tsx`**: The main landing page for the application.

## 7. Git Workflow

- **Atomic Commits:** Each commit should be focused on a single, logical piece of functionality. Changes should be grouped into commits that represent one complete step (e.g., "feat: Add user authentication", "fix: Correct calculation error", "refactor: Improve readability of Form component"). This practice is preferred over making large, monolithic commits.

## 8. Task Management

- **`TASKS.md`:** This file is used to track features, broken down into smaller tasks. It is the central place to see what is currently being worked on, what is planned for the future, and what has already been completed.
- **CRITICAL WORKFLOW RULE:** **ALWAYS update `TASKS.md` with progress, even for in-between steps and failed attempts.** This is essential to avoid losing progress and to maintain a clear record of what has been tried.
- **Workflow:**
    1. Before starting a new feature, add it to the "Current Tasks" section of `TASKS.md`.
    2. Break the feature down into a checklist of smaller, actionable tasks.
    3. **IMPORTANT:** Update `TASKS.md` frequently during work:
       - When starting a subtask, note the attempt in progress
       - When encountering issues or errors, document what was tried and what failed
       - When completing intermediate steps, mark progress even if the overall task isn't complete
       - When switching approaches, document the reason and new approach
    4. As you complete each task, mark it as done by changing `[ ]` to `[x]`.
    5. Once all tasks for a feature are complete, move the entire feature to the "Completed" section.
    6. **For failed attempts:** Move incomplete tasks to a "Attempted/Paused" section with detailed notes about what was tried, what failed, and potential next steps.
- **`CLAUDE.md` Updates:** This `CLAUDE.md` file should be updated to reflect any major changes to the project's structure, dependencies, or workflow that are discovered while working on tasks.

