export const getAllQuestions = async () => {
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
        return fetchedQuestions;
    }
};


export const getUserQuestions = async () => {
    const response = await fetch('/app/userQuestions', {
        method: "GET",
        headers: { 
            token: localStorage.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }, 
    });
    if(response.ok){
        const fetchedQuestions = await response.json();
        return fetchedQuestions;
    }
};

export const addVote = async (questionId, isLike) => {
    const like = {
        questionId: questionId,
        isLike: isLike
    };

    const response = await fetch('/app/questionVote', {
        method: 'POST',
        headers: {
            token: localStorage.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(like)
    });

    return response;
};

export const deleteQuestion = async (id, questions, setQuestions) => {
    setQuestions(questions.filter(quest => quest.id !== id));
    await fetch(`/app/question/${id}`, {
        method: 'DELETE',
        headers: {
            token: localStorage.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
};

export const addQuestion = async (title, description) => {
    var date = new Date();
    date.setHours(date.getHours() + 2);

    var data = {
        title: title,
        description: description, 
        date: date.toLocaleString()
    };

    const response = await fetch('/app/addQuestion', {
        method: 'POST',
        headers: {
            token: localStorage.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const newQuest = await response.json();
    return newQuest;
};

