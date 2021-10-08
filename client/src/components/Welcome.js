import { useState, useEffect } from 'react';
import logo from '../images/asking.jpg';
import { useHistory } from 'react-router-dom';

const Welcome = () => {
    const history = useHistory();
    const handleHomeClick = () => history.push('/home');
    const handleLoginClick = () => history.push('/login');
    const handleSignupClick = () => history.push('/signup');
    return ( 
        <div className="welcome">
            <div>
                <h1 className="sayWelcome">Welcome to AskIt</h1>
                <div className="choices">
                    <div>
                        <h3 className="choice">Check out the most popular questions</h3>
                        <button className="btn" onClick={handleHomeClick}>Home</button>
                    </div>
                    <div className="vertical"></div>
                    <div>
                        <h3 className="choice">Join us in collecting questions and answers</h3>
                        <button className="btn" onClick={handleLoginClick}>Login</button>
                    </div>
                    <div className="vertical"></div>
                    <div>
                        <h3 className="choice">Become a part of AskIt community</h3>
                        <button className="btn" onClick={handleSignupClick}>Signup</button>
                    </div>
                </div>
            
            </div>
            <img className="welcomeLogo" src={logo} alt="Logo" />
            
        </div>
     );

}
 
export default Welcome;