import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import styles from './Profile.module.css';

const Profile = () => {

    const { user, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    }

    return (
        <div className={styles.container}>
            <div className={styles.userCard}>
                <div className={styles.details}>
                    <h2 className={styles.header}>Profile data</h2>
                    <label>Name: {user.name}</label>
                    <label>Surname: {user.surname}</label>
                    <label>Email: {user.gmail}</label>
                </div>
                <img className={styles.userImg} src="./icons/user-icon.png" alt="profile" />
            </div>
            <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Profile;
