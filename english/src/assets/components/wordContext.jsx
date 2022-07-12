import React, { useState, useEffect } from "react";
import NotFoundPage from "./NotFoundPage";
import Loader from "./Loader";
export const WordContext = React.createContext();

function WordContextProvider(props) {
    const [dataWords, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDataWords = async () => {
        setLoading(true) //функция получения слов с сервера
        await fetch("http://itgirlschool.justmakeit.ru/api/words")
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Something went wrong...")
                }
            })
            .then((response) => {
                setData(response);
                console.log(1, response);
            })
            .catch((error) => { console.log("error", error); setError(error) })
            .finally(() => { setLoading(false) })
    };

    useEffect(() => {
        console.log('Обратились к API');
        fetchDataWords();
    }, []) //выполняется один раз при рендере

    const editWords = async (word) => {
        await fetch(
            `http://itgirlschool.justmakeit.ru/api/words/${word.id}/update`,
            {
                method: 'POST',
                body: JSON.stringify(word),
            }
        ).then(() => {
            fetchDataWords()
        }).catch((err) => setError(err));
    };
    const deleteWords = async (word) => {
        console.log(2, word)
        setLoading(true)
        await fetch(
            `http://itgirlschool.justmakeit.ru/api/words/${word.id}/delete`,
            { method: 'POST' }
        )
            .then(() => {
                fetchDataWords()
            })
            .catch((err) => setError(err));
    };
    const addWords = async (word) => {
        setLoading(true)
        await fetch(
            `http://itgirlschool.justmakeit.ru/api/words/add`,
            {
                method: 'POST',
                body: JSON.stringify(word),
            }
        ).then(() => {
            fetchDataWords()
        }).catch((err) => setError(err));

    };

    if (error) return <NotFoundPage></NotFoundPage>;
    if (loading) return <Loader />


    return (
        <WordContext.Provider value={{ dataWords, addWords, deleteWords, editWords }}>
            {props.children}
        </WordContext.Provider>

    );
}

export default WordContextProvider;