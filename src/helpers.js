const fetchEntities = async entitiesArray => {
  const entitiesInfo = await Promise.all(
    entitiesArray.map(entity => fetch(entity))
  );
  const parsedEntity = await Promise.all(
    entitiesInfo.map(entity => entity.json())
  );
  return parsedEntity;
};

const getUrlString = (url, type) => {
  const urlSplit = url.split("/");
  return `/${type}/${urlSplit[urlSplit.length - 2]}`;
};

const getEntityInfo = (entity, type) => {
  const name = type === "films" ? entity.title : entity.name;
  return { name, url: getUrlString(entity.url, type) };
};

export const filterData = (data, value) => {
  const filteredData = data.filter(e => e.name.toLowerCase().includes(value));
  return filteredData;
};
export const fetchEntitiesIndex = async entity => {
  let data = [];
  let raw = await fetch(`https://swapi.co/api/${entity}`);
  let rawJson = await raw.json();
  let initial = rawJson;
  data = data.concat(initial.results);
  while (initial.next) {
    raw = await fetch(initial.next);
    rawJson = await raw.json();
    initial = rawJson;
    data = data.concat(initial.results);
  }
  return data;
};

export const getSearchBarInfo = async () => {
  const parsedFilms = await fetchEntitiesIndex("films");
  const parsedPlanets = await fetchEntitiesIndex("planets");
  const parsedStarships = await fetchEntitiesIndex("starships");
  const parsedCharacters = await fetchEntitiesIndex("people");
  return {
    films: parsedFilms.map(film => getEntityInfo(film, "films")),
    planets: parsedPlanets.map(planet => getEntityInfo(planet, "planets")),
    starships: parsedStarships.map(starship =>
      getEntityInfo(starship, "starships")
    ),
    characters: parsedCharacters.map(char => getEntityInfo(char, "characters"))
  };
};
export const getAllFilms = async () => {
  const rawFilms = await fetch("https://swapi.co/api/films");
  const films = await rawFilms.json();
  return films.results.map(film => {
    const {
      title,
      episode_id,
      director,
      producer,
      release_date,
      opening_crawl,
      url
    } = film;
    return {
      title,
      episodeId: episode_id,
      director,
      producer,
      releaseDate: release_date,
      openingCrawl: opening_crawl,
      url
    };
  });
};

export const getPlanetInfo = async planetId => {
  const rawPlanet = await fetch(`https://swapi.co/api/planets/${planetId}`);
  const planet = await rawPlanet.json();
  const residentsInfo = await fetchEntities(planet.residents);
  const residents = residentsInfo.map(resident =>
    getEntityInfo(resident, "characters")
  );
  const filmsInfo = await fetchEntities(planet.films);
  const films = filmsInfo.map(film => getEntityInfo(film, "films"));
  return {
    planet,
    residents,
    films
  };
};

export const getStarshipInfo = async starshipId => {
  const rawStarship = await fetch(
    `https://swapi.co/api/starships/${starshipId}`
  );
  const starship = await rawStarship.json();
  const filmsInfo = await fetchEntities(starship.films);
  const films = filmsInfo.map(film => getEntityInfo(film, "films"));
  const pilotsInfo = await fetchEntities(starship.pilots);
  const pilots = pilotsInfo.map(pilot => getEntityInfo(pilot, "characters"));
  return {
    starship,
    films,
    pilots
  };
};

export const getCharacterInfo = async characterId => {
  const rawCharacter = await fetch(
    `https://swapi.co/api/people/${characterId}`
  );
  const character = await rawCharacter.json();
  const filmsInfo = await fetchEntities(character.films);
  const films = filmsInfo.map(film => getEntityInfo(film, "films"));
  const starshipsInfo = await fetchEntities(character.starships);
  const starships = starshipsInfo.map(starship =>
    getEntityInfo(starship, "starships")
  );
  const homeWorldInfo = await fetch(character.homeworld);
  const homeWorld = await homeWorldInfo.json();
  return {
    character,
    films,
    starships,
    homeWorld: homeWorld.name
  };
};

export const getFilmInfo = async filmId => {
  const rawFilm = await fetch(`https://swapi.co/api/films/${filmId}`);
  const film = await rawFilm.json();
  const charactersInfo = await fetchEntities(film.characters);
  const planetsInfo = await fetchEntities(film.planets);
  const starshipsInfo = await fetchEntities(film.starships);
  const characters = charactersInfo.map(char =>
    getEntityInfo(char, "characters")
  );
  const planets = planetsInfo.map(planet => getEntityInfo(planet, "planets"));
  const starships = starshipsInfo.map(starship =>
    getEntityInfo(starship, "starships")
  );
  return { film, characters, planets, starships };
};
