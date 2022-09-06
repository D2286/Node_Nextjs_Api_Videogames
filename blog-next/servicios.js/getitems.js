import axios from "axios"

export async function getItems (){
    const res = await axios.get(`http://localhost:3001/videogames/`)

    return res;
            
}