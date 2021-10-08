import { useState } from 'react';
import { useHistory } from 'react-router-dom'

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

        if (emailError != '' || passwordError != '')
            return;
        
        try {
            const response = await fetch('http://localhost:5000/auth/signup', {
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
        <div className="signup">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <label>First name:</label>
                <input
                    type="text"
                    placeholder="first name"
                    value={firstName}
                    onChange = {(e) => setFirstName(e.target.value)}
                />
                <label>Last name:</label>
                <input
                    type="text"
                    placeholder="last name"
                    value={lastName}
                    onChange = {(e) => setLastName(e.target.value)}
                />
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
                    onChange = {(e) => onPasswordChange(e)}
                />
                <p>{passwordError}</p>
                <button>Login</button>
            </form>
        </div>
     );
}
 
export default Signup;