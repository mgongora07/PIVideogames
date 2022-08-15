require("dotenv").config();
const {Router}=require('express');
const axios = require('axios');

const{Genre}=require ('../db.js');
const { API_KEY } = process.env;


const router= Router();


router.get('/',async(req,res)=> {
    const genresApi= await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    genresApi.data.results.forEach(p=>{
        Genre.findOrCreate({
            where:{name:p.name}
        })
    })
    const genresDB=await Genre.findAll()
    res.json(genresDB)
})

module.exports=router;