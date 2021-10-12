import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Answers from './Answers';
import LikeIcon from '../images/like.png';
import DislikeIcon from '../images/dislike.png';
import '../style/questionWithAnswers.css';
import {addVote} from '../helpers/questionHelper';

const QuestionWithAnswers = ({isAuthenticated, setAuth}) => {
    const [question, setQuestion] = useState({});
    const [numberOfAnswers, setNumberOfAnswers] = useState(0);
    const [numberOfLikes, setNumberOfLikes] = useState(0);
    const [numberOfDislikes, setNumberOfDislikes] = useState(0);
    const { questionId } = useParams();
    var date = new Date(question.date);

    const answerAdded = () => {
        setNumberOfAnswers(numberOfAnswers + 1);
    };

    const answerDeleted = () => {
        setNumberOfAnswers(numberOfAnswers - 1);
    };

    const onVoteHandler = async (isLike) => {
        console.log(isLike);
        const response = await addVote(questionId, isLike);
        if (response.ok) {
            const like = await response.json();
            if(isLike) {
                setNumberOfLikes(numberOfLikes + 1);
            }
            else {
                setNumberOfDislikes(numberOfDislikes + 1);
            }
        }
    };

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
                setQuestion(fetchedQuestion);
                setNumberOfAnswers(fetchedQuestion.numberOfAnswers);
                setNumberOfLikes(fetchedQuestion.numberOfLikes);
                setNumberOfDislikes(fetchedQuestion.numberOfDislikes);
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
                    <p>{numberOfAnswers}</p>
                    <p>Answers</p>
                </div>
                <div className="numberDetails">
                    <p>{numberOfLikes}</p>
                    { !isAuthenticated && <p>Likes</p> }
                    { isAuthenticated && <img src={LikeIcon} alt="Like" onClick={() => onVoteHandler(true)} /> }
                </div>
                <div className="numberDetails">
                    <p>{numberOfDislikes}</p>
                    { !isAuthenticated && <p>Dislikes</p>}
                    { isAuthenticated && <img src={DislikeIcon} alt="Dislike" onClick={() => onVoteHandler(false)} /> }
                </div>
            </div>
            <p className="questDescription">{question.description}</p>
            <Answers
                questionId = {questionId}
                isAuthenticated = {isAuthenticated}
                answerAdded = {answerAdded}
                answerDeleted = {answerDeleted}
            />
        </div>
     );
}
 
export default QuestionWithAnswers;