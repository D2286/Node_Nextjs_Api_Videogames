import Link from "next/link"
import styles from "../styles/Navigation.module.css"


const Navigation = ()=>{

    return(

        <nav className={styles.menu}>
            <div>

                    <Link href="/">
                    <a className={styles.link} >Home</a>
                    </Link>
                
                    {/* <Link href="/{id}">
                    <a className={styles.link}>Store</a>
                    </Link> */}
                
                    <Link href="/Main">
                    <a className={styles.link}>Main</a>
                    </Link>

                    </div>
                    <div>
                        <a className={styles.link} href="#"> Cart (0)</a>
                    </div>
            

        </nav>
    )
}

export default Navigation;