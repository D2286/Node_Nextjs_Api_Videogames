import {useState, useEffect} from "react"
import Head from 'next/head'
import Container from '../componentes/Container'
import styles from '../styles/Home.module.css'
import Link from "next/link"
import Pagination from "../componentes/Pagination";
import paginate from "./paginate";
import { getItems } from "../servicios.js/getitems";


export default function Home() {

    const [posts, setPost] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize= 10;

    useEffect(()=>{
        const getPost = async () =>{
            const {data:res} = await getItems();
            setPost(res)
        };
        getPost()
    },[]);

    const handlePangeChange = (page) =>{
        setCurrentPage(page);
    }

    const paginatePosts = paginate(posts, currentPage, pageSize);


  return (
    <Container>

    <Pagination 
          items={posts.length} 
          currentPage={currentPage}
          pageSize={pageSize} 
          onPageChange={handlePangeChange} />

<ul className="list-group">
        {
        paginatePosts.map(({id, name, image}) => (<div key={id}>
            <li className="list-group-item list-group-item-action d-flex 
            justify-content-between align-items-center" key={id}>
                <Link href={`/${id}`}>
                    <div>
                    <a>
                        {id} - {name}
                    </a>
                    </div>
                </Link>    
                    <img 
                        src={image} 
                        alt={id + name} 
                        widht="60" height="80"
                        style={{borderRadius: '50%'}} />
                    
            </li>

            </div> 
        ))}
    </ul>

  {/* <Games games={data.games}/> */}
 
    </Container>

    )     
}









/* export const getStaticProps = async () => {

  const res = await fetch("http://localhost:3001/videogames/")
  const data = await res.json()

  return{
      props:{
          data,
      },
  }
      
} */