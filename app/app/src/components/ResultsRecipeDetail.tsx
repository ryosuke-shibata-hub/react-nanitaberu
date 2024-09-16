import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const ResultsRecipeDetail: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [recipeDetail, setRecipeDetail] = useState<any>(null);

    useEffect(() => {
        if (id) {
            const fetchRecipeDetail = async () => {
                try {
                    const spoonacularApiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
                    const deeplApiky = process.env.REACT_APP_DEEPL_API_KEY;
                    let respiResult;

                    // レシピのIDを渡して情報を取得
                    respiResult = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${spoonacularApiKey}`);
                    const recipe = respiResult.data;
                    const translateText = async (text: string) => {
                        const response = await axios.post('https://api-free.deepl.com/v2/translate', null, {
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
                }
            };
            fetchRecipeDetail();
        }
    }, [id]);

    return (
        <div className="">
            {recipeDetail ? (
                <div>
                    <p>{recipeDetail.title}</p>
                </div>
            ) : (
                    <div>
                        <p>
                            読み込み中
                        </p>
                </div>
            )}
        </div>
    )
}

export default ResultsRecipeDetail;
