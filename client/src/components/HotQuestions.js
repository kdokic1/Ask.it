import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LikeIcon from '../images/like.png';
import '../style/hotQuestion.css'

const HotQuestions = () => {
    const [hotQuestions, setHotQuestions] = useState([]);
    const history = useHistory();

    const handleQuestionDetails = (questionId) => {
        history.push(`/question/${questionId}`);
    }

    useEffect(() => {
        const fetchHotQuestions = async () => {
            const response = await fetch('/topThreeQuestions', {
                method: "GET",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                 }, 
            });
            if(response.ok){
                const fetchedData = await response.json();
                setHotQuestions(fetchedData);
            }
        }
        fetchHotQuestions()
    }, []);

    return ( 
        <div>
            {hotQuestions.map((quest) => (
                <div key={quest.id} className="hotQuestion">
                    <p className="hotTitle" onClick = {() => handleQuestionDetails(quest.id)} >{quest.title}</p>
                    <div className="likes">
                        <p className="hotLikesNumber">{quest.numberOfLikes}</p>
                        <img src={LikeIcon} alt="Likes" className="likeIcon"/>
                    </div>
                </div>
            ))}
        </div>
     );
}
 
export default HotQuestions;