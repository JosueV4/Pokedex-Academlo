import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const getPokemonById = async (id) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const pokemon = await getPokemonById(id);
      setPokemon(pokemon);
    };

    if (!state?.pokemon) loadData();
    else setPokemon(state.pokemon);
  }, []);

  const getStatColor = (stat) => {
    const score = stat.base_stat;
    let color = '';
    if (score <= 50) color = '#f44336'; // red
    else if (score <= 100) color = '#ff9800'; // orange
    else if (score <= 150) color = '#ffc107'; // yellow
    else if (score <= 200) color = '#8bc34a'; // green
    else if (score <= 250) color = '#4caf50'; // dark green
    else color = '#009688'; // teal
    return `linear-gradient(to right, ${color} ${score}%, transparent 0%)`;
  };

  return (
    <div>
      {pokemon && (
        <>
          <div className="flex flex-row justify-center bg-gradient-to-br from-blue-500 to-purple-500">
            <img
              src={pokemon?.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              className={`w-3/10 bg-${pokemon.types[0].type.name} rounded-lg transition duration-500 transform hover:scale-110 hover:shadow-lg hover:translate-x-4 hover:translate-y-4 bg-cover`}
            />
          </div>

          <h1 className="text-4xl font-bold text-center">{pokemon.name}</h1>
          <div className="flex flex-row justify-center my-4">
            <p className="text-lg font-semibold mr-2">Slot:</p>
            <p className="text-lg">{pokemon.id}</p>
          </div>
          <div className="flex flex-row justify-center my-4">
            <div className="w-1/2 flex justify-center">
              <p className="text-lg font-semibold mr-2">Peso:</p>
              <p className="text-lg">{pokemon.weight / 10} kg</p>
            </div>
            <div className="w-1/2 flex justify-center">
              <p className="text-lg font-semibold mr-2">Altura:</p>
              <p className="text-lg">{pokemon.height / 10} m</p>
            </div>
          </div>
          <div className="flex flex-row justify-center my-4">
            <p className="text-lg font-semibold mr-2">Tipo:</p>
            <p className="text-lg">
              {pokemon.types.map((type) => type.type.name).join(', ')}
            </p>
          </div>
          <div className="flex flex-row justify-center my-4">
            <p className="text-lg font-semibold mr-2">Habilidades:</p>
            <p className="text-lg">
              {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}
            </p>
          </div>
          <div className="flex flex-col items-center my-4">
            <p className="text-lg font-semibold mb-2">Stats:</p>
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="flex flex-row justify-between w-1/2">
                <p className="text-lg mr-2">{stat.stat.name}</p>
                <div className="bg-gray-300 h-4 w-64 rounded-lg overflow-hidden">
                  <div
                    style={{ background: getStatColor(stat) }}
                    className={`h-4 w-${stat.base_stat} rounded-lg flex`}
                  ></div>
                </div>
                <p className="text-xs text-gray-700 font-medium ml-2">{`${stat.base_stat}/100`}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonDetail;
