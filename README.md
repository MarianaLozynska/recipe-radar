# Recipe Radar

**Your Ultimate Recipe Companion**
Discover a world of flavors with a wide selection of handpicked recipes, all in one easy-to-use app.

<p align="center">
  <img src="src/assets/images/main1.jpg" alt="Image 1" width="200" hspace="10"/>
  <img src="src/assets/images/main2.jpg" alt="Image 2" width="200" hspace="10"/>
  <img src="src/assets/images/main3.jpg" alt="Image 3" width="200" hspace="10"/>
</p>

---

## Overview

**Recipe Radar** is a fun and easy-to-use app that helps you find all the recipe details you need in one place. With its clean and simple design, Recipe Radar makes it a breeze to explore new dishes, whether you're just starting out in the kitchen or you're already a seasoned pro. We've made it simple for everyone to enjoy cooking!

## Key Features

- **Responsive Design**: Recipe Radar is fully responsive, ensuring a smooth and optimized experience on devices of all sizes, from mobile phones to large desktops.
- **Detailed Recipe Information**: Access ingredients, instructions, preparation time, calories, and more for each recipe.
- **Offline Support**: View cached recipes even without an internet connection.
- **Service Worker Integration**: Ensures fast, seamless interaction through API caching.

---

## Technology Stack

Recipe Radar is built using modern and efficient technologies to ensure a fast and scalable application.

- **React.js** – A JavaScript library for building user interfaces.
- **Vite** – A next-generation frontend tool for fast development.
- **Tailwind CSS** – A utility-first CSS framework for efficient styling.
- **TypeScript** – A typed superset of JavaScript for better code quality.
- **Vitest** – A fast unit testing framework to test individual components and functions.
- **Playwright** – A framework for end-to-end (E2E) testing.
- **Service Worker** – Caches API responses to allow offline functionality.
- **DummyJSON API** – Provides mock recipe data for demonstration purposes.

---

## Installation and Setup

To set up the project locally, follow the steps below:

### 1. Clone the repository

git clone https://github.com/MarianaLozynska/recipe-radar

### 2. Install dependencies

cd recipe-radar
npm install

### 3. Run the application

npm run dev

The application will be available at \`http://localhost:5173\`.

---

## Testing

This project uses **Vitest** for unit testing and **Playwright** for end-to-end testing.

### Running Unit Tests

npm run test

### Running End-to-End Tests

npm run test:e2e

---

## App Structure and Functionality

- **View Recipe Details**: Select a recipe to view comprehensive details, including step-by-step cooking instructions, nutritional information, and preparation time.
- **Offline Browsing**: Cached recipes will be available even when the user is offline, ensuring uninterrupted access.

---

## Future Enhancements

There are several potential features that will further enhance the user experience:

- **Search and Filtering**: Allow users to search for recipes by name, ingredients, or meal type, and apply filters for specific preferences.
- **Favorites**: Enable users to save recipes to a favorites list for easy access at any time.
- **User Authentication**: Enabling users to create accounts and sync their favorite recipes across devices.
- **Meal Planning**: Enabling users to plan meals and create shopping lists based on selected recipes.
