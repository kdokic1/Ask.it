import { useState, useEffect } from 'react';

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
        const fetchData = async () => {
            const response = await fetch(`/questionAnswers/${questionId}`, {
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
        }
        fetchData();
    }, []);

    return ( 
        <div>
            {isAuthenticated && <textarea
                placeholder ="add an answer on this question"
                className ="textAreaAnswer"
                value = {newAnswerDescription}
                onChange = {onWritingAnswer}
            />}
            
            {isAuthenticated && <button onClick={addAnswerHandler}>Add answer</button>}
            
            {answers.map((ans) => (
                <div key={ans.id}>
                    <p>{ans.description}</p>
                </div>
            ))}
            
        </div>
     );
}
 
export default Answers;