import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import PokemonCard from '../components/PokemonCard';
import { usePagination } from '../hooks/usePagination';
import { Form, useLoaderData } from 'react-router-dom';

const Pokedex = () => {
  const { user } = useContext(UserContext);
  const { pokemons, types, name, type } = useLoaderData();
  const [pokemonName, setPokemonName] = useState(name ?? '');
  const [pokemonType, setPokemonType] = useState(type ?? '');
  const pokemonsPagination = usePagination(pokemons, 20);

  const handleNameChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setPokemonType(e.target.value);
  };

  useEffect(() => {
    setPokemonName(name ?? '');
  }, [name]);

  useEffect(() => {
    setPokemonType(type ?? '');
  }, [type]);

  return (
    <div className="w-full">
      <img src="/header.png" alt="header" className="relative top-0 -z-10 w-full" />
      <div className="p-5">
        <p className="text-center text-2xl mb-7">
          <span className="text-red-500 font-semibold">Welcome {user}, </span>
          here you can find your favorite Pokemon.
        </p>

        <div className="mb-10">
          <Form>
            <div className="flex flex-row justify-center">
              <div className="flex flex-row gap-3">
                <input
                  type="text"
                  name="pokemon_name"
                  className="shadow-md border border-black rounded"
                  value={pokemonName}
                  onChange={handleNameChange}
                />
                <button className="bg-red-500 text-white p-2 hover:bg-red-400 rounded">
                  Search
                </button>
                <select
                  name="pokemon_type"
                  value={pokemonType}
                  onChange={handleTypeChange}
                >
                  <option value="">All</option>
                  {types.map((type) => (
                    <option key={type.url} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Form>
        </div>

        <section className="gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-11/12 mx-auto">
          {pokemonsPagination.listSlice.map((pokemon) => (
            <PokemonCard key={pokemon.url} pokemonData={pokemon} />
          ))}
        </section>

        <div className="flex flex-row gap-2 justify-center my-10">
          {pokemonsPagination.pages.map((page) => (
            <div key={page} className="bg-red-500 py-2 px-4 rounded-md">
              <button
                key={page}
                onClick={() => pokemonsPagination.changePageTo(page)}
                className={` ${
                  pokemonsPagination.currentPage === page ? 'text-white' : ''
                } font-bold hover:scale-150 transition-all duration-300`}
              >
                {page}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
