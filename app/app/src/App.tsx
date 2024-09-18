import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import './components/Title';
import Title from './components/Title';
import Form from "./components/Form";
import Results from "./components/Results";
import ResultsRecipeDetail from "./components/ResultsRecipeDetail";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from "./components/NotFound";

interface Recipe {
    id: string;
    title: string;
    image: string;
    instructions: string;
    summary: string;
}

function App() {

    const [resultsRecipes, setResultsRecipes] = useState<Recipe[] | null>(null);

    async function getRecipes(searchWord: string) {
        try {
            const spoonacularApiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
            const deeplApiky = process.env.REACT_APP_DEEPL_API_KEY;
            const getNumberCount = process.env.REACT_APP_GET_RECIPES_COUNT;
            let respiResult;

        if (searchWord) {
            // 検索ワードがある場合、検索APIを使用
            respiResult = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=${getNumberCount}&apiKey=${spoonacularApiKey}&query=${searchWord}`);
        } else {
            // 検索ワードがない場合、ランダムAPIを使用
            respiResult = await axios.get(`https://api.spoonacular.com/recipes/random?number=${getNumberCount}&apiKey=${spoonacularApiKey}`);
        }
        //検索値のある・なしによって変数を分ける
        const recipe = searchWord ? respiResult.data.results : respiResult.data.recipes;
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
                    console.log('====================================');
                    console.log('APIエラー:',error);
                    console.log('====================================');
        }
    }

    return (
        <BrowserRouter>
            <div className='wrapper'>
                <div className='container'>
                    <Title />
                    <Form
                        getRecipes={getRecipes}
                    />
                    <Routes>
                        <Route path="/" element={<Results resultsRecipes={resultsRecipes} />} />
                        <Route path="/recipes/detail/:id" element={<ResultsRecipeDetail />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>

                </div>
            </div>
        </BrowserRouter>
  );
}

export default App;
