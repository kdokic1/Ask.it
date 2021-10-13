import { useState, useEffect } from 'react';
import '../style/answer.css';
import Edit from '../images/edit.png';
import Delete from '../images/trash.png';
import Swal from 'sweetalert2';
import {deleteAnswer} from '../helpers/answerHelper';
import {addAnswer} from '../helpers/answerHelper';
import {getAnswers} from '../helpers/answerHelper';
import {editAnswer} from '../helpers/answerHelper';

const Answers = ({questionId, isAuthenticated, answerAdded, answerDeleted}) => {
    const [answers, setAnswers] = useState([]);
    const [newAnswerDescription, setNewAnswerDescription] = useState('');
    const [selectedAnsForEdit, setSelectedAnsForEdit] = useState('');
    const [editedAnswer, setEditedAnswer] = useState('');

    //delete answer
    const onDeleteHandler = async (e, id) => {
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
              deleteAnswer(id, answers, setAnswers);
              answerDeleted();
              Swal.fire(
                'Deleted!',
                'Your answer has been deleted.',
                'success'
              )
            }
          })
    };

    //edit answer
    const onEditHandler = async (e, id, description) => {
        e.preventDefault();
        setSelectedAnsForEdit(id);
        setEditedAnswer(description);
    };

    const onEditingAnswer = (event, id) => {
        setEditedAnswer(event.target.value);
    };

    const cancelEdit = () => {
        setSelectedAnsForEdit('');
        setEditedAnswer('');
    };

    const saveEditedAnswer = async () => {
        if( editedAnswer === '' ) return;
        const resp = await editAnswer(selectedAnsForEdit, editedAnswer);
        setSelectedAnsForEdit('');
        setEditedAnswer('');
        setAnswers(
            answers.map( ans =>
                ans.id === selectedAnsForEdit
                ? {...ans, description: editedAnswer, date: new Date().toLocaleString()}
                : ans
            )
        );
    };

    //add answer
    const addAnswerHandler = async () => {
        if(newAnswerDescription === '') return;
        const newAns = await addAnswer(questionId, newAnswerDescription, setNewAnswerDescription);
        if(newAns) {
            Swal.fire({
                icon: 'success',
                title: 'Your answer has been successfully added.',
                showConfirmButton: false,
                timer: 1500
              })
            setAnswers([newAns, ...answers]);
            answerAdded();
        }
    };

    const onWritingAnswer = (event) => {
        setNewAnswerDescription(event.target.value);
    };

    //get all answers
    useEffect(() => {
        getAnswers(isAuthenticated, questionId, setAnswers);
    }, []);

    return ( 
        <div className="answer">

            <div className="addAnswer">
                {
                    isAuthenticated && 
                    <textarea
                        placeholder ="add an answer to this question"
                        className ="textAreaAnswer"
                        value = {newAnswerDescription}
                        onChange = {onWritingAnswer}
                    />
                }
                {
                    isAuthenticated &&
                    <button onClick={addAnswerHandler} className="btn">Add answer</button>
                }
            </div>

            <p className="allAnswers">ALL ANSWERS</p>

            {answers.map((ans) => (
                <div key={ans.id} className="singleAnswer">
                    <div className="table">
                        <div className="cell">
                            <p className="ansDescription">{ans.description}</p>
                        </div>
                        <div className="cell">
                            {
                                isAuthenticated && 
                                ans.currentUsersAnswer && 
                                <img src={Edit} alt="Edit" className="editIcons" onClick={(e) => { onEditHandler(e, ans.id, ans.description) }} />
                            }
                        </div>
                        <div className="cell">
                            {
                                isAuthenticated &&
                                ans.currentUsersAnswer &&
                                <img 
                                    src={Delete}
                                    alt="Delete"
                                    className="editIcons"
                                    onClick={(e) => { onDeleteHandler(e, ans.id) }} 
                                />
                            }
                        </div>
                    </div>
                    {
                        ans.id === selectedAnsForEdit && 
                        <textarea
                            className ="textAreaEditAns"
                            value = {editedAnswer}
                            onChange = {onEditingAnswer}
                        />
                    }
                    {
                        ans.id === selectedAnsForEdit && 
                        <button className="btnCancel" onClick={cancelEdit} >Cancel</button>
                    }
                    {
                        ans.id === selectedAnsForEdit && 
                        <button className="btnSave" onClick={saveEditedAnswer} >Save</button>
                    }
                    <p className="ansEmail">{ans.userEmail}</p>
                    <p className="ansDate">{new Date(ans.date).toLocaleDateString()} {new Date(ans.date).getHours()}:{new Date(ans.date).getMinutes()}</p>
                    <hr/>
                </div>
            ))}
            
        </div>
     );
}
 
export default Answers;