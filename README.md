# Geriatric Care Assessment Form

A single-page form application designed for visiting nurses conducting elderly patient assessments at home. Built with React 19, TypeScript, Mantine UI v9, and Zod v4.

## Features

- **Schema-Driven Validation**: All 10 form fields and cross-field rules validated via Zod schema using `@mantine/form`'s `schemaResolver`.
- **Dynamic Field Mapping**: Select options for mobility dynamically generated from the `MOBILITY` array.
- **Strict Clinical Inputs**: Blank/unselected inputs remain unsubmitted; no default values pre-filled for clinical scores.
- **Sample Data Fixture**: Includes a "Load sample patient" button for filling valid sample patient data.
- **Simulated Save Flow**: Submitting valid data shows a loading state (~800ms delay) and displays the parsed Zod object output upon success.
- **Comprehensive Test Suite**: Vitest and React Testing Library tests for schema boundaries (e.g. 60-year age requirement) and rendered form interaction.

## Tech Stack

- **React 19** & **TypeScript**
- **Mantine UI 9** (`@mantine/core`, `@mantine/dates`, `@mantine/form`)
- **Zod 4**
- **Vitest** & **React Testing Library**
- **Vite**

## Getting Started

### Prerequisites

- Node.js (v18+)
- Yarn (v4)

### Installation

```bash
yarn install
```

### Development Server

Start the development server:

```bash
yarn dev
```

### Running Tests & Full Verification

Run the full validation suite (includes type checking, formatting checks, linting, Vitest tests, and production build):

```bash
yarn test
```

To run tests in watch mode:

```bash
yarn vitest:watch
```

## Time Spent & Completion Summary

- **Total Time Spent**: ~2 hours
- **Status**: All features, validation rules, UI requirements, and test requirements completed.

## Deployment

*(https://sde-front-assignment.vercel.app/)*
