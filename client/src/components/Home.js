import { useState, useEffect } from 'react';
import '../style/home.css'
import Question from '../components/Question';

const Home = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function fetchQuestions() {
            const response = await fetch('http://localhost:5000/questions', {
                method: "GET",
                headers: { token: localStorage.token },
            });
            if(response.ok){
                const fetchedQuestions = await response.json();
                setQuestions(fetchedQuestions);
            }
        }
        fetchQuestions();
    }, []);
    return ( 
        <div className="home">

           <div className="topPeopleContainer">
               <p>
                   ovdje ce biti ljudi
               </p>
           </div>
           <div className="questionsContainer">
               <p className="allQuestions">All Questions</p>
                {questions.map((quest) => (
                    <div key={quest.id}>
                        <Question question={quest}/>
                    </div>
                ))}
           </div>
           <div className="hotQuestionsContainer">
                <p>
                    ovdje ce biti top pitanja
                </p>
           </div>

        </div>
     );

}
 
export default Home;