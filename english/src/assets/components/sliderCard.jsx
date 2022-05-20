import React, { useState } from 'react';
import CardWord from './cardWord';
import { Button } from 'antd';
import words from '../../json/words.json';

export default function SliderCard() {

    const [indexCard, changeIndex] = useState(0);
    const handlePrev = () => {
        if (indexCard === 0) {
            changeIndex(words.length - 1)
        } else
            changeIndex(indexCard - 1);
    }
    const handleNext = () => {
        if (indexCard + 1 === words.length) {
            changeIndex(0);
        } else
            changeIndex(indexCard + 1);
    }
    return (
        <div className='slider-wrapper'>
            <Button onClick={handlePrev} className=" btn btn_save" type="default" shape="circle" size="large">Prev</Button>
            <CardWord word={words[indexCard]}></CardWord>
            <Button onClick={handleNext} className=" btn btn_save" type="default" shape="circle" size="large">Next</Button>
        </div >
    )

}
