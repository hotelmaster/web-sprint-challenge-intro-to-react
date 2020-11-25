import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

// props is an object containing all arguments in component in parent component jsx
const RickAndMorty = () => {
  
  const [arr, setArr] = useState([1, 2, 3]);

  const rmArr = [];

  // effect hook
  useEffect(() => {
    // get request from axios library
    axios
      .get("https://rickandmortyapi.com/api/character/")
      .then(res => {
        res.data.results.forEach((item) => {
          rmArr.push({"name": item.name, "species": item.species});
        })
        setArr(rmArr);
      })
      .catch(err => console.log(err));
  }, []);

  const style1 = {border:"solid slategray 2px", margin:"15px", fontWeight:"bold", fontSize:"30px"};
  
  return (
    <div>
      <div style={style1}>{arr[0].name} is {arr[0].species}</div>
      <div style={style1}>{arr[1].name} is {arr[1].species}</div>
      <div style={style1}>{arr[2].name} is {arr[2].species}</div>
    </div>
  );
}

const App = () => {

  // use a boolean slice of state to allow call to child component
  const [allowed, setAllowed] = useState(false);

  const changeAllowed = () => {
    setAllowed(true);
  }

  // return a component using jsx
  // the aguments in RickAndMorty child component will be all the keys in props object
  return (
    <div className="App">
      <h1 className="Header">Characters Sprint Challenge</h1>
      <button onClick={changeAllowed}>New Rick and Morty Character</button>
      
      {allowed && <RickAndMorty />}
    </div>
  );
}

export default App;

// the response or res from the api will hold the characters list with each character's info stored within an object

// to access the characters: res.data.results, works and shows in the console when logged inside then() method

// use the map method to set the characters array with all character names?
// just use setCharacters(res.data.results), not working?
// this is an array of 20 items (characters)