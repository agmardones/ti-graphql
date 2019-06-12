const GRAPHQL_URL = "https://swapi-graphql-integracion-t3.herokuapp.com/";
const fetchOptions = body => ({
  method: "POST",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  body: JSON.stringify(body)
});

const getUrlString = (id, type) => {
  return `/${type}/${id}`;
};

export const searchEntity = async (entity, keyword) => {
  const raw = await fetch(`https://swapi.co/api/${entity}/?search=${keyword}`);
  const jsonInfo = await raw.json();
  return jsonInfo.results.map(e => getEntityInfo(e, entity));
};

const getEntityInfo = (entity, type) => {
  const name = type === "films" ? entity.title : entity.name;
  return { name, url: getUrlString(entity.id, type) };
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

export const getAllFilms = async () => {
  const body = {
    query: `{ allFilms { edges { node { id title episodeID openingCrawl releaseDate producers director } } } }`
  };
  const response = await fetch(GRAPHQL_URL, fetchOptions(body));
  const {
    data: {
      allFilms: { edges }
    }
  } = await response.json();
  return edges.map(e => {
    const { node } = e;
    const {
      id,
      title,
      director,
      producers,
      episodeID,
      releaseDate,
      openingCrawl
    } = node;
    const url = `/films/${id}`;
    return {
      id,
      title,
      episodeId: episodeID,
      director,
      producers,
      releaseDate,
      openingCrawl,
      url
    };
  });
};

export const getPlanetInfo = async planetId => {
  const body = {
    query: `{
      planet(id: "${planetId}") {
        id
        name
        rotationPeriod
        orbitalPeriod
        diameter
        climates
        gravity
        terrains
        surfaceWater
        population
        residentConnection{
          residents{
            name
            id
          }
        }
        filmConnection {
          films {
            title
            id
          }
        }
      }
    }`
  };
  const response = await fetch(GRAPHQL_URL, fetchOptions(body));
  const {
    data: { planet }
  } = await response.json();
  const { residentConnection, filmConnection } = planet;
  const films = filmConnection.films.map(f => getEntityInfo(f, "films"));
  const residents = residentConnection.residents.map(c =>
    getEntityInfo(c, "characters")
  );
  return {
    planet,
    residents,
    films
  };
};

export const getStarshipInfo = async starshipId => {
  const body = {
    query: `{
      starship(id: "${starshipId}") {
        id
        name
        model
        manufacturers
        costInCredits
        length
        maxAtmospheringSpeed
        crew
        passengers
        cargoCapacity
        consumables
        hyperdriveRating
        MGLT
        starshipClass
        pilotConnection{
          pilots{
            name
            id
          }
        }
        filmConnection {
          films {
            title
            id
          }
        }
      }
    }`
  };
  const response = await fetch(GRAPHQL_URL, fetchOptions(body));
  const {
    data: { starship }
  } = await response.json();
  const { filmConnection, pilotConnection } = starship;
  const pilots = pilotConnection.pilots.map(p =>
    getEntityInfo(p, "characters")
  );
  const films = filmConnection.films.map(f => getEntityInfo(f, "films"));
  return {
    starship,
    films,
    pilots
  };
};

export const getCharacterInfo = async characterId => {
  const body = {
    query: `{
      person(id: "${characterId}") {
        id
        name
        birthYear
        eyeColor
        gender
        hairColor
        height
        mass
        skinColor
        homeworld {
          id
          name
        }
        filmConnection {
          films {
            title
            id
          }
        }
        starshipConnection {
          starships {
            name
            id
          }
        }
      }
    }`
  };
  const response = await fetch(GRAPHQL_URL, fetchOptions(body));
  const {
    data: { person }
  } = await response.json();
  const {
    birthYear,
    eyeColor,
    filmConnection,
    gender,
    hairColor,
    height,
    homeworld,
    mass,
    name,
    skinColor,
    starshipConnection
  } = person;
  const starships = starshipConnection.starships.map(s =>
    getEntityInfo(s, "starships")
  );
  const films = filmConnection.films.map(f => getEntityInfo(f, "films"));
  const character = {
    skinColor,
    birthYear,
    eyeColor,
    gender,
    hairColor,
    mass,
    name,
    height
  };
  return {
    character,
    films,
    starships,
    homeWorld: homeworld.name
  };
};

export const getFilmInfo = async filmId => {
  const body = {
    query: `{
      film(id: "${filmId}") {
        id
        title
        episodeID
        openingCrawl
        releaseDate
        producers
        director
        characterConnection {
          characters {
            name
            id
          }
        }
        starshipConnection {
          starships {
            name
            id
          }
        }
        planetConnection {
          planets {
            name
            id
          }
        }
      }
    }`
  };
  const response = await fetch(GRAPHQL_URL, fetchOptions(body));
  const {
    data: {
      film: {
        title,
        episodeID,
        releaseDate,
        producers,
        director,
        characterConnection,
        planetConnection,
        starshipConnection
      }
    }
  } = await response.json();
  const film = {
    title,
    episodeId: episodeID,
    releaseDate,
    producers,
    director
  };
  const characters = characterConnection.characters.map(c =>
    getEntityInfo(c, "characters")
  );
  const planets = planetConnection.planets.map(p =>
    getEntityInfo(p, "planets")
  );
  const starships = starshipConnection.starships.map(s =>
    getEntityInfo(s, "starships")
  );
  return { film, characters, planets, starships };
};
