import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
// import Character from './components/Character';

// props is an object containing all arguments in component in parent component jsx
const RickAndMorty = () => {
  
  const [arr, setArr] = useState([]);

  const rmArr = [];

  // effect hook
  useEffect(() => {
    // assign the url to a var
    const URL = "https://rickandmortyapi.com/api/character/?name=rick&status=alive"; 
    // get request from axios library
    axios
      .get(URL)
      .then(res => {
        res.data.results.forEach(rick => {
          rmArr.push({"rickImage": rick.image, "rickLiteral": `${rick.name} is Rick #${rick.id} with location ${rick.location.name} appearing on ${rick.episode.length} episodes.`});
        })
        setArr(rmArr);
        console.log(rmArr);
      })
      .catch(err => console.log(err));
  }, []);

  // style objects for each rick, for flexbox, and for rick image size
  const style1 = {border:"solid #526E2D99 5px", width:"310px", height:"340px", margin:"30px", fontWeight:"bold", fontSize:"24px", color:"black", backgroundColor:"#FAFD7C99"};
  const styleFlex = {display:"flex", flexFlow:"row wrap", justifyContents:"space-evenly", alignItems:"space-between"};
  const styleImg = {width:"150px", height:"150px"};

  // use map to create an array of li elements
  const rickList = arr.map(rick => {
    return(
      <div style={style1}>
        <img style={styleImg} src={`${rick.rickImage}`} />
        <p>{rick.rickLiteral}</p>
      </div>
    );
  });
  // return the component
  return (
    <div style={styleFlex}>
      {rickList}
    </div>
  );
}

const App = () => {
  // use a boolean slice of state to allow call to child component
  const [allowed, setAllowed] = useState(false);
  // use a slice of state to only call Character component when button is clicked
  const changeAllowed = () => {
    // setter to change state
    setAllowed(true);
  }
  // style object for the button
  const styleButton = {fontSize: "30px", border: "solid #24325F99 5px", padding: "10px", backgroundColor: "#FB646299"}
  // style for h1 tag
  const styleh1 = {fontSize: "35px", width: "600px", textAlign: "center", marginLeft: "35%", borderBottom: "solid black 2px", color: "#526E2DFF"}
  // return a component using jsx
  return (
    <div className="App">
      <h1 style={styleh1} className="Header">Rick React Sprint Challenge: U2 S2</h1>
      <button style={styleButton} onClick={changeAllowed}>Click it to Rick it</button>
      {allowed && <RickAndMorty />}
    </div>
  );
}
// use export to share this module with index.js and render to the browser
export default App;

// the response or res from the api will hold the characters list with each character's info stored within an object
// to access the characters: res.data.results, works and shows in the console when logged inside then() method

// declare an array to fill with the info from api within the axios request - then use setArray to assign array to state array
// make sure to have useEffect (with empty dependency array to execute when state mounts) and useState for initializing state
// use debugger key word only in .then() to view sources and api response with inspect tool in browser window
// access array of objects by using res.data.results (indices 0-19)