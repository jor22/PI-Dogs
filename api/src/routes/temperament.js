const { Router } = require('express')
const  router = Router()
const { Temperament } = require('../db.js')



router.get('/' , async (req,res) => {    

    let temperaments = await Temperament.findAll()
    // temperaments = temperaments.map((e) => {
    //     return e.name
    // });
    res.json(temperaments)
})



module.exports =  router