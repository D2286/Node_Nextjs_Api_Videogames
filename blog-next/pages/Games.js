/* import {useState, useEffect} from "react"
import axios from "axios";
import Pagination from "../componentes/Pagination";
import paginate from "./paginate";
import Container from '../componentes/Container'
import Link from "next/link"
import { getItems } from "../servicios.js/getitems";
import Product from "./Product";
import styleItems from "./Product.module.css"


export default function Games (){

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

        <div className={styleItems.items}>
 
        {
        paginatePosts.map((item) => (
            <Product key={item.id} item={item} shows="Default" />
        ))}
    
        
    </div>
    </Container>
    )
}


 */