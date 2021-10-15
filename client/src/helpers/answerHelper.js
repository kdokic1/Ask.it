export const deleteAnswer = async (id, answers, setAnswers) => {
    setAnswers(answers.filter(ans => ans.id !== id));
    await fetch(`/app/answer/${id}`, {
        method: 'DELETE',
        headers: {
            token: localStorage.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
};

export const addAnswer = async (questionId, newAnswerDescription, setNewAnswerDescription) => {
    var date = new Date();
    date.setHours(date.getHours() - 2);

    var data = {
        questionId: questionId,
        description: newAnswerDescription, 
        date: date.toLocaleString()
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
    setNewAnswerDescription('');
    return newAns;
};

export const getAnswers = async (isAuthenticated ,questionId, setAnswers) =>  {
    var path = "questionAnswers";
    if(isAuthenticated) path = "app/questionAnswers";
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
};

export const editAnswer = async (answerId, editedAnswerDescription) => {
    var date = new Date();
    date.setHours(date.getHours() - 2);
    var data = {
        id: answerId,
        description: editedAnswerDescription, 
        date: date.toLocaleString()
    };

    const response = await fetch('/app/editAnswer', {
        method: 'PUT',
        headers: {
            token: localStorage.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const editedAns = await response.json();
    return editedAns;
};
