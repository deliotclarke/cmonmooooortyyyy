import React, { Fragment } from 'react';
import { Context } from './store';
import { IEpisode, IAction } from './interfaces/interface';
import './App.css';

const App: React.FC = () => {
  const { state, dispatch } = React.useContext(Context);

  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });

  const fetchDataAction = async () => {
    const URL =
      'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes';
    const data = await fetch(URL);
    const dataJSON = await data.json();

    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    });
  };

  const toggleFavAction = (episode: IEpisode): IAction => {
    const episodeInFav = state.favorites.includes(episode);
    let dispatchObj = {
      type: 'ADD_FAV',
      payload: episode
    };
    if (episodeInFav) {
      const favWithoutEpisode = state.favorites.filter(
        (fav: IEpisode) => fav.id !== episode.id
      );
      dispatchObj = {
        type: 'REM_FAV',
        payload: favWithoutEpisode
      };
    }
    return dispatch(dispatchObj);
  };

  console.log(state);
  return (
    <Fragment>
      <header className="header">
        <h1>Rick and Morty</h1>
        <p>Pick your favorite episode!</p>
      </header>
      <section className="episode-layout">
        {state.episodes.map((episode: IEpisode) => {
          return (
            <section key={episode.id} className="episode-box">
              <img
                src="http://static.tvmaze.com/uploads/images/medium_landscape/15/37921.jpg"
                alt={`Rick and Morty ${episode.name}`}
              />
              <div>{episode.name}</div>
              <section>
                season: {episode.season} number: {episode.number}
              </section>
              <button
                type="button"
                onClick={() => {
                  toggleFavAction(episode);
                }}
              >
                {state.favorites.includes(episode) ? 'unFav' : 'Fav'}
              </button>
            </section>
          );
        })}
      </section>
    </Fragment>
  );
};

export default App;
