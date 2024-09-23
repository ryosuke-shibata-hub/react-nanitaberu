import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios';

const ResultsRecipeDetail: React.FC = () => {

    const navigateUrl = useNavigate();

    const backToTopPage = () => {
        navigateUrl('/')
    }

    // 対象のレシピIDパラメータ
    const { id } = useParams<{ id: string }>();
    //レシピ情報の格納用ステート
    const [recipeDetail, setRecipeDetail] = useState<any>(null);
    // ローディング状態の管理ステート
    const [loading, setLoading] = useState<boolean>(true)
    // エラーメッセージの管理ステート
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (id) {
            const fetchRecipeDetail = async () => {

                setLoading(true)
                setError(null)

                try {
                    const spoonacularApiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
                    const deeplApiky = process.env.REACT_APP_DEEPL_API_KEY;
                    let respiResult;

                    // レシピのIDを渡して情報を取得
                    respiResult = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${spoonacularApiKey}`);
                    const recipe = respiResult.data;
                    const translateText = async (text: string) => {
                        const response = await axios.post('https://api.deepl.com/v2/translate', null, {
                            params: {
                                auth_key: deeplApiky,
                                text: text,
                                target_lang: 'JA',
                            }
                        });
                        return response.data.translations[0].text;
                    }

                    const translatedTitle = await translateText(recipe.title);
                    const translatedSummary = await translateText(recipe.summary);
                    const translatedInstructions = await translateText(recipe.instructions);

                    setRecipeDetail({
                        title: translatedTitle,
                        summary: translatedSummary,
                        instructions: translatedInstructions,
                        image: recipe.image
                    });
                } catch (error) {
                    console.log('====================================');
                    console.log('APIエラー:',error);
                    console.log('====================================');
                } finally {
                    setLoading(false)
                }
            };
            fetchRecipeDetail();
        }
    }, [id]);

    return (
        <div className="">
            {loading ? (
                <p className="text-center">読み込み中・・・</p>
            ) : error ? (
                <p>{error}</p>
            ) : recipeDetail ? (
                <div className="">
                    <div className="results-recipe-detail-content">
                        <div className="recipes-title">
                            <h2>{recipeDetail.title}</h2>
                        </div>
                        <div className="recipes-img">
                            <img src={recipeDetail.image} alt={recipeDetail.title} />
                        </div>
                        <div className="recipes-instructions">
                            <h2 className="recipes-instructions-title">
                                {recipeDetail.title}の作り方
                            </h2>
                            <p
                                className="recipes-detail"
                                dangerouslySetInnerHTML={{ __html: recipeDetail.instructions }}></p>
                        </div>
                        <div className="recipes-summary">
                            <h2 className="recipes-summary-title">
                                まとめ
                            </h2>
                            <p
                                className="recipes-summary-detail"
                                dangerouslySetInnerHTML={{ __html: recipeDetail.summary }}></p>
                        </div>
                    </div>
                    <div className="back-btn-container">
                        <button type="button" className="back-btn" onClick={() => backToTopPage()}>
                            もどる
                        </button>
                    </div>
                </div>
            ) : (
                <div className="back-btn-container">
                    <p>レシピが見つかりませんでした</p>
                    <div className="back-btn-container">
                        <button type="button" className="back-btn" onClick={() => backToTopPage()}>
                            もどる
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ResultsRecipeDetail;
