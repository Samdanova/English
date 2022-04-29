import React from 'react';
import './App.css';
import TableOfWords from './assets/components/TableOfWords';
import 'antd/dist/antd.css';
import words from './json/words.json';


function App() {
  return (
    <div className="App">
          <table className="table">
          <thead>
                <tr className="table__columns">
                    <th className="table__columns_item" colspan="1">English</th>
                    <th className="table__columns_item" colspan="1">Transctiption</th>
                    <th className="table__columns_item" colspan="1">Russian</th>
                    <th className="table__columns_item" colspan="1">Tags</th>
                    <th className="table__columns_item" colspan="1">Action</th>
                </tr>
            </thead>
      {
        words.map((word) => 
        <TableOfWords
        english={word.english}
        transcription={word.transcription}
        russian={word.russian}
        tags={word.tags}
        isSelected={word.isSelected}></TableOfWords>
        )
      }
    </table>
    </div>
  );
}

export default App;
