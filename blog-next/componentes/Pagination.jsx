//import Container from "../componentes/Container"
import _ from "lodash";


export default function Pagination ({items, pageSize, currentPage, onPageChange}){
    
    const pageCount = items / pageSize;
    if (Math.ceil(pageCount) === 1) return null;
    const pages = _.range(1, pageCount + 1);

    return (
        <nav >

            <ul className="pagination">
                {pages.map((pag) => (

                <li key={pag} className={pag === currentPage ? "page-item" :"page-item"}>

                    <a onClick={() => onPageChange(pag)}
                    className="page-link"
                    href="#">
                    {pag}
                    </a>
                </li>
                ))}
                
            </ul>

        </nav>
        
    )
}

