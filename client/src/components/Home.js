import { useState, useEffect } from 'react';
import '../style/home.css';
import Question from '../components/Question';
import TopUsers from './topUsers';
import '../style/btn.css';
import HotQuestions from './HotQuestions';
import Fire from '../images/fire.png';
import {getAllQuestions} from '../helpers/questionHelper';

const Home = () => {
    const [questions, setQuestions] = useState([]);
    const [numOfDispleyedQuest, setNumOfDispleyedQuest] = useState(6);

    const loadMoreHandler = () => {
        setNumOfDispleyedQuest(numOfDispleyedQuest + 5);
    }


    useEffect(async () => {
        const allQuestions = await getAllQuestions();
        setQuestions(allQuestions);
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