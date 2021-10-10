import '../style/question.css'

const Question = ({question}) => {
    var date = new Date(question.date);
    return ( 
        <div className="questionContainer">
            <div className="dateAndBy">
                <p>{date.toLocaleDateString()} {date.getHours()}:{date.getMinutes()}</p>
                <p>{question.userEmail}</p>
            </div>
            <p className="questTitle">{question.title}</p>
            <div className="statistics">
                <p>{question.numberOfAnswers}</p>
                <p>Answers</p>
            </div>
            <div className="statistics">
                <p>{question.numberOfLikes}</p>
                <p>Likes</p>
            </div>
            <div className="statistics">
                <p>{question.numberOfDislikes}</p>
                <p>Dislikes</p>
            </div>
        </div>
     );
}
 
export default Question;