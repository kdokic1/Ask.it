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
