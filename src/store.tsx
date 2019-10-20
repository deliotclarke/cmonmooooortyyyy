import React from 'react';
import { IState, IAction } from './interfaces/interface';

const initialState: IState = {
  episodes: [],
  favorites: []
};

export const Context = React.createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, episodes: action.payload };
    case 'ADD_FAV':
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'REM_FAV':
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
}

export function CtxProvider(props: any): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
}
