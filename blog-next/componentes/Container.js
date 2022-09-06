
import Head from "next/head";
import styles from "../styles/Container.module.css"
import Navigation from "./Navigation";


export default function Container (props){
    return(
    <div className={styles.contain}>
        {/* <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/cyborg/bootstrap.min.css"/>
        </head> */}

        <Navigation />
     
        <div className="container p-3">
            {props.children}
        </div>

    </div>
    )
}

Container.defaultProps ={
    title: "Next.js | Primero Proyecto",
    description: "Orale Güey",
};