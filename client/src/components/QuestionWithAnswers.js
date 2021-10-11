import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Answers from './Answers';

const QuestionWithAnswers = ({isAuthenticated, setAuth}) => {
    const [question, setQuestion] = useState({});
    const { questionId } = useParams();



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
        <div>
            <p>{question.title}</p>

            <Answers questionId={questionId} isAuthenticated={isAuthenticated}/>
        </div>
     );
}
 
export default QuestionWithAnswers;