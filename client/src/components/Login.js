import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../style/login.css';
import '../style/btn.css';
import '../style/form.css';
import illustration from '../images/illustration.png';

const Login = ({setAuth}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const history = useHistory();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = { email, password };

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if(!response.ok) {
                setEmailError(data.errors.email);
                setPasswordError(data.errors.password);
            } else {
                localStorage.setItem("token", data.token);
                setAuth(true);
                history.push('/home');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <div className="container">
            <div className="illustration">
                <img src={illustration} className="loginImg"/>
            </div>
            <div className="formContainer">
                <form onSubmit={handleSubmit} className="loginForm">
                    <p className="title">LOGIN</p>
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="enter your email address"
                        required
                        value={email}
                        onChange = {(e) => setEmail(e.target.value)}
                        className="userData"
                    />
                    <p className="error">{emailError}</p>
                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="enter your password"
                        required
                        value={password}
                        onChange = {(e) => setPassword(e.target.value)}
                        className="userData"
                    />
                    <p className="error">{passwordError}</p>
                    <button className="btn">Login</button>
                    <Link to="/signup" className="redirect">Don't have an account?</Link>
                </form>
            </div>
        </div>
     );
}
 
export default Login;