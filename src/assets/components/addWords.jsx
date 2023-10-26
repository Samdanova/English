import React, { useState, useContext } from 'react';
import { WordContext } from '../context/wordContext';

export default function AddWord() {
    const [newWord, setNew] = useState({});
    const { addWords } = useContext(WordContext);
    const [errorEnglish, setErrorEn] = useState(false)
    const [errorTransc, setErrorTransc] = useState(false)
    const [errorRus, setErrorRus] = useState(false)
    const [errorTag, setErrorTag] = useState(false)

    const englishFormat = /^[a-zA-Z]+$/;
    const rusFormat = /([а-я]+)/ui;

    const handleChange = (event) => {
        setNew({
            ...newWord,
            [event.target.dataset.name]: event.target.value, //переписывается свойство
        });
        let newValue = event.target.value;
        if (newValue === '') { //проверка на пустую строку
            switch (event.target.dataset.name) {
                case 'english':
                    setErrorEn(true)
                    break
                case 'transcription':
                    setErrorTransc(true);
                    break
                case 'russian':
                    setErrorRus(true);
                    break
                case 'tags':
                    setErrorTag(true);
                    break
            }
        } else if (newValue !== '') {
            switch (event.target.dataset.name) {
                case 'english':
                    const english = englishFormat.test(newValue); //проверка соответствия формата
                    english ? setErrorEn(false) : setErrorEn(true)
                    break
                case 'transcription':
                    setErrorTransc(false);
                    break
                case 'russian':
                    const russian = rusFormat.test(newValue);
                    russian ?
                        setErrorRus(false) : setErrorRus(true)
                    break
                case 'tags':
                    setErrorTag(false);
                    break
            }
        }
    }

    const handleAdd = (event) => {
        event.preventDefault();
        addWords(newWord);
    }


    return (
        <div className="addword-container">
            <div className="addword-h">Add a word</div>
            <table className='add-table'>
                <tbody>
                    <tr><td className="table__data add_data">
                        <input
                            placeholder='English word'
                            className={errorEnglish ? "error_input input" : "input"}
                            data-name={'english'}
                            onChange={handleChange} />
                        {errorEnglish &&
                            <div className='error-text'>Fill in the field in correct format</div>}
                    </td>

                        <td className="table__data add_data">
                            <input
                                placeholder='Transcription'
                                data-name={'transcription'}
                                className={errorTransc ? "error_input input" : "input"}
                                onChange={handleChange} />
                            {errorTransc &&
                                <div className='error-text'>Fill in the field!</div>}
                        </td>

                        <td className="table__data add_data">
                            <input
                                placeholder='Translate'
                                data-name={'russian'}
                                onChange={handleChange}
                                className={errorRus ? "error_input input" : "input"} />
                            {errorRus &&
                                <div className='error-text'>Fill in the field in correct format</div>}
                        </td>
                        <td className="table__data add_data">
                            <div className='table_tags'>
                                <input
                                    placeholder='Tags'
                                    data-name={'tags'}
                                    onChange={handleChange}
                                    className={errorTag ? "error_input input" : "input"} />
                            </div>
                            {errorTag &&
                                <div className='error-text'>Fill in the field!</div>}
                        </td>
                        <td className="table__data add_data">
                            <button disabled={errorEnglish || errorTag || errorRus || errorTransc} className=' addButton' onClick={handleAdd}>Add</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}