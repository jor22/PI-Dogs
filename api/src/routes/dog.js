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
        : dog.weight.metric.split(" - ")[0],
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

router.get("/", async (req, res, next) => { 

  let { origin }  = req.query;
  let { name } = req.query;
  
  try{
    const dogFromApi = await getApiData();

    let dataBaseData = await Dog.findAll({
      include: Temperament,
    });

    let dogFromDb = dataBaseData.map((el) => {
      return {
        id: el.id,
        name: el.name, 
        weight_max: el.weight_max,
        weight_min: el.weight_min,
        height_max: el.height_max,
        height_min: el.height_min,
        life_span: el.life_span  + ' years',
        img: el.img,
        temperaments: el.temperaments.map((i) => { return i.name;}).join(", "),
      };

    });

    const allDogs = origin? origin ==="DataBase"? [...dogFromDb] : origin ==="Api" ?[...dogFromApi]:[...dogFromDb,...dogFromApi] :[...dogFromDb,...dogFromApi]

    if (name) {
      console.log('nombre por query: ',name);

      const found = allDogs.filter((el) =>el.name && el.name.toLowerCase().includes(name.toLowerCase()));
      console.log('respuesta del filter: ',found);

      return res.json(found);
    }

    return res.json(allDogs);


  }catch(error){
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  
  const { id } = req.params;

  try{ 
    console.log(id);

    if (typeof id === "string" && id.length > 6) {

      let findDbDog = await Dog.findByPk(id, { include: Temperament });
      console.log("log del FindForId ", findDbDog)
      
      return res.json({
        id: findDbDog.id,
        name: findDbDog.name, 
        weight_max:findDbDog.weight_max,
        weight_min:findDbDog.weight_min,
        height_max:findDbDog.height_max,
        height_min:findDbDog.height_min,
        life_span:findDbDog.life_span  + ' years',
        img:findDbDog.img,
        temperaments:findDbDog.temperaments.map((i) => { return i.name;}).join(", "),
      });
      
    } else {
      let dataFromApi = await getApiData();
      let findApiDog = dataFromApi.find(
        (el) => el.id.toString() === id.toString()
      );
      console.log(findApiDog);
      if (findApiDog === undefined) {
        res.status(404).json(" Dog Id not found");
      }
      return res.json(findApiDog);
    }

  }catch(error){
    next(error);
  }
});

router.post("/", async (req, res,next) => {
  const {
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_span,
      temperament,
    } = req.body;

  try{ 
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


  }catch(error){
    next(error)
  }
});

module.exports = router;
