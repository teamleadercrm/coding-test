# Order Management System

The Order Management System is a web application built using React and TypeScript, designed to provide users with an intuitive interface to manage their orders and view order details. The application leverages Material-UI (MUI) for UI components, react-window for virtualized list rendering, and Redux Toolkit for state management.

## Table of Contents

- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Architecture

The project follows a scalable architectural design, promoting code reusability and maintainability. The application is built using React and TypeScript, ensuring type safety and better tooling support.

The state management is handled by Redux Toolkit, which provides a robust and efficient way to manage the application's state. The state is divided into slices, each representing a specific domain of the application, such as orders, products, and customers.

The UI components are built using Material-UI (MUI), a popular React UI library that provides a comprehensive set of pre-built components and adheres to the Material Design guidelines. This ensures a consistent and visually appealing user experience across the application.

For virtualized list rendering, the project utilizes react-window, which optimizes performance by only rendering the visible items in a list, resulting in improved performance for large datasets.

## Project Structure

The project follows a modular structure, with components and utilities organized into separate directories:

src
├── components
│ ├── customer
│ ├── order
│ ├── product
│ └── shared
├── hooks
├── models
├── common
├── Theme
├── Routes
├── Pages
├── Hooks
├── store
│ ├── slices
│ └── ...
├── styles
│ └── styles
├── utils
├── App.tsx
├── index.tsx
└── ...

- components: Contains reusable React components, organized by their respective domains (customer, order, product, shared).
- hooks: Custom React hooks for reusable logic.
- APIs: Implementation Axios configuration and APIs we use in our app.
- models: TypeScript interfaces and types representing the application's data models.
- common: Common components which use in whole app.
- Theme: MUI Theme configuration to have better layout and reusable styles.
- Routes: App Routes configuration by using react-router-dom.
- Pages: App Pages which implemented inside App Routes.
- store: Redux store configuration and slices.
- styles: Global and component-specific styles.
- utils: Utility functions and helpers.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- TypeScript: A superset of JavaScript that adds optional static typing.
- Material-UI (MUI): A popular React UI component library that implements Google's Material Design.
- react-window: A React component for efficient virtualized rendering of large lists and grids.
- Redux Toolkit: A modern and opinionated way to write Redux logic.

## Features

- Order Management: Users can view a list of their orders and access order details.
- Order Details: Users can add and remove products from an order, update quantities, and view the total order cost.
- Product List: A virtualized list of products, optimized for performance when rendering large datasets.
- Customer Information: Displays relevant customer information for the selected order.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: git clone https://github.com/your-repo/order-management-system.git
2. Install dependencies: npm install
3. Start the development server: npm start
4. Open the application in your browser at http://localhost:3000

## Deployment

The application is ready for deployment and can be built using the following command:

npm run build

This will create an optimized production build in the build directory, which can be deployed to a web server.

## Contributing

Contributions to the project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request. For major changes, it's recommended to discuss them first in an issue before starting to work on them.

When contributing, please follow the project's coding conventions and guidelines, and ensure that your code is properly documented and tested.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### npm start

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### npm test

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### npm run build

Builds the app for production to the build folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### npm run eject

Note: this is a one-way operation. Once you `eject`, you can’t go back!

If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
