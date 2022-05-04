import React, { useState } from 'react';
import { Input } from 'antd';
import { Button } from 'antd';

function TableOfWords(props) {
    const [pressedEdit, setPressed] = useState(false);
    const editString = () => {
        setPressed(!pressedEdit);
    }

    const [pressedSave, setSave] = useState(false);
    const saveString = () => {
        setSave(!pressedSave);
    }
    return (
        <tbody className="table__tbody">
            <tr>
                <td className="table__data">{pressedEdit
                    ? <Input placeholder="Введите слово" />
                    : props.english}</td>
                <td className="table__data">{pressedEdit
                    ? <Input placeholder="Введите транскрипцию" />
                    : props.transcription}</td>
                <td className="table__data">{pressedEdit
                    ? <Input placeholder="Введите перевод" />
                    : props.russian}</td>
                <td className="table__data"><div className='table_tags'>{pressedEdit
                    ? <Input placeholder="Введите тэги" />
                    : props.tags}</div></td>
                <td className="table__data">
                    {pressedEdit
                        && <Button onClick={saveString} className=" btn btn_save" type="default" shape="circle" size="large">
                            Save
                        </Button>}
                    <Button onClick={editString} className="btn btn_edit" type="default" shape="circle" size="large">
                        Edit
                    </Button>
                    <Button className="btn btn_del" type="danger " shape="circle" size="large">
                        Del
                    </Button>
                </td>
            </tr>
        </tbody>
    )
}
export default TableOfWords;