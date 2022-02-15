const axios = require('axios');
const { Router } = require('express')
const  router = Router()
const { Temperament } = require('../db.js')


router.get('/' , async (req,res) => {
    
    const allTemperaments = await Temperament.findAll()
    res.json(allTemperaments)

})




module.exports =  router