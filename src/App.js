import React, {useState}from 'react'
import './App.css';
import SearchBar from './pages/SearchBar';
import ImageList from './pages/ImageList';
import SearchList from './pages/SearchList'

function App() {
  const [searchWord, setSerachWord] = useState('')
  
  return (
    <div className="App">
      <SearchBar searchWord={searchWord} setSerachWord={setSerachWord}/>
      <ImageList/>
      <SearchList />
    </div>
  );
}

export default App;
