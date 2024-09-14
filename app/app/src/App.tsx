import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import './components/Title';
import Title from './components/Title';
import Form from "./components/Form";
import Results from "./components/Results";

interface Recipe {
    title: string;
    image: string;
    instructions: string;
    summary: string;
}

function App() {

    const [resultsRecipes, setResultsRecipes] = useState<Recipe | null>(null);

    async function getRecipes(searchWord: string) {

        // 検索ワードに基づくレシピ取得ロジック
        console.log("検索ワード:", searchWord);
        if (searchWord) {
            console.log('====================================');
            console.log("あるよ");
            console.log('====================================');
        }

        try {
            const spoonacularApiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
            const deeplApiky = process.env.REACT_APP_DEEPL_API_KEY;
            let respiResult;

        if (searchWord) {
            // 検索ワードがある場合、検索APIを使用
            respiResult = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularApiKey}&query=${searchWord}`);
        } else {
            // 検索ワードがない場合、ランダムAPIを使用
            respiResult = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${spoonacularApiKey}`);
        }
        //検索値のある・なしによって変数を分ける
        const recipe = searchWord ? respiResult.data.results[0] : respiResult.data.recipes[0];
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
            if (searchWord) {
            // 検索ワードがある場合、検索APIを使用
                const translatedTitle = await translateText(recipe.title);

                setResultsRecipes({
                    title: translatedTitle,
                    summary: "",
                    instructions: "",
                    image: recipe.image
                });
            } else {
            // 検索ワードがある場合、検索APIを使用
                const translatedTitle = await translateText(recipe.title);
                const translatedSummary = await translateText(recipe.summary);
                const translatedInstructions = await translateText(recipe.instructions);

                setResultsRecipes({
                    title: translatedTitle,
                    summary: translatedSummary,
                    instructions: translatedInstructions,
                    image: recipe.image
                });
            }
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');

        }
    }

    return (
    <div className='wrapper'>
          <div className='container'>
            <Title />
            <Form
                getRecipes={getRecipes}
            />
            <Results
                resultsRecipes={resultsRecipes}
            />
        </div>
    </div>
  );
}

export default App;
