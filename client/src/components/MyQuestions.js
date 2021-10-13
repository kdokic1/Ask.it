import { useState, useEffect } from 'react';
import Question from './Question';
import { getUserQuestions } from '../helpers/questionHelper';
import '../style/myQuestions.css';
import Delete from '../images/trash.png';
import Swal from 'sweetalert2';
import { deleteQuestion } from '../helpers/questionHelper';

const MyQuestions = ({isAuthenticated}) => {
    const [questions, setQuestions] = useState([]);
    const [numOfDispleyedQuest, setNumOfDispleyedQuest] = useState(6);

    const loadMoreHandler = () => {
        setNumOfDispleyedQuest(numOfDispleyedQuest + 5);
    };

    const onDeleteHandler = (e, id) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              deleteQuestion(id, questions, setQuestions);
              Swal.fire(
                'Deleted!',
                'Your answer has been deleted.',
                'success'
              )
            }
          })
    };


    useEffect(async () => {
        const userQuestions = await getUserQuestions();
        setQuestions(userQuestions);
    }, []);

    return ( 
        <div>
            <div className="myQuestionsContainer">
               <div>
                    <p className="allQuestions">My Questions</p>
                    {questions.slice(0, numOfDispleyedQuest).map((quest) => (
                        <div key={quest.id} className="questionBox">
                            <div className="cell">
                                <Question question={quest} className="mySingleQuestion"/>
                            </div>
                            <div className="cell">
                                <img 
                                    src={Delete}
                                    alt="Delete"
                                    onClick={(e) => { onDeleteHandler(e, quest.id) }} 
                                />
                            </div>
                        </div>
                    ))}
                    <button onClick={loadMoreHandler} className="btn loadMoreBtn">load more...</button>
               </div>
                <p className="col3">jos jedna kolona</p>
           </div>
        </div>
     );
}
 
export default MyQuestions;