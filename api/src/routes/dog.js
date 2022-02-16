const axios = require('axios');
const { Router } = require('express')
const  router = Router()
const {API_KEY} = process.env
const { Dog , Temperament } = require('../db.js')
 


const getApiData = (async () => { 
    let apiData = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    apiData = apiData.data.map( (dog) =>  {
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
        temperamnets: dog.temperament
        ? dog.temperament
        :"no have Temperament",
      }
    }
   )
    return apiData
});

const getDbData = async () => {
    let dataBaseData = await Dog.findAll()
    dataBaseData = dataBaseData.map((dbDog) => {
        return {
            id: dbDog.id,
            name: dbDog.name,
            height_min: dbDog.height_min,
            height_max: dbDog.height_max,
            weight_min: dbDog.weight_min,
            weight_max: dbDog.weight_max,
            life_span: dbDog.life_span,
            img: dbDog.img,
        }
    })
    
    return dataBaseData
}

router.get('/', async (req, res) => {
    const dogFromApi = await getApiData()
    const dogFromDb = await getDbData()

    const allDogs = [...dogFromApi , ...dogFromDb]

    res.json(allDogs)
})


router.post('/', async (req, res) => {
   console.log(req.body)
    
   const{
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
   })


   const dogTemperament = await Temperament.findAll({ where: { name: temperament} });
   console.log(dogTemperament)
   
   await createDog.addTemperaments(dogTemperament)

  res.json(createDog)

})


module.exports= router