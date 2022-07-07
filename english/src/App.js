import React, {useContext, useState} from 'react';
import TableOfWords from './assets/components/TableOfWords';
import SliderCard from './assets/components/sliderCard';
import Header from './assets/components/header';
import Footer from './assets/components/footer';
import NotFoundPage from './assets/components/NotFoundPage'
import 'antd/dist/antd.min.css';
// import words from './json/words.json';
import './App.css';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import {WordContext} from './assets/components/wordContext'

function App() {
   const {dataWords} = useContext(WordContext);
    // const [wordCollection, setwordCollection] = useState(words)
    // const handleDelete = (name) => {
    //     let array = [...wordCollection];
    //     let index = array.findIndex(el => el.english === name);
    //     if (index === -1) 
    //         return false;
    //     array.splice(index, 1);
    //     setwordCollection(array);
    // }
    return (
            <div className="App">
                <Routes>
                    <Route path="/" element={<Header />}>
                        <Route
                            path="/game"
                            element={<div className = 'card-container' > <SliderCard></SliderCard>
                        </div>
                            }
                        />
                        <Route
                            index="index"
                            element={<table className = "table" > <thead>
                                <tr className="table__columns">
                                    <th className="table__columns_item" colSpan={1}>English</th>
                                    <th className="table__columns_item" colSpan={1}>Transctiption</th>
                                    <th className="table__columns_item" colSpan={1}>Russian</th>
                                    <th className="table__columns_item" colSpan={1}>Tags</th>
                                    <th className="table__columns_item" colSpan={1}>Action</th>
                                </tr>
                            </thead>
                            <tbody className="table__tbody">
                                {
                                    dataWords.map(
                                        (word) => <TableOfWords key={word.english}
                                            //
                                            english={word.english} transcription={word.transcription} russian={word.russian} tags={word.tags} ></TableOfWords>
                                    )
                                }
                            </tbody>
                        </table>
                            }
                        />
                        <Route path="*" element={<NotFoundPage />}/>
                    </Route>
                </Routes>
                <Footer></Footer>
            </div>
        // </Router>
    );
}

export default App;
