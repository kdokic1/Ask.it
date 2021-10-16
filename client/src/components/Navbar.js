import { Link } from 'react-router-dom';
import logo from '../images/askitLogo.png';
import notification from '../images/notification.png';
import { useHistory } from 'react-router-dom';

const Navbar = ({isAuthenticated, setAuth}) => {

    const handleLogout = () => {
        setAuth(false);
        localStorage.removeItem("token");
    };

    const history = useHistory();
    const handleHomeClick = () => history.push('/home');
    const handleNotification = () => history.push('/notifications');

    return ( 
        <nav className="navbar">
            <img className="logo" src={logo} alt="Logo" onClick={handleHomeClick} />
            <div className="links">
                <Link to="/home">Home</Link>
                {!isAuthenticated && <Link to="/login">Login</Link>}
                {!isAuthenticated && <Link to="/signup">Signup</Link>}
                {isAuthenticated && <Link to="/myQuestions">My Questions</Link>}
                {isAuthenticated  && <img className="notification" src={notification} alt="Notification" onClick={handleNotification}/>}
                {isAuthenticated && <Link to="/account">Account</Link>}
                {isAuthenticated && <Link to="/" onClick={handleLogout}>Logout</Link>}
            </div>
        </nav>
     );
}
 
export default Navbar;