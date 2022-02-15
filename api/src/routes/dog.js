const axios = require('axios');
const { Router } = require('express')
const  router = Router()
const {API_KEY} = process.env



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

router.get('/', async (req, res) => {
    const dogfromApi = await getApiData()
    res.json(dogfromApi)
})

module.exports= router