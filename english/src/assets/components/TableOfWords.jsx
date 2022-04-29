import React from 'react';
// import words from '../../json/words.json';
// import { Table, Space } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';

// const columns = [
//     {
//         title: 'English',
//         dataIndex: 'english',
//         key: 'english',
//     },
//     {
//         title: 'transcription',
//         dataIndex: 'transcription',
//         key: 'transcription',
//     },
//     {
//         title: 'Russian',
//         dataIndex: 'russian',
//         key: 'russian',
//     },
//     {
//         title: 'Tags',
//         key: 'tags',
//         dataIndex: 'tags',
//     },
//     {
//         title: 'Action',
//         key: 'action',
//         render: () => (
//             <Space size="middle">
//                 <button>Edit</button>
//                 <button>Delete</button>
//             </Space>
//         ),
//     },
// ];


// function TableOfWords(props) {
//     return (
//         <Table dataSource={props.english} columns={columns} />
//     )
// }


function TableOfWords(props) {
    return (
        <tbody className="table__tbody">
            <tr>
                <td className="table__data">{props.isSelected
                    ? <Input placeholder="Введите слово" />
                    : props.english}</td>
                <td className="table__data">{props.isSelected
                    ? <Input placeholder="Введите транскрипцию" />
                    : props.transcription}</td>
                <td className="table__data">{props.isSelected
                    ? <Input placeholder="Введите перевод" />
                    : props.russian}</td>
                <td className="table__data"><div className='table_tags'>{props.isSelected
                    ? <Input placeholder="Введите тэги" />
                    : props.tags}</div></td>
                <td className="table__data">
                    {props.isSelected
                        && <Button className=" btn btn_save" type="default" shape="circle" size="large">
                            Save
                        </Button>}
                    <Button className="btn btn_edit" type="default" shape="circle" size="large">
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