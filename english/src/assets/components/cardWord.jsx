import { Button } from 'antd';
import React, { useEffect, useState, useRef } from 'react';

export default function CardWord({ word, count }) {
    const ref = useRef();

    const [pressed, setPressed] = useState(false);
    const handleChange = () => {
        setPressed(!pressed);
        count();
    }

    useEffect(
        () => {
            ref.current.focus()
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
            {
                pressed
                    ? (<div className='card_translation'>{word.russian}</div>)
                    : (<Button
                        ref={ref}
                        onClick={handleChange}
                        className='card_btn btn btn_save'
                        type="primary"
                        shape="round"
                        size="large"
                    >
                        Check
                    </Button>)
            }

        </div >
    )
}