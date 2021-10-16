import { useState, useEffect } from 'react';
import '../style/topUsers.css'
import firstPlace from '../images/first.png'
import secondPlace from '../images/second.png'
import thirdPlace from '../images/third.png'

const TopUsers = () => {
    const [topThreePeople, setTopThreePeople] = useState([]);

    useEffect(() => {
        const fetchPeople = async () => {
            const response = await fetch('/topThreePeople', {
                method: "GET",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                 }, 
            });
            if(response.ok){
                const fetchedPeople = await response.json();
                setTopThreePeople(fetchedPeople);
            }
        }
        fetchPeople()
    }, []);

    return ( 
        <div className="topUsers">
            <div>
                <img src={firstPlace} alt="firstPlace" className="placeImg1"></img>
                <img src={secondPlace} alt="secondPlace" className="placeImg"></img>
                <img src={thirdPlace} alt="thirdPlace" className="placeImg"></img>
            </div>
            <div className="threeUsers">
            {topThreePeople.map((user) => (
                    <div key={user.id} className="user" >
                        <p className="topEmail">{user.email}</p>
                        <p className="topAns">Answered {user.numberOfAnswers} questions</p>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default TopUsers;