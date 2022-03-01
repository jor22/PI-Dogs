const { Router } = require('express')
const  router = Router()
const { Temperament } = require('../db.js')



router.get('/' , async (req,res,next) => {  
 try{
    let temperaments = await Temperament.findAll()
    res.json(temperaments)
 }catch(error){
     next(error)
 }
})



module.exports =  router