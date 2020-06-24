import React, { useState, useEffect } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./services/pokemon";
import Card from "./components/Card";
import Navbar from "./components/Navbar/Navbar.js";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialUrl = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  console.log(pokemonData);
  return (
    <>
      <Navbar />
      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="btn">
              <button onClick={prevUrl}>Prev</button>
              <button onClick={nextUrl}>Next</button>
            </div>
            <div className="grid-container">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={prevUrl}>Prev</button>
              <button onClick={nextUrl}>Next</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
