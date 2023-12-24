import styles from "../css/navbar.module.css";
import logo from '../logo.png';


export function Navbar(){
    return (
        <div className={styles.navbar}>
            <img className={styles.logo} src={logo} alt="logo" />
            <p className="logo">PhotoFolio</p>
        </div>
    )
}