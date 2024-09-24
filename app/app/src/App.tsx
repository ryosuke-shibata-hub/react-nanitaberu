import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './components/Title';
import Title from './components/Title';
import Form from "./components/Form";
import Results from "./components/Results";
import ResultsRecipeDetail from "./components/ResultsRecipeDetail";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NotFound from "./components/NotFound";

interface Recipe {
    id: string;
    title: string;
    image: string;
    instructions: string;
    summary: string;
    error: string;
}

function MainApp() {

    const [resultsRecipes, setResultsRecipes] = useState<Recipe[] | null>(null);
    const location = useLocation();
    // エラーメッセージの管理ステート
    const [error, setError] = useState<string | null>(null)

    async function getRecipes(searchWord: string) {
        try {

            setError(null)

            const spoonacularApiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
            const deeplApiky = process.env.REACT_APP_DEEPL_API_KEY;
            const getNumberCount = process.env.REACT_APP_GET_RECIPES_COUNT;
            let respiResult;


            // 入力されたキーワードを英語に翻訳する
            const translateToEnglish = async (text: string) => {
            const response = await axios.post('https://api.deepl.com/v2/translate', null, {
                params: {
                    auth_key: deeplApiky,
                    text: text,
                    target_lang: 'EN',
                }
            });
            return response.data.translations[0].text;
            }

            let translatedSearchWord = searchWord;
            if (searchWord) {
                translatedSearchWord = await translateToEnglish(searchWord);
            }

            if (translatedSearchWord) {
                // 検索ワードがある場合、検索APIを使用
                respiResult = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=${getNumberCount}&apiKey=${spoonacularApiKey}&query=${translatedSearchWord}`);
            } else {
                // 検索ワードがない場合、ランダムAPIを使用
                respiResult = await axios.get(`https://api.spoonacular.com/recipes/random?number=${getNumberCount}&apiKey=${spoonacularApiKey}`);
            }
            //検索値のある・なしによって変数を分ける
            const recipe = translatedSearchWord ? respiResult.data.results : respiResult.data.recipes;
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
            const translatedRecipes = await Promise.all(
                recipe.slice(0, getNumberCount).map(async (item:any) => {
                    const translateRecipesResultsTitle = await translateText(item.title);
                    return {
                        id: item.id,
                        title: translateRecipesResultsTitle,
                        summary: "",
                        instructions: "",
                        image: item.image
                    }
                })
            )
            setResultsRecipes(translatedRecipes);
        } catch (error) {
            setError("レシピの取得に失敗しました。時間をおいてお試しください。")
            console.log('====================================');
            console.log('APIエラー:',error);
            console.log('====================================');
        }
    }
    useEffect(() => {
        if (location.state && location.state.fetchGetRecipes) {
            getRecipes('');
        }
    }, [location.state]);

    return (
            <div className='wrapper'>
                <div className='container'>
                    <Title />
                    <Form
                        getRecipes={getRecipes}
                />
                {error ? (
                    <p className="text-center">{error}</p>
                ): (
                    <Routes>
                        <Route path="/" element={<Results resultsRecipes={resultsRecipes} />} />
                        <Route path="/recipes/detail/:id" element={<ResultsRecipeDetail />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                )}
                </div>
            </div>
  );
}

function App() {
    return (
        <BrowserRouter>
            <MainApp />
        </BrowserRouter>
    )
}

export default App;
