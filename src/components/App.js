import React, { useState, useEffect } from 'react';
import CharacterCardList from './CharacterCardList';
import './Card/characterCards.css';

function fetchCharacters(page) {
  return fetch(`https://rickandmortyapi.com/api/character/?page=${page}`).then(
    (res) => res.json()
  );
}

const getCharacters = async () => {
  const {
    info: { pages },
    results: firstPage,
  } = await fetchCharacters(1);

  const fetches = [];
  for (let i = 2; i <= pages; i += 1) {
    fetches.push(fetchCharacters(i));
  }
  const data = await Promise.all(fetches).then((resp) =>
    resp.map(({ results }) => results).flat()
  );
  return [...firstPage, ...data];
};

const filterCharacters = (filter, items) =>
  filter
    ? items.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      )
    : items;

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [render, setRender] = useState([]);
  const [filter, setFilter] = useState('');
  const [prevPage, setPrevPage] = useState(10);
  const [page, setPage] = useState(10);

  const characterList = document.querySelector('.character-list');

  useEffect(() => {
    getCharacters().then((all) => {
      setRender(all.slice(0, 10));
      setCharacters(all);
    });
  }, []);

  const handleScroll = (e) => {
    if (e.target.scrollTop + window.innerHeight >= e.target.scrollHeight) {
      //  if (page >= render.length) return;
      updateRender();
      setPage((prev) => prev + 10);
      setPrevPage((prev) => prev + 10);
    }
  };

  const updateRender = () => {
    setRender(filteredByName.slice(0, page));
  };

  const sortByGrowth = () => {
    setRender(
      characters
        .sort(function (a, b) {
          if (a.created > b.created) {
            return 1;
          }
          if (a.created < b.created) {
            return -1;
          }
        })
        .slice(0, page)
    );
  };

  const sortByDecline = () => {
    setRender(
      characters
        .sort(function (a, b) {
          if (a.created > b.created) {
            return -1;
          }
          if (a.created < b.created) {
            return 1;
          }
        })
        .slice(0, page)
    );
  };

  const sortByEpisodes = () => {
    setRender(
      characters
        .sort(function (a, b) {
          if (a.episode.length > b.episode.length) {
            return -1;
          }
          if (a.episode.length < b.episode.length) {
            return 1;
          }
          if (a.episode.length == b.episode.length) {
            if (a.created > b.created) {
              return 1;
            }
            if (a.created < b.created) {
              return -1;
            }
          }
        })
        .slice(0, page)
    );
  };

  const handleReturnClick = () => {
    setRender(characters.slice(0, 10));

    characterList.scrollTop = 0;
    setPrevPage(10);
    setPage(20);
  };
  const handleSelect = (e) => {
    if (e.target.value == 1) {
      sortByGrowth();
    }
    if (e.target.value == 2) {
      sortByDecline();
    }
  };

  const filteredByName = filterCharacters(filter, characters);

  const changeFilter = (e) => {
    setFilter(e.target.value);
    setRender(filteredByName.slice(0, page));
    console.log(filter);
  };

  const deleteCharacter = (id) => {
    setRender(filteredByName.filter((item) => item.id !== id).slice(0, page));
    setCharacters((prev) => prev.filter((item) => item.id !== id));
  };
  const handleDelete = (id) => {
    deleteCharacter(id);
  };

  return (
    <div className="main-div">
      <div className="div-top-menu-buttons">
        <button className="btn-return" onClick={handleReturnClick}>
          Return to 10
        </button>
        <button className="sort-by-episode-btn" onClick={sortByEpisodes}>
          Sort by episodes
        </button>
        <a className="text-gray">Sort by date</a>
        <select
          name="sort-by-date-select"
          id="select-sort"
          className="sort-by-date-select"
          onChange={handleSelect}
        >
          <option value="1" id="sort-by-growth">
            By growth
          </option>
          <option value="2" id="sort-by-decline">
            By decline
          </option>
        </select>
        <div className="wrapper">
          <img
            className="search-icon"
            src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"
          />
          <input
            type="text"
            name="filter"
            onChange={changeFilter}
            className="top-menu-input"
            placeholder="Search..."
          />
        </div>
      </div>

      <CharacterCardList
        items={render}
        handleScroll={handleScroll}
        handleDelete={handleDelete}
      />
    </div>
  );
};
export default App;
