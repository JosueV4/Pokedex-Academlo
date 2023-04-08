import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import { UserContext } from '../contexts/UserContext';

const PokedexLayout = () => {
  const { removeUser } = useContext(UserContext);

  return (
    <div>
      <button
        className="bg-red-400 text-white p-2 hover:bg-red-400 rounded absolute m-2 right-0"
        onClick={removeUser}
      >
        Log out 🚩
      </button>
      <Outlet />
    </div>
  );
};

export default PokedexLayout;
