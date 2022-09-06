/* import Link from "next/link";
import style from "./Product.module.css"


export default function Product ({item, shows}){

    if(shows === "Page"){
        return <div>Page</div>;
    }

    if(shows === "ListItem"){
        return <div>List item</div>;
    }

    return (
        <div className={style.item}>
            <div>
                <Link href={`/Games/${item.id}`}>
                    <a>
                        {item.id} - {item.name}            
                    <img 
                        src={item.image} 
                        alt={item.id + item.name} 
                        widht="60" height="80"
                        style={{borderRadius: '50%'}} />
                    </a>
                </Link>
            </div>        
        </div>
        
    )
} */