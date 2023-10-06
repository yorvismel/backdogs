const axios = require("axios");
const { Dog, Temperament } = require("../db");
const URL = "https://api.thedogapi.com/v1/breeds";

//solicitud a la APi para obtener los dogs

const getApiDogs = async () => {
  const response = await axios.get(URL);
  const dogs = await response.data.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      temperament: dog.temperament,
      weight_min: parseInt(dog.weight.imperial.split("-")[0]),
      weight_max: parseInt(dog.weight.imperial.split("-")[1]),
      height: dog.height.metric,
      lifeTime: dog.life_span,
      image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
    };
  });
  return dogs;
};

// solicito Los temperaments de la db
const getDbDogs = async () => {
  const dogs = await Dog.findAll({
    include: {
      model: Temperament,
      atributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  //los mapeo
  const mappedDogs = dogs.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      weight_min: dog.weight_min,
      weight_max: dog.weight_max,
      lifeTime: dog.lifeTime,
      image: dog.image,
      createdInDb: dog.createdInDb,
      height: `${dog.height_min} - ${dog.height_max}`,
      temperament: dog.temperaments
        .map((e) => {
          return e.name;
        })
        .join(","),
    };
  });

  return mappedDogs;
};
//concateno
const getAllDogs = async () => {
  const apiDogs = await getApiDogs();
  const dbDogs = await getDbDogs();
  const allDogs = apiDogs.concat(dbDogs);
  return allDogs;
};

module.exports = { getAllDogs };
