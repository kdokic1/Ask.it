import { Link } from 'react-router-dom';
import logo from '../images/askitLogo.png';


const Navbar = ({isAuthenticated, setAuth}) => {

    const handleLogout = () => {
        setAuth(false);
        localStorage.removeItem("token");
    };

    return ( 
        <nav className="navbar">
            <img className="logo" src={logo} alt="Logo" />
            <div className="links">
                <Link to="/">Home</Link>
                {!isAuthenticated && <Link to="/login">Login</Link>}
                {!isAuthenticated && <Link to="/signup">Signup</Link>}
                {isAuthenticated && <Link to="/login" onClick={handleLogout}>Logout</Link>}
            </div>
        </nav>
     );
}
 
export default Navbar;