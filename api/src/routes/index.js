const axios = require('axios');
const { Router } = require('express');
const API_KEY = "7f92e9c146994cc98ce32ce31dabab64"
const BASE_URL = "https://api.rawg.io/api/games"



const {Videogame, Genres} = require("../db")


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//const GAMES = `https://api.rawg.io/api/games?key=${API_KEY}`


const router = Router();


const get100Videogame= async ()=>{
	let url= await axios.get(`${BASE_URL}?key=${API_KEY}`);
	let apInfo=url.data.results;
	for(let i=0; i<4; i++){
		let next=url.data.next;
		url=await axios.get(next);
		apInfo=[...apInfo,...url.data.results]
	}
		try{
			let result=apInfo.map(e=>{
				return{
					id:e.id,
					name:e.name,
					image:e.background_image,
					genres:e.genres,
					rating:e.rating

				}
			})

			return result;
		}
		catch(err){
			next(err)
		}
}

async function videosDb () {

  try{

  const videogameDb = await Videogame.findAll({include: Genres })


  return videogameDb;

  }catch(e){
    console.log(e)
  }

}

async function concatApiDb(){

  try{

  const vidDb = await videosDb();
  const vidGame = await get100Videogame(); 
  const games = vidDb.concat(vidGame)
  return games;

}catch(e){
  console.log(e)
}
}



router.get("/genres", async function (req,res){

try{

  let genresAPI= await axios.get(`${BASE_URL}genres?key=${API_KEY}`)


    let genres = genresAPI.data.results.map( el => el.name.toLowerCase())

      genres.forEach( el => {

        Genres.findOrCreate({
            where:{ 
                name: el}
        })
    })


    const allGeneros = await Genres.findAll()
    return res.status( 200 ).send( allGeneros )

    
}catch(e){
  console.log(e)
}
})

router.get("/videogames", async function(req,res,next){

  const {name} = req.query

try{
  const Geimer = await concatApiDb();


  const array=[];
    
  if (name) {
    let dataGame = Geimer.filter((elem) => 
      elem.name.toLowerCase().includes(name.toLowerCase()));
      array.push(dataGame)
      res.json(array) 
      
    
  } else {
    res.send(Geimer)
    console.log(Geimer.length, "Juegos")
    // let allGames2 = await getAllGames()
    // res.status(200).json(allGames2)
  }
  
}catch(e){
  next(e)
}

})


router.get("/videogames/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id.length>=32) {
 
    const Geimer = await videosDb();
    let obj;
    const filtered = Geimer.filter((elem) => elem.id == id);

    
    filtered.length ?
    res.status(200).send(obj=filtered[0]) : 
    res.status(404).send({Data:"El id del Juego no existe"})
      
  }else{
    const url=await axios.get(`${BASE_URL}/${id}?key=${API_KEY}`);
    const apiInfoId=await url.data;
    let result={
        id:apiInfoId.id,
        name:apiInfoId.name,
        image:apiInfoId.background_image,
        description:apiInfoId.description,
        released:apiInfoId.released,
        rating:apiInfoId.rating,
        platforms:apiInfoId.platforms.map(r=>r.platform.name),
        genres:apiInfoId.genres.map(r=>{
          return{
            id:r.id,
            name:r.name
          }
        })
      }

    res.status(200).send(result)
  }
  
  }catch(err) {
    next(err)
    return res.status(404).json(err)
  }
});


router.post('/videogames', async (req, res) => {


  try{
  const{
      name,
      description,
      released,
      image,
      rating,
      platforms,
      createdInDb,
      genres,
      
      
  } = req.body


   
      let videoGameCreate = await Videogame.create({ 
      name,
      description,
      released,
      image,
      rating,
      platforms: [platforms],
      createdInDb
    

      
      })

      let genreDB = await Genres.findAll({ 
        where: {name: genres.map(e => e)}
    })

      videoGameCreate.addGenres(genreDB)
      res.send('Juego Creado')



  }catch(e){
     console.log(e)
  }
})

   
module.exports=router;
  
