import { useState, useEffect } from 'react';
import '../style/answer.css';
import Edit from '../images/edit.png';
import Delete from '../images/trash.png';

const Answers = ({questionId, isAuthenticated}) => {
    const [answers, setAnswers] = useState([]);
    const [newAnswerDescription, setNewAnswerDescription] = useState('');

    const addAnswerHandler = async () => {
        var data = {
            questionId: questionId,
            description: newAnswerDescription,
            date: new Date().toLocaleString()
        };

        const response = await fetch('/app/addAnswer', {
            method: 'POST',
            headers: {
                token: localStorage.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const newAns = await response.json();
        setAnswers([newAns, ...answers])
        setNewAnswerDescription('')
    };

    const onWritingAnswer = (event) => {
        setNewAnswerDescription(event.target.value);
    }

    useEffect(() => {
        var path = "questionAnswers";
        if(isAuthenticated) path = "app/questionAnswers";

        const fetchData = async () => {
            const response = await fetch(`/${path}/${questionId}`, {
                method: "GET",
                headers: { 
                    token: localStorage.token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }, 
            });

            if(response.ok){
                const fetchedAnswers = await response.json();
                setAnswers(fetchedAnswers);
            }
            //currentUsersAnswer
        }
        fetchData();
    }, []);

    return ( 
        <div className="answer">

            <div className="addAnswer">
                {isAuthenticated && <textarea
                    placeholder ="add an answer to this question"
                    className ="textAreaAnswer"
                    value = {newAnswerDescription}
                    onChange = {onWritingAnswer}
                />}
                {isAuthenticated && <button onClick={addAnswerHandler} className="btn">Add answer</button>}
            </div>

            <p className="allAnswers">ALL ANSWERS</p>

            {answers.map((ans) => (
                <div key={ans.id} className="singleAnswer">
                    <div className="table">
                        <div className="cell">
                            <p className="ansDescription">{ans.description}</p>
                        </div>
                        <div className="cell">
                            {isAuthenticated && ans.currentUsersAnswer && <img src={Edit} alt="Edit" className="editIcons"/>}
                        </div>
                        <div className="cell">
                            {isAuthenticated && ans.currentUsersAnswer && <img src={Delete} alt="Edit" className="editIcons"/>}
                        </div>
                    </div>
                    <p className="ansEmail">{ans.userEmail}</p>
                    <p className="ansDate">{new Date(ans.date).toLocaleDateString()} {new Date(ans.date).getHours()}:{new Date(ans.date).getMinutes()}</p>
                    <hr/>
                </div>
            ))}
            
        </div>
     );
}
 
export default Answers;