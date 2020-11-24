import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

  // use state hook and destructuring to set up the slice of state
  const [characters, setCharacters] = useState();

  // Fetch characters from the API in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.
  useEffect(() => {
    // get request from axios library
    axios
      .get("https://rickandmortyapi.com/api/character/")
      .then(res => {
        const rickMortyChars = res.data.results.map((item) => {
        return {"item.name": item.name, "item.species": item.species};
        });
        setCharacters(rickMortyChars);
      })
      .catch(err => console.log(err));
    
    characters.forEach((item) => console.log(item.name));
    console.log("hello and goodbye from the effect hook!");
  }, []);

  return (
    <div className="App">
      <h1 className="Header">Characters</h1>
      <div>How do I show the characters in the state variable?</div>
      
    </div>
  );
}

export default App;

// the response or res from the api will hold the characters list with each character's info stored within an object

// to access the characters: res.data.results, works and shows in the console when logged inside then() method

// use the map method to set the characters array with all character names?
// just use setCharacters(res.data.results), not working?
// this is an array of 20 items (characters)