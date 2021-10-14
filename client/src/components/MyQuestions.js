import { useState, useEffect } from 'react';
import Question from './Question';
import { getUserQuestions } from '../helpers/questionHelper';
import '../style/myQuestions.css';
import Delete from '../images/trash.png';
import Swal from 'sweetalert2';
import { deleteQuestion } from '../helpers/questionHelper';
import { addQuestion } from '../helpers/questionHelper';

const MyQuestions = ({isAuthenticated}) => {
    const [questions, setQuestions] = useState([]);
    const [numOfDispleyedQuest, setNumOfDispleyedQuest] = useState(6);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const loadMoreHandler = () => {
        setNumOfDispleyedQuest(numOfDispleyedQuest + 5);
    };

    const askQuestionHandler = async () => {
        if (title === '') return;
        const newQuestion = await addQuestion(title, description);
        if(newQuestion) {
            Swal.fire({
                icon: 'success',
                title: 'Your question has been successfully added.',
                showConfirmButton: false,
                timer: 1500
              });
              setQuestions([newQuestion, ...questions]);
              setTitle('');
              setDescription('');
        }
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
               <div className="col1">
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
               <div className="col2">
                    <p className="allQuestions">Ask Question</p>
                    <p>Title</p>
                    <input
                        type="text"
                        placeholder="enter your specific question"
                        required
                        value={title}
                        onChange = {(e) => setTitle(e.target.value)}
                        className="newQuestionTitle"
                    />
                    <p>Description</p>
                    <textarea
                        className ="newQuestionDescription"
                        value = {description}
                        required
                        placeholder="give us more information about your question"
                        onChange = {(e) => setDescription(e.target.value)}
                    />
                    <button onClick={askQuestionHandler} className="btn">Ask</button>
               </div>
           </div>
        </div>
     );
}
 
export default MyQuestions;