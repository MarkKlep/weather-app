import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import styles from "./NavBar.module.css";

const NavBar = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className={styles.navbar}>
            <NavLink to='/'>Home page</NavLink>
            {user && <NavLink to='/weather'>Weather</NavLink>}
            {user && <NavLink to='/profile'>Profile {user.name}</NavLink>}
        </div>
    );
}

export default NavBar;