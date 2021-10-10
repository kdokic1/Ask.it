import { useState, useEffect } from 'react';
import '../style/home.css'
import Question from '../components/Question';
import '../style/btn.css'

const Home = () => {
    const [questions, setQuestions] = useState([]);
    const [numOfDispleyedQuest, setNumOfDispleyedQuest] = useState(6);

    const loadMoreHandler = () => {
        setNumOfDispleyedQuest(numOfDispleyedQuest + 5);
    }

    useEffect(() => {
        async function fetchQuestions() {
            const response = await fetch('/questions', {
                method: "GET",
                headers: { 
                    token: localStorage.token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                 }, 
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
                {questions.slice(0, numOfDispleyedQuest).map((quest) => (
                    <div key={quest.id}>
                        <Question question={quest} />
                    </div>
                ))}
                <button onClick={loadMoreHandler} className="btn loadMoreBtn">load more...</button>
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