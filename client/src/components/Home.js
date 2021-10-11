import { useState, useEffect } from 'react';
import '../style/home.css';
import Question from '../components/Question';
import TopUsers from './topUsers';
import '../style/btn.css';
import HotQuestions from './HotQuestions';
import Fire from '../images/fire.png';

const Home = () => {
    const [questions, setQuestions] = useState([]);
    const [numOfDispleyedQuest, setNumOfDispleyedQuest] = useState(6);

    const loadMoreHandler = () => {
        setNumOfDispleyedQuest(numOfDispleyedQuest + 5);
    }


    useEffect(() => {
        const fetchData = async () => {
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
        fetchData();
    }, []);

    return ( 
        <div className="home">

           <div className="topPeopleContainer">
               <p className="topThreeUsers">TOP THREE USERS</p>
                <TopUsers />
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
                <p className="topThreeQuestions"><img src={Fire} alt="Hot"/>QUESTIONS</p>
                <HotQuestions />
           </div>

        </div>
     );

}
 
export default Home;