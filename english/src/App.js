import React, {useState} from 'react';
import './App.css';
import TableOfWords from './assets/components/TableOfWords';
// import CardWord from './assets/components/cardWord';
import SliderCard from './assets/components/sliderCard';
import 'antd/dist/antd.min.css';
import words from './json/words.json';


function App() {

  const [wordCollection,setwordCollection] = useState (words)
  const handleDelete =(name)=>{
    const array = [...wordCollection]; 
    console.log( array.findIndex(el => el.english === name))
    let index = array.findIndex(el => el.english === name);
    array.splice(index, 1);
    console.log(12,array)
    setwordCollection(array);
  }
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
        wordCollection.map((word) => 
        <TableOfWords
        onClick={handleDelete}
        english={word.english}
        transcription={word.transcription}
        russian={word.russian}
        tags={word.tags}
        isSelected={word.isSelected}></TableOfWords>
        )
      }
    </table>
    <div className='card-container'>
      <SliderCard></SliderCard>
    {/* {words.map((word) => 
      <CardWord english={word.english}
      transcription={word.transcription}
      russian={word.russian}></CardWord>
    )
    } */}
      </div>   
    </div>
  );
}

export default App;
