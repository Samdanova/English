import { Button } from 'antd';
import React, { useEffect, useState, useRef } from 'react';

export default function CardWord({ word, count }) {
    const ref = useRef();
    const [pressed, setPressed] = useState(false);
    const handleChange = () => {
        setPressed(!pressed);
        count(word.english);
    }

    useEffect(
        () => {
            ref.current.focus();
        }, [word]
    );

    useEffect(
        () => { //после изменения слова, возвращает нажатие- false, чтобы слово не было открыто
            setPressed(false);
        },
        [word]
    );

    return (
        <div className='card'>
            <div className='card-content'>
                <div className='card-content_word'>{word.english}</div>
                <p>{word.transcription}</p>
            </div>
            <button
                ref={ref}
                onClick={handleChange}
                className='card_btn btn btn_save'
            >
                {pressed ? "Translation" : "Check"}
            </button>
            <div className={pressed ? 'card_translation' : 'card_translation_hide'}>{word.russian}</div>

        </div >
    )
}