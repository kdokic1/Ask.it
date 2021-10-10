import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';
import '../style/form.css';
import '../style/btn.css';
import '../style/signup.css';
import illustration from '../images/illustration.png';

const Signup = ({setAuth}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const history = useHistory();

    const onPasswordChange = (e) => {
        if(e.target.value.length < 5) 
            setPasswordError("Password should contain at least 5 characters.")
        else
            setPasswordError('');

        setPassword(e.target.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = { firstName, lastName, email, password };

        if (emailError !== '' || passwordError !== '')
            return;
        
        try {
            const response = await fetch('/auth/signup', {
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
                <img src={illustration} alt="Illustration" className="loginImg"/>
            </div>
            <div className="formContainer">
                <form onSubmit={handleSubmit} className="signupForm">
                    <p className="title">SIGNUP</p>
                    <label>First name:</label>
                    <input
                        type="text"
                        placeholder="enter your first name"
                        value={firstName}
                        onChange = {(e) => setFirstName(e.target.value)}
                        className="userData"
                    />
                    <label>Last name:</label>
                    <input
                        type="text"
                        placeholder="enter your last name"
                        value={lastName}
                        onChange = {(e) => setLastName(e.target.value)}
                        className="userData"
                    />
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
                        onChange = {(e) => onPasswordChange(e)}
                        className="userData"
                    />
                    <p className="error">{passwordError}</p>
                    <button className="btn signupBtn">Signup</button>
                    <Link to="/login" className="redirect">Already have an account?</Link>
                </form>
            </div>
        </div>
     );
}
 
export default Signup;