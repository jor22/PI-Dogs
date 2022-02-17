const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db.js");



const getApiData = async () => {
  let apiData = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  apiData = apiData.data.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      weight_max: dog.weight.metric.split(" - ")[1]
        ? dog.weight.metric.split(" - ")[1]
        : dog.weight.metric.split(" - ")[1],
      weight_min: dog.weight.metric.split(" - ")[0],
      height_max: dog.height.metric.split(" - ")[1]
        ? dog.height.metric.split(" - ")[1]
        : dog.height.metric.split(" - ")[0],
      height_min: dog.height.metric.split(" - ")[0],
      life_span: dog.life_span,
      img: dog.image.url,
      temperaments: dog.temperament ? dog.temperament : "no have Temperament",
    };
  });
  return apiData;
};

router.get("/", async (req, res) => {
  const { name } = req.query;

  const dogFromApi = await getApiData();

  let dataBaseData = await Dog.findAll({
    include: Temperament,
  });
  const dogFromDb = dataBaseData;

  const allDogs = [...dogFromApi, ...dogFromDb];

  res.json(allDogs);
});

router.get("/:id" , async (req, res) => {

    const {id} = req.params;

    console.log(id)

    if (typeof id === "string" && id.length > 6){
        let findDbDog = await Dog.findByPk(id ,{include: Temperament })
        console.log(findDbDog)
       return res.json(findDbDog)
    }else{
        let dataFromApi = await getApiData()
        let  findApiDog = dataFromApi.find((el) => el.id.toString() === id.toString());
        console.log(findApiDog)
        return res.json(findApiDog)
    }
})

router.post("/", async (req, res) => {

  const {
    name,
    height_min,
    height_max,
    weight_min,
    weight_max,
    life_span,
    temperament,
  } = req.body;

  const createDog = await Dog.create({
    name,
    height_min,
    height_max,
    weight_min,
    weight_max,
    life_span,
  });

  const dogTemperament = await Temperament.findAll({
    where: { name: temperament },
  });

  await createDog.addTemperaments(dogTemperament);

 return res.json(createDog);
});

module.exports = router;