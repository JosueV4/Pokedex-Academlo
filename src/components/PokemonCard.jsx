import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const getPokemonById = async (url) => {
  try {
    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const typeClassMap = {
  normal: 'bg-gradient-to-r from-gray-300 to-gray-400',
  fire: 'bg-gradient-to-r from-red-500 to-red-600',
  water: 'bg-gradient-to-r from-blue-500 to-blue-600',
  electric: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
  grass: 'bg-gradient-to-r from-green-500 to-green-600',
  ice: 'bg-gradient-to-r from-blue-200 to-blue-300',
  fighting: 'bg-gradient-to-r from-red-600 to-red-700',
  poison: 'bg-gradient-to-r from-purple-500 to-purple-600',
  ground: 'bg-gradient-to-r from-yellow-600 to-yellow-700',
  flying: 'bg-gradient-to-r from-indigo-400 to-indigo-500',
  psychic: 'bg-gradient-to-r from-pink-500 to-pink-600',
  bug: 'bg-gradient-to-r from-green-600 to-green-700',
  rock: 'bg-gradient-to-r from-yellow-800 to-yellow-900',
  ghost: 'bg-gradient-to-r from-purple-700 to-purple-800',
  dragon: 'bg-gradient-to-r from-indigo-700 to-indigo-800',
  dark: 'bg-gradient-to-r from-gray-800 to-gray-900',
  steel: 'bg-gradient-to-r from-gray-400 to-gray-500',
  fairy: 'bg-gradient-to-r from-pink-400 to-pink-500',
};

const PokemonCard = ({ pokemonData }) => {
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  const handleClickNavigate = () => {
    navigate(`/pokedex/${pokemon.id}`, { state: { pokemon } });
  };

  useEffect(() => {
    const loadPokemon = async () => {
      const pokemonInfo = await getPokemonById(pokemonData.url);

      setPokemon(pokemonInfo);
    };
    loadPokemon();
  }, []);

  const cardBgColor = pokemon ? typeClassMap[pokemon.types[0].type.name] : '';

  return (
    <>
      {pokemon && (
        <article
          onClick={handleClickNavigate}
          className={`hover:cursor-pointer border-2 border-opacity-20 border-black rounded-xl ${cardBgColor} bg-opacity-80 transform hover:scale-110 transition duration-500`}
        >
          <header>
            <div className="hover:animate-pulse">
              <img
                src={pokemon?.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="w-5/6 mx-auto transform hover:-translate-y-5 hover:scale-110 transition duration-500"
              />
            </div>
          </header>

          <section>
            <section className="text-center mb-2">
              <h2 className="text-2xl font-semibold">{pokemon.name}</h2>
              <p className="text-lg text-white font-semibold">
                {pokemon.types[0].type.name}
              </p>
              <p className="text-xs text-black">Type</p>
            </section>

            <section className="grid grid-cols-2 gap-3 p-1 mb-1">
              {pokemon.stats.map((stat) => (
                <section key={stat.stat.name} className="text-center">
                  <h3 className="text-xs text-black font-bold">
                    {stat.stat.name.toUpperCase()}
                  </h3>
                  <p className="text-white font-semibold text-lg">{stat.base_stat}</p>
                </section>
              ))}
            </section>
          </section>
        </article>
      )}
    </>
  );
};

export default PokemonCard;
