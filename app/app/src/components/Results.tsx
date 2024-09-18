import { BrowserRouter, Link, Route, Routes, useNavigate, useNavigation } from "react-router-dom";
interface Recipe {
    title: string;
    image: string;
    instructions: string;
    summary: string;
    id: string;
}

interface ResultsProps {
    resultsRecipes: Recipe[] | null;
}

const Results: React.FC<ResultsProps> = ({ resultsRecipes }) => {
    const navigateUrl = useNavigate();

    const handleRecipeClick = (id: string) => {
        navigateUrl(`/recipes/detail/${id}`)
    }
    return (
        <div className="results-container">
            {resultsRecipes && resultsRecipes.length > 0 ? (
                <div className="results-content">
                    {resultsRecipes.map((recipe, index) => (
                        <div key={index} className="results-all-contents" onClick={() => handleRecipeClick(recipe.id)}>
                            {/* タイトルエリア */}
                            <div className="recipes-title">
                                <h2>{recipe.title}</h2>
                            </div>
                            {/* 画像エリア */}
                            <div className="recipes-img">
                                <img src={recipe.image} alt={recipe.title} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="recipe-not-found">
                    {resultsRecipes && (
                        <p className="recipe-not-found">検索されたレシピが見つかりません...</p>
                    )}
                </div>
            )}
        </div>
    );


};

export default Results;
