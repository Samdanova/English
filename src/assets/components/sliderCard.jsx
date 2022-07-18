import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import CardWord from './cardWord';

import { Button } from 'antd';
import { WordContext } from '../context/wordContext';
import {
    LeftOutlined,
    RightOutlined,
} from '@ant-design/icons';


export default function SliderCard() { //передаем пропс, 0 будет в случае если пропс не задан
    const { dataWords } = useContext(WordContext);
    const location = useLocation(); //отслеживаем адрес
    const [searchParams, setSearchParams] = useSearchParams();

    const [indexCard, changeIndex] = useState(0);
    const [learn, changeLearn] = useState([]);

    const handleCount = (english) => {
        const newCount = learn.includes(english) ? learn
            : [...learn, english];
        changeLearn(newCount)
    }
    const checkIndex = (index) => {
        if (!index) {
            return 0
        }
        if (index < 0) {
            return dataWords.length - 1;
        } else if (index >= dataWords.length) {
            return 0;
        }
        return index;
    }; //проверяем есть ли индекс карточки в массиве слов

    useEffect(() => {
        const indexHand = searchParams.get('index');
        const newIndex = checkIndex(+indexHand);
        changeIndex(newIndex);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, checkIndex]) //после изменения выбранной карточки, происходит проверка индекса

    const handleClickButtons = (direction) => {
        let newIndex = indexCard;
        switch (direction) {
            case 'right':
                ++newIndex;
                break;
            case 'left':
                --newIndex;
                break;
            default:
                ++newIndex;
        }

        newIndex = checkIndex(newIndex);
        setSearchParams({ index: newIndex });
    };


    return (
        <div className='slider'>
            <div className='title-learning'>Ура! Изучено слов: {learn.length} из {dataWords.length}</div>
            <div className='slider-wrapper'>
                <Button onClick={() => handleClickButtons('left')} className=" btn btn_save" icon={<LeftOutlined />} shape="circle" size="large"></Button>
                <CardWord word={dataWords[indexCard]} count={handleCount}></CardWord>
                <Button onClick={() => handleClickButtons('right')} className=" btn btn_save" type="default" icon={<RightOutlined />} shape="circle" size="large"></Button>
            </div >
        </div>
    )

}
