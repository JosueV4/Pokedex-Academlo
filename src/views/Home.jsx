import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Navigate } from 'react-router';

const Home = () => {
  const [nameValue, setNameValue] = useState('');
  const [nameError, setNameError] = useState(null);
  const { user, saveUser } = useContext(UserContext);

  const handleChange = (e) => {
    const newNameValue = e.target.value;

    setNameValue(newNameValue);
    if (newNameValue === '') setNameError('Name is required');
    else if (!/^[A-Z][a-z ]{2,}$/.test(newNameValue))
      setNameError('Only letters and blanks are allowed and min 5 letters');
    else setNameError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nameError) saveUser(nameValue);
  };

  return (
    <div
      className="flex flex-col justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/public/bgPokemons.gif')" }}
    >
      <div className="mx-auto max-w-2xl sm:max-w-lg my-8">
        <div className="mb-10">
          <img src="/logoPD.png" alt="Pokedex" />
        </div>
        <div className="text-center mb-10">
          <h1 className="text-red-500 text-4xl font-bold">Hello Trainer!</h1>
          <p className="text-black font-bold">Type your name to start</p>
        </div>
        <form
          className="flex flex-col sm:flex-row justify-center items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="shadow-md border border-black p-3 rounded my-4 sm:my-0 sm:mr-4 w-full sm:max-w-md"
            value={nameValue}
            onChange={handleChange}
          />
          <button type="submit" className="bg-red-500 text-white font-bold p-3 rounded">
            Start
          </button>
        </form>
        {nameError && <p className="text-red-500 text-center">{nameError}</p>}

        {user && <Navigate to="/pokedex" replace />}
      </div>
      <footer className="fixed bottom-0 flex w-full">
        <img src="/footer.png" alt="footer" />
      </footer>
    </div>
  );
};

export default Home;
