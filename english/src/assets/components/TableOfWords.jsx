import React, { useState } from 'react';
import { Input } from 'antd';
import { Button } from 'antd';

function TableOfWords(props) {
    // const [index, countIndex] = useState(0);

    const [pressedSave, setSave] = useState(true);
    const saveString = () => {
        setSave(!pressedSave);
        setPressed(!pressedEdit);
    }
    const [pressedEdit, setPressed] = useState(false);
    const editString = () => {
        setPressed(!pressedEdit);
        setSave(!pressedSave);
    }

    const [state, setState] = useState(props); // здесь состояние слова

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.dataset.name]: event.target.value, //переписывается свойство
        });
    };

    const handleCancel = () => {
        setState({
            ...props,
        });
    };

    const Delete = (event) => {
        props.onClick(event.target.english)
    }

    return (
        <tbody className="table__tbody">
            <tr>
                <td className="table__data">{pressedEdit
                    && <Input data-name={'english'} value={state.english} onChange={handleChange} defaultValue={props.english} />
                }{pressedSave //здесь используем state, так как нужно подтянуть последнее состояние 
                    && state.english}</td>
                <td className="table__data">{pressedEdit
                    && <Input data-name={'transcription'} value={state.transcription} onChange={handleChange} defaultValue={props.transcription} />}
                    {pressedSave && state.transcription}</td>
                <td className="table__data">{pressedEdit
                    ? <Input data-name={'russian'} value={state.russian} defaultValue={props.russian} onChange={handleChange} />
                    : state.russian}</td>
                <td className="table__data"><div className='table_tags'>{pressedEdit
                    ? <Input defaultValue={props.tags} data-name={'tags'} value={state.tags} onChange={handleChange} />
                    : state.tags}</div></td>
                <td className="table__data">
                    {pressedEdit
                        && <Button onClick={saveString} className=" btn btn_save" type="default" shape="circle" size="large">
                            Save
                        </Button>}
                    {!pressedEdit &&
                        <Button onClick={editString} className="btn btn_edit" type="default" shape="circle" size="large">
                            Edit
                        </Button>}
                    {pressedEdit ?
                        <Button onClick={handleCancel} className="btn btn_del btn_cancel" type="danger " shape="circle" size="large">
                            Cancel
                        </Button>
                        :
                        <Button onClick={Delete} className="btn btn_del" type="danger " shape="circle" size="large">
                            Del
                        </Button>
                    }
                </td>
            </tr>
        </tbody>
    )
}
export default TableOfWords;