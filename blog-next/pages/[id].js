import Container from "../componentes/Container"
export default function Game({data}){
    return (
        <Container>
            
            <h1>{data.id} - {data.name}</h1>

        <div>
            <img 
                        src={data.image} 
                        alt={data.id + data.name} 
                        widht="60" height="80"
                        style={{borderRadius: '50%'}} />
        </div>                
                    
        </Container>
        
    )
}


export const getStaticPaths = async () => {

    const res = await fetch("http://localhost:3001/videogames/")
    const data = await res.json()
    const paths = data.map(({id}) => ({params: {id: `${id}`}}))
  
    return{
        paths,
        fallback: false
    }
        
  }

  export const getStaticProps = async ({params}) => {

    const res = await fetch("http://localhost:3001/videogames/" + params.id)
    const data = await res.json()
  
    return{
        props:{
            data,
        },
    }
        
  }