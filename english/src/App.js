import React, { useEffect } from 'react';
import {observer, inject} from "mobx-react";
import TableOfWords from './assets/components/TableOfWords';
import SliderCard from './assets/components/sliderCard';
import Header from './assets/components/header';
import Footer from './assets/components/footer';
import NotFoundPage from './assets/components/NotFoundPage';
import AddWord from './assets/components/addWords';
import 'antd/dist/antd.min.css';
import './App.css';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ShowLoaderError from './assets/components/ShowLoaderError';


const App = ({wordsStore}) =>  {

    useEffect(()=>{
console.log('Обратились к API')
wordsStore.fetchDataWords()}, [] )

    return (
        <Router>
            <div className="App">
            <ShowLoaderError>
                <Routes>
                    <Route path="/" element={<Header />}>
                        <Route
                            path="/game"
                            element={<div className = 'card-container' > <SliderCard/>
                        </div>
                            }
                        />
                        <Route
                            index="index"
                            element={<div className = "table-container"><table className = "table" > <thead>
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
                                    wordsStore.dataWords.map(
                                        (word) => <TableOfWords key={word.id} id={word.id}
                                            english={word.english} transcription={word.transcription} russian={word.russian} tags={word.tags} />
                                    )
                                }
                            </tbody>
                        </table>
                         <AddWord/>
                         </div>
                            }
                        />
                        <Route path="*" element={<NotFoundPage />}/>
                    </Route>
                </Routes>
                </ShowLoaderError>
                <Footer/>

            </div>
        </Router>
   
    
    );
}

export default inject(['wordsStore'])(observer(App));
