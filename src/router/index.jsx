import { createBrowserRouter } from 'react-router-dom';
import PokedexLayout from '../components/PokedexLayout';
import Home from '../views/Home';
import Pokedex from '../views/Pokedex';
import PokemonDetail from '../views/PokemonDetail';
import ProtectedRoute from '../components/ProtectedRoute';
import { pokedexLoader } from './loaders/pokedexLoader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/pokedex',
    element: (
      <ProtectedRoute>
        <PokedexLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ':id',
        element: <PokemonDetail />,
      },
      {
        path: '',
        element: <Pokedex />,
        loader: pokedexLoader,
      },
    ],
  },
]);
