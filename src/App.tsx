import Header from "./components/Header";
import { AUTHOR, QUOTE } from "./constants/quotes";
import BackgroundSection from "./components/BackgroundSection";

const App: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <BackgroundSection>
        <div className="text-center mx-4 max-w-3xl mt-8">
          <p className="quote-text">{QUOTE}</p>
          <p className="author-text">{AUTHOR}</p>
        </div>
      </BackgroundSection>
    </div>
  );
};

export default App;

// To Do
// 1. Create a new component called DropdownList.tsx in the components folder.
// 2. Crreat a new component called RecipeDetails.tsx in the components folder.
// 3. Add placeholder images to main page and each recipe.
// 3. Import the DropdownList component into App.tsx.
// 4. Import the RecipeDetails component into App.tsx.
// 5. Render the DropdownList component in App.tsx.
// 6. Render the RecipeDetails component in App.tsx.
// 7. Create a header for whole app, and render it in App.tsx.
// 8. Add service worker to the app.
// 9. Add manifest.json to the app.?
// 10. Add a favicon to the app.?
// 11. Add a title to the app.?
// 12. Add a description to the app.?
// 13. Add a theme color to the app.?
// 14. Add a background color to the app.?
// 15. Add a display mode to the app.?
// 16. Style the components
// 17. Add tests to app
// 18. Add a README.md file to the app
// 19. Add Search functionality to the app?
// 20. Add filter functionality to the app?
// 21. Add save my favorites functionality to the app?
