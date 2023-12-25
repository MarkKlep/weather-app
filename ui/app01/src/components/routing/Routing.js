import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from '../home-page/HomePage';
import App from '../../App';
import PageNotFound from '../page-not-found/PageNotFound';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import NavBar from '../nav-bar/NavBar';
import Profile from '../profile/Profile';
import SignIn from '../sign-in/SignIn';

const Routing = () => {

    const { user } = useContext(AuthContext);

    return (
        <BrowserRouter>

            <NavBar/>

            <Routes>
                <Route path='/' element={<HomePage/>}>
                    <Route path='sign_in' element={<SignIn/>}/>
                </Route>
                {
                    user && 
                    (<>
                    <Route path='/weather' element={<App/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    </>)
                }
                <Route path='*' element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;
