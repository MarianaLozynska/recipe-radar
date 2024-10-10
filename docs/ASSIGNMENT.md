# Frontend Developer Assignment

## Assignment: React App with Service Worker and API Caching

![Assignment Banner](src/assets/images/Corsearch.jpg)

In this assignment, you will create a simple React-based web page featuring a dropdown menu that allows users to select a recipe name. Upon selection of one of the recipes, details about a recipe should be fetched and presented back to the user.

A service worker will be implemented to improve performance by caching the fetched data. If a recipe’s data has already been cached, the service worker will return the cached data; otherwise, it will fetch the data from the API and cache it for future requests.

---

## Objective

You are required to build a React web page that accomplishes the following:

1. **Dropdown Menu**:

   - A dropdown menu that lists recipes retrieved from the DummyJSON API.

2. **Service Worker**:

   - Implement a service worker that:
     - Caches the recipe's data once it’s fetched from the API.
     - Retrieves cached data on subsequent requests, or fetches it from the API if it’s not already cached.

3. **Display Recipe Information**:
   - When a recipe is selected from the dropdown, display the recipe’s information (ingredients, instructions, difficulty, etc.) on the page.

---

## Assignment Steps

1. **Build the Dropdown and Fetch Recipes Data**:

   - Create a React component that fetches the list of recipe names from the DummyJSON API and displays it in a dropdown menu.
   - When a user selects an option from the dropdown, fetch the details of that recipe and display their information on the page.

2. **Implement the Service Worker**:
   - Use a service worker to cache the recipe data once it has been fetched.
   - If the data is available in the cache, retrieve it from there instead of making a new API call.
   - If the data is not available in the cache, fetch it from the API and cache it for future requests.

---

## Expected Deliverables

- A React app with a fully functional dropdown that fetches and displays recipes information.
- A service worker that caches API responses and serves cached data on future requests.
- A README file that provides instructions on how to run the app, including any necessary setup steps.

---

## API Source

Use the DummyJSON Recipes API to fetch recipe names and the specific information for each recipe.  
Example: The recipes' names will be fetched from [https://dummyjson.com/recipes?select=name](https://dummyjson.com/recipes?select=name).
