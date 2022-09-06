/* const axios = require('axios');
const { Router } = require('express');
const API_KEY = "7f92e9c146994cc98ce32ce31dabab64"


const {Videogame, Generos} = require("../db")


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//const GAMES = `https://api.rawg.io/api/games?key=${API_KEY}`


const router = Router();



router.get('/', async function AllGames(req, res, next) {

  //res.send("Aquí toy de nuevo")
  const GAMES = `https://api.rawg.io/api/games?key=${API_KEY}`
  let VideogameAPI = [];
  const pages = [GAMES]

  try {
      const { name } = req.query
      for(let i = 0; i < 5; i++) {
      const response = await axios.get(`${pages[i]}`)
      pages.push(response.data.next)
  
      const Game = response.data.results.map((e) => {
        let All_games = {
              ID: e.id,
              name: e.name,
              Imagen: e.background_image,
              Lanzamiento: e.released,
              Rating: e.rating,
              Generos: e.genres.map((e) => {
                  return {
                  Genero: e.name,
                };
            }),
              Consolas: e.platforms.map((e) => {
                  return e.platform.name
              }),
              Creado: false,
          };
          
          return All_games
        
      })
      VideogameAPI = VideogameAPI.concat(Game)
      //console.log(VideogameAPI)
      //res.send(Game)
      //return Game;
      }
      const GameDB = await Videogame.findAll({
        include: {
            model: Generos,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    });
    
    const Geimer = VideogameAPI.concat(GameDB);
    const array=[];
    
    if (name) {
      let dataGame = Geimer.filter((elem) => 
        elem.name.toLowerCase().includes(name.toLowerCase()));
        array.push(dataGame)
        res.json(array) 
        console.log(array)
      
    } else {
      res.send(Geimer)
      console.log("Game not found")
      // let allGames2 = await getAllGames()
      // res.status(200).json(allGames2)
    }
    } catch(error) {
      next(error)
  }
})

const getApiById = async (id) => {

  try{

  const resAxios = await axios.get(`https://api.rawg.io/api/games/ds${id}?key=${API_KEY}`);
  let e = resAxios.data
      return {
        id: e.id,
        name: e.name,
        Imagen: e.background_image,
        Lanzamiento: e.released,
        Rating: e.rating,
        Generos: e.genres.map((e) => {
            return {
            Genero: e.name,
          };
      }),
        Consolas: e.platforms.map((e) => {
            return e.platform.name
        }),
        Creado: false,
    };
    } catch(error) {
        next(error)
}  
      
  };


// Me traigo los generos///////////


  router.get("/generos", async (req, res, next) => {
    try {
      
        let apiData = [];
     
        const apiGenres = await axios.get(
          "https://api.rawg.io/api/genres?key=7f92e9c146994cc98ce32ce31dabab64"
        );
  
        const apiNames = apiGenres.data.results;

        apiNames.map((r) =>
        apiData.push({
          id: r.id,
          name: r.name,
        })
      );
  
      const allGenres = await Generos.bulkCreate(apiData);
      
        
      let allGenreses = await Generos.findAll();
      res.json(allGenreses);
        
    } catch (error) {
      next(error);
    }
  });


/////////////////Busqueda x ID ////////////////
  
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if(!Number(id)){
            let juegoId = await Videogame.findOne({
                where: {
                    id
                },
                include:{
                    model: Generos,
                    attributes: ['name'],
                    through:{
                        attributes: []
                    }
                }
            })
            return res.json(juegoId)
        }
        let gameId = await getApiById(id)
        return res.json(gameId);
    }
    catch(e){
        res.send('Id no encontrado')
    }
})

  
////////////// P O S T /////////


router.post("/", async (req, res, next) => {
    ////videogame
    
  
    try {

      const { name, Imagen, Lanzamiento, Rating, Generos, Consolas, Creado } =
      req.body;

      const nGame = await Videogame.create({
        name,
        Imagen,
        Lanzamiento,
        Rating,
        Consolas,
        Creado,

      });

      let GenerosDb = await Generos.findAll({
        where: { name : Generos}
    
      })
    const relationGame =  await nGame.addGeneros(GenerosDb);
      res.json(relationGame);
    } catch (error) {
      next(error);
    }
  });
  

module.exports=router;
   */
