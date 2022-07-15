/* eslint-disable default-case */
import React, { useState } from 'react';
import { observer, inject } from "mobx-react";
import { Button } from 'antd';

const TableOfWords = (props, { wordsStore }) => {

    const [pressedSave, setSave] = useState(true);
    const [pressedEdit, setPressed] = useState(false);
    const editString = () => {
        setPressed(!pressedEdit);
        setSave(!pressedSave);
    }
    const [state, setState] = useState(props); // здесь состояние слова
    const [errorEnglish, setErrorEn] = useState(false)
    const [errorTransc, setErrorTransc] = useState(false)
    const [errorRus, setErrorRus] = useState(false)
    const [errorTag, setErrorTag] = useState(false)
    const saveString = () => {
        wordsStore.editWords(state);
        setSave(!pressedSave);
        setPressed(!pressedEdit);
        console.log({ ...state })
    }


    const englishFormat = /^[a-zA-Z]+$/;
    const rusFormat = /([а-я]+)/ui;
    const handleChange = (event) => {

        setState({
            ...state,
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

    };


    const handleCancel = () => {
        setState(props);
        setPressed(!pressedEdit);
        setSave(!pressedSave);
        setErrorEn(false)
        setErrorTransc(false);
        setErrorRus(false);
        setErrorTag(false);

    };

    const handleDelete = (event) => {
        event.preventDefault();
        console.log(state)
        wordsStore.deleteWords(1, state)
    }



    return (
        <tr>
            <td className="table__data" >{pressedEdit
                && <input className={errorEnglish ? "error_input input" : "input"} data-name={'english'} value={state.english} onChange={handleChange} />
            }{pressedSave //здесь используем state, так как нужно подтянуть последнее состояние 
                && state.english}
                {errorEnglish && <div className='error-text'>Fill in the field in correct format</div>}
            </td>

            <td className="table__data">{pressedEdit
                && <input data-name={'transcription'} className={errorTransc ? "error_input input" : "input"} value={state.transcription} onChange={handleChange} />}
                {pressedSave && state.transcription}
                {errorTransc && <div className='error-text'>Fill in the field!</div>}
            </td>
            <td className="table__data">{pressedEdit
                ? <input data-name={'russian'} value={state.russian} onChange={handleChange} className={errorRus ? "error_input input" : "input"} />
                : state.russian}{errorRus && <div className='error-text'>Fill in the field in correct format</div>}
            </td>
            <td className="table__data"><div className='table_tags'>{pressedEdit
                ? <input data-name={'tags'} value={state.tags} onChange={handleChange} className={errorTag ? "error_input input" : "input"} />
                : state.tags}</div>
                {errorTag && <div className='error-text'>Fill in the field!</div>}</td>
            <td className="table__data">
                {pressedEdit ?
                    <Button disabled={errorEnglish || errorTag || errorRus || errorTransc} onClick={saveString} className=" btn btn_save" type="default" shape="circle" size="large">
                        Save
                    </Button>
                    : <Button onClick={editString} className="btn btn_edit" type="default" shape="circle" size="large">
                        Edit
                    </Button>
                }
                {pressedEdit ?
                    <Button onClick={handleCancel} className="btn btn_del btn_cancel" type="danger " shape="circle" size="large">
                        Cancel
                    </Button>
                    :
                    <Button onClick={handleDelete} className="btn btn_del" type="danger " shape="circle" size="large">
                        Del
                    </Button>
                }
            </td>
        </tr>
    )
}
export default inject(['wordsStore'])(observer(TableOfWords));