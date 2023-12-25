import { useState, useContext } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import { API_WEATHER_URL } from "../api";
import { AuthContext } from "../provider/AuthProvider";
import styles from "./HomePage.module.css";



const initialForm = {
    name: '',
    surname: '',
    password: '',
    gmail: ''
}

const HomePage = () => {

    const [regForm, setRegForm] = useState(initialForm);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordType, setConfirmPasswordType] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    const { setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const showPassword = () => {
        setConfirmPasswordType(!confirmPasswordType)
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRegForm({...regForm, [name]: value});
    }

    const handleSignIn = () => {
        navigate('/sign_in');
    }

    const createRegForm = async (e) => {
        e.preventDefault();

        if(confirmPassword === regForm.password) {
            try {
                const response = await fetch(`${API_WEATHER_URL}/registration_form`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(regForm)
                });
    
                if(response.ok) {
                    setUser(regForm);
                    setRegForm(initialForm);
    
                    alert("You have been registered!!!");
    
                    navigate('/weather');
                } else {
                    throw new Error('Response not okay');
                }
            } catch (error) {
                setFetchError(error);
            }

        }
        else {
            alert('Confirmed password is wrong');
        }
    }

    return (
        <div className={styles.container}>

            <label className={styles.label}>Registartion form</label>

            <form className={styles.form} onSubmit={createRegForm}>
                <input
                    placeholder="Name"
                    name='name'
                    onChange={handleChange} 
                    value={regForm.name}
                    required
                />

                <input
                    placeholder="Surname"
                    name='surname'
                    onChange={handleChange}
                    value={regForm.surname}
                    required
                />

                <input
                    placeholder="Password"
                    name='password'
                    onChange={handleChange}
                    value={regForm.password}
                    required
                    type='password'
                />

                <>
                    <input
                        className={confirmPassword !== regForm.password ? styles.wrongInput : ''}
                        placeholder="Confirm password"
                        name='confirmPassword'
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required
                        type={confirmPasswordType ? 'password' : 'text'}
                    />
                    <label 
                        className={styles.showPassword}
                        onClick={showPassword}
                    >
                        {confirmPasswordType ? 'show' : 'hide'}
                    </label>
                </>

                <input
                    type='email'
                    placeholder="Gmail"
                    name='gmail'
                    onChange={handleChange}
                    value={regForm.gmail}
                    required
                />  

                <button>Submit</button>

                {
                    fetchError && <p className={styles.fetchError}>{fetchError.message}</p>
                }
            </form>

            <div className={styles.signIn}>
                <div className={styles.hLine}/>

                <button onClick={handleSignIn}>Sign in</button> 

                <Outlet/> 
            </div>

        </div>
    );
}

export default HomePage;