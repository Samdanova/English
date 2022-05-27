import React, { useEffect, useState } from 'react';
import CardWord from './cardWord';
import { Button } from 'antd';
import words from '../../json/words.json';
import {
    LeftOutlined,
    RightOutlined,
} from '@ant-design/icons';
import { useLocation, useSearchParams } from 'react-router-dom';

export default function SliderCard({ choosenCard = 0 }) { //передаем пропс, 0 будет в случае если пропс не задан
    const location = useLocation(); //отслеживаем адрес
    const [searchParams, setSearchParams] = useSearchParams();

    const [indexCard, changeIndex] = useState(0);

    const checkIndex = (index) => {
        if (index < 0) {
            return words.length - 1;
        } else if (index >= words.length) {
            return 0;
        }
        return index;
    }; //проверяем есть ли индекс карточки в массиве слов

    useEffect(() => {
        // const indexHand = searchParams.get('index'); //пока не работает
        const newIndex = checkIndex(choosenCard);
        changeIndex(newIndex);
    }, [choosenCard]) //после изменения выбранной карточки, происходит проверка индекса




    const handlePrev = () => {
        if (indexCard === 0) {
            changeIndex(words.length - 1)
        } else
            changeIndex(indexCard - 1);

        setSearchParams({ index: indexCard });  // c помоощью этой функции меняется индекс в ссылке
    }


    const handleNext = () => {
        if (indexCard + 1 === words.length) {
            changeIndex(0);
        } else
            changeIndex(indexCard + 1);

        setSearchParams({ index: indexCard });
    }
    return (
        <div className='slider-wrapper'>
            <Button onClick={handlePrev} className=" btn btn_save" icon={<LeftOutlined />} shape="circle" size="large"></Button>
            <CardWord word={words[indexCard]}></CardWord>
            <Button onClick={handleNext} className=" btn btn_save" type="default" icon={<RightOutlined />} shape="circle" size="large"></Button>
        </div >
    )

}
