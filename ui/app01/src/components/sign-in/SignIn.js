import { useState, useContext } from 'react';
import styles from './SignIn.module.css';
import { API_WEATHER_URL } from '../api';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const initialAuthForm = {
    name: '',
    password: ''
}

const SignIn = () => {

    const [authForm, setAuthForm] = useState(initialAuthForm);
    const [fetchError, setFetchError] = useState(null);

    const { setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAuthForm({
            ...authForm,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `${API_WEATHER_URL}/sign_in_form?name=${authForm.name}&password=${authForm.password}`;
   
            const response = await fetch(url);
            
            const data = await response.json();

            if(response.ok) {
                setUser(data);
                setAuthForm(initialAuthForm);
                setFetchError(null);
                navigate('/weather');
            }
            else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            setFetchError(error.message);
        }
    }

    return (
        <div>
            
            <form className={styles.signInForm} onSubmit={handleSubmit}>

                <input
                    name='name'
                    placeholder="Name"
                    onChange={handleChange}
                    value={authForm.name}
                    required
                 />

                <input
                    name='password'
                    placeholder="Password"
                    type='password'
                    onChange={handleChange}
                    value={authForm.password}
                    required
                 />

                <button>confirm</button>

                {
                    fetchError && <p>{fetchError.message}</p>
                }
            </form>

        </div>
    );
}

export default SignIn;