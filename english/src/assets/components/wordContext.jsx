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


    useEffect(() => {
        console.log('Обратились к API');
        const data = async () => {
            const words = await fetchDataWords().catch((err) => setError(err));
            console.log('words', words);
            setData(words);
            setLoading(false);
        };
        data();
    }, []) //выполняется один раз при рендере


    const contextApp = {
        dataWords //слова
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