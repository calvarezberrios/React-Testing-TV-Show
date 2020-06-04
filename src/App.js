import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import parse from "html-react-parser";

import { formatSeasons } from "./utils/formatSeasons";
import { fetchShow } from "./api/fetchShow";

import Episodes from "./components/Episodes";
import "./styles.css";

export default function App() {
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const episodes = seasons[selectedSeason] || [];

  useEffect(() => {
    fetchShow()
      .then(data => {
        console.log(data)
        setShow(data);
        setSeasons(formatSeasons(data._embedded.episodes));
      })
      .catch(err => console.log(err.message));

    
  }, []);

  const handleSelect = e => {
    console.log(e.target.value)
    setSelectedSeason(e.target.value);
  };

  if (!show) {
    return <h2>Fetching data...</h2>;
  }

  return (
    <div className="App">
      <img className="poster-img" src={show.image.original} alt={show.name} />
      <h1>{show.name}</h1>
      {parse(show.summary)}

      <select className = "Dropdown-root" data-testid = "selectedSeason" id = "selectedSeason" name = "selectedSeason" value = {selectedSeason} onChange = {handleSelect}>
        <option className = "Dropdown-option" value = "">Select a season</option> 
        {Object.keys(seasons).map(season => <option className = "Dropdown-option" key = {season} value = {season}>{season}</option>)}
      </select>
      {/* <Dropdown
        options={Object.keys(seasons)}
        onChange={handleSelect}
        value={selectedSeason || "Select a season"}
        placeholder="Select an option"
      /> */}
      <Episodes episodes={episodes} />
    </div>
  );
}
