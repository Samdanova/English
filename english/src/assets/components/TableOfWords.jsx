import React from 'react';
import words from '../../json/words.json';
import { Table, Space } from 'antd';

const columns = [
    {
        title: 'English',
        dataIndex: 'english',
        key: 'english',
    },
    {
        title: 'transcription',
        dataIndex: 'transcription',
        key: 'transcription',
    },
    {
        title: 'Russian',
        dataIndex: 'russian',
        key: 'russian',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="middle">
                <button>Edit</button>
                <button>Delete</button>
            </Space>
        ),
    },
];


function TableOfWords(props) {
    return (
        // <Table columns={columns} dataSource={words} />
        <Table dataSource={words} columns={columns} />
    )
}

export default TableOfWords;