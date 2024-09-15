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
return (
    <div className="results-container">
      {resultsRecipes && resultsRecipes.length > 0 ? (
        <div className="results-content">
            {resultsRecipes.map((recipe, index) => (
                <div key={index} className="results-all-contents">
                    <a href={recipe.id} className="recipes-id">
                    {/* タイトルエリア */}
                    <div className="recipes-title">
                        <h2>{recipe.title}</h2>
                    </div>
                    {/* 画像エリア */}
                    <div className="recipes-img">
                        <img src={recipe.image} alt={recipe.title} />
                    </div>
                    {/* レシピの作り方エリア
                    {recipe.instructions && (
                        <div className="recipes-instructions">
                            <h2 className="recipes-instructions-title">
                                {recipe.title}の作り方
                            </h2>
                            <p
                                className="recipes-detail"
                                dangerouslySetInnerHTML={{ __html: recipe.instructions }}>
                            </p>
                        </div>
                    )}
                    レシピのまとめエリア
                    {recipe.summary && (
                        <div className="recipes-summary">
                            <h2 className="recipes-summary-title">まとめ</h2>
                            <p
                                className="recipes-summary-detail"
                                dangerouslySetInnerHTML={{ __html: recipe.summary }}>
                            </p>
                        </div>
                    )} */}
                        </a>
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
