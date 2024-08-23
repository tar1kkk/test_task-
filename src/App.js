import './App.css';
import RecipesListPage from "./page/RecipesListPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RecipeDetailPage from "./page/RecipeDetailPage";
import SelectedIngredientsPage from "./page/SelectedIngredientsPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RecipesListPage/>}/>
                    <Route path="product/:id" element={<RecipeDetailPage/>}/>
                    <Route path="/list" element={<SelectedIngredientsPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
