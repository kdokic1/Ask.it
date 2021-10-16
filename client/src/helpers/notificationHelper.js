export const getUserNotifications = async () => {
    const response = await fetch('/app/userNotifications', {
        method: "GET",
        headers: { 
            token: localStorage.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }, 
    });
    return response;
};