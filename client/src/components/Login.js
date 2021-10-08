import { useState } from 'react';
import { useHistory } from 'react-router-dom'

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
                history.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    placeholder="email"
                    required
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}
                />
                <p>{emailError}</p>
                <label>Password:</label>
                <input
                    type="password"
                    placeholder="password"
                    required
                    value={password}
                    onChange = {(e) => setPassword(e.target.value)}
                />
                <p>{passwordError}</p>
                <button>Login</button>
            </form>
        </div>
     );
}
 
export default Login;