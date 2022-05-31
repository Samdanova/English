import React, { useEffect, useState } from 'react';
import CardWord from './cardWord';
import { Button } from 'antd';
import words from '../../json/words.json';
import {
    LeftOutlined,
    RightOutlined,
} from '@ant-design/icons';
import { useLocation, useSearchParams } from 'react-router-dom';

export default function SliderCard() { //передаем пропс, 0 будет в случае если пропс не задан
    const location = useLocation(); //отслеживаем адрес
    const [searchParams, setSearchParams] = useSearchParams();

    const [indexCard, changeIndex] = useState(0);
    const [learn, changeLearn] = useState(0);

    const handleCount = () => {
        changeLearn((count) => count + 1)
    }
    const checkIndex = (index) => {
        if (!index) {
            return 0
        }
        if (index < 0) {
            return words.length - 1;
        } else if (index >= words.length) {
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
        <div>
            <div className='title-learning'>Ура! Изучено слов: {learn}</div>
            <div className='slider-wrapper'>
                <Button onClick={() => handleClickButtons('left')} className=" btn btn_save" icon={<LeftOutlined />} shape="circle" size="large"></Button>
                <CardWord word={words[indexCard]} count={handleCount}></CardWord>
                <Button onClick={() => handleClickButtons('right')} className=" btn btn_save" type="default" icon={<RightOutlined />} shape="circle" size="large"></Button>
            </div >
        </div>
    )

}
