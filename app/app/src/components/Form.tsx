import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

interface FormProps {
    getRecipes: (searchWord: string) => void;
    // getSearchWordRecipes: (searchWord: string) => void;
}

const Form: React.FC<FormProps> = ({ getRecipes }) => {
    // inputの値を初期化しておく
    let [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    // 入力値が更新されるごとに取得
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    //FormSubmitの時にinputの値を取得
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        getRecipes(inputValue); // 入力された値を渡す

        navigate("/", { state: { fetchGetRecipes: inputValue === '' } });
        // 入力値を渡した後にinputの値を初期化する
        setInputValue('')
    };

    return (
        <div className="">
            <div className="form-content">
                <form onSubmit={ handleSubmit }>
                <button className="random-btn" type="submit" name="random-btn">
                    ランダムでごはんを決める
                </button>
                </form>
            </div>
            <div className="form-content">
                <p>〜または〜</p>
            </div>
            <div className="form-content">
                <form onSubmit={ handleSubmit }>
                    <label>料理名・ジャンル等を検索してください</label>
                    <input
                        className="keywords-input"
                        id="cook-keywords"
                        type="text"
                        name="cook-keywords"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="カレー・韓国料理・魚など" />
                    <button className="keyword-btn" type="submit" name="keywords-btn">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Form;
