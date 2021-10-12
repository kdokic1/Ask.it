import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Answers from './Answers';
import LikeIcon from '../images/like.png';
import DislikeIcon from '../images/dislike.png';
import '../style/questionWithAnswers.css'

const QuestionWithAnswers = ({isAuthenticated, setAuth}) => {
    const [question, setQuestion] = useState({});
    const { questionId } = useParams();
    var date = new Date(question.date);

    useEffect(() => {
        if(isAuthenticated === false && localStorage.token !== undefined) {
            setAuth(true)
        }

        const fetchData = async () => {
            const response = await fetch(`/questionDetails/${questionId}`, {
                method: "GET",
                headers: { 
                    token: localStorage.token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                 }, 
            });
            if(response.ok){
                const fetchedQuestion = await response.json();
                console.log(fetchedQuestion);
                setQuestion(fetchedQuestion);
            }
        }
        fetchData();
    }, []);

    return ( 
        <div className="questionWithAnswers">
            <p className="qwaTitle">QUESTION:&nbsp;<p>{question.title}</p></p>
            <div className="questionDetails">
                <p>{question.userEmail}</p>
                <p>{date.toLocaleDateString()} {date.getHours()}:{date.getMinutes()}</p>
                <div className="numberDetails">
                    <p>{question.numberOfAnswers}</p>
                    <p>Answers</p>
                </div>
                <div className="numberDetails">
                    <p>{question.numberOfLikes}</p>
                    { !isAuthenticated && <p>Likes</p> }
                    { isAuthenticated && <img src={LikeIcon} alt="Like"/> }
                </div>
                <div className="numberDetails">
                    <p>{question.numberOfDislikes}</p>
                    { !isAuthenticated && <p>Dislikes</p>}
                    { isAuthenticated && <img src={DislikeIcon} alt="Dislike"/> }
                </div>
            </div>
            <p className="questDescription">{question.description}</p>
            <Answers questionId={questionId} isAuthenticated={isAuthenticated}/>
        </div>
     );
}
 
export default QuestionWithAnswers;