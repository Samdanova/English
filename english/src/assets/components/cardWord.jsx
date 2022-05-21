import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

export default function CardWord({ word }) {

    const [pressed, setPressed] = useState(false);
    const handleChange = () => {
        setPressed(!pressed);
    }

    useEffect(() => { //после изменения слова, возвращает нажатие- false, чтобы слово не было открыто
        setPressed(false);
    }, [word]);
    return (
        <div className='card'>
            <div className='card-content'>
                <div className='card-content_word'>{word.english}</div>
                <p>{word.transcription}</p>
            </div>
            {pressed ? <div className='card_translation'>{word.russian}</div> : <Button onClick={handleChange} className='card_btn btn btn_save' type="primary" shape="round" size="large" >
                Проверить
            </Button>}


        </div >
    )
}