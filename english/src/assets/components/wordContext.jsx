import React, { useState, useEffect } from "react";
import { Spin } from 'antd';
import NotFoundPage from "./NotFoundPage";
// import { ConsoleSqlOutlined } from "@ant-design/icons";

export const WordContext = React.createContext();


const fetchDataWords = () =>  //функция получения слов с сервера
    fetch("http://itgirlschool.justmakeit.ru/api/words")
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
        .then((response) => response)
        .catch((error) =>
            console.log("error", error))

function WordContextProvider(props) {
    const [dataWords, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const data = async () => {
        const words = await fetchDataWords().catch((err) => setError(err));
        console.log('words', words);
        setData(words);
        setLoading(false);
    };
    useEffect(() => {
        console.log('Обратились к API');
        data();
    }, []) //выполняется один раз при рендере


    const editWords = (word) => {
        fetch(
            `http://itgirlschool.justmakeit.ru/api/words/${word.id}/update`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(word),
            }
        ).catch((err) => setError(err));
        data();
    };
    const deleteWords = (word) => {
        fetch(
            `http://itgirlschool.justmakeit.ru/api/words/${word.id}/delete`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
            }
        ).catch((err) => setError(err));
        data();
    };
    const addWords = (word) => {
        fetch(
            `http://itgirlschool.justmakeit.ru/api/words/add`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(word),
            }
        ).catch((err) => setError(err));
        data();
    };

    const contextApp = {
        dataWords, //слова
        addWords,
        deleteWords,
        editWords,
    }

    if (error) return <NotFoundPage></NotFoundPage>;
    if (loading) return <Spin tip="Loading..." className="spinLoading" />


    return (
        <WordContext.Provider value={{ contextApp, dataWords }}>
            {props.children}
        </WordContext.Provider>

    );
}

export default WordContextProvider;