import React, { useState, useEffect } from "react";
import { Spin } from 'antd';
import NotFoundPage from "./NotFoundPage";
const WordContext = React.createContext();

function WordContextProvider(props) {
    const [dataWords, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchDataWords = async () => { //функция получения слов с сервера
        try {
            const fetchedData = await fetch(
                "/api/words"
            );
            const data = await fetchedData.json();
            setData(data);
        } catch (error) {
            console.log("error", error);
            setError(true);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataWords();
    }, []) //выполняется один раз при рендере

    if (error) return <NotFoundPage></NotFoundPage>;
    if (loading || !dataWords.length) return <Spin tip="Loading..." className="spinLoading" />


    return (
        <WordContext.Provider value={{ dataWords, fetchDataWords }}>
            {props.children}
        </WordContext.Provider>

    );
}

export { WordContextProvider, WordContext };