interface Recipe {
    title: string;
    image: string;
    instructions: string;
    summary: string;
}

interface ResultsProps {
    resultsRecipes: Recipe | null;
}

const Results: React.FC<ResultsProps> = ({ resultsRecipes }) => {
  return (
    <div className="results-container">
      {resultsRecipes ? (
        <div className="results-content">
            <div className="recipes-title">
                <h2>{resultsRecipes.title}</h2>
            </div>
            <div className="recipes-img">
                <img src={resultsRecipes.image} alt={resultsRecipes.title} />
            </div>
            <div className="recipes-instructions">
                <h2 className="recipes-instructions-title">
                    {resultsRecipes.title}の作り方
                </h2>
                <p
                    className="recipes-detail"
                    dangerouslySetInnerHTML={{ __html: resultsRecipes.instructions }}></p>
            </div>
            <div className="recipes-summary">
                <h2 className="recipes-summary-title">
                    まとめ
                </h2>
                <p
                    className="recipes-summary-detail"
                    dangerouslySetInnerHTML={{ __html: resultsRecipes.summary }}></p>
            </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Results;
