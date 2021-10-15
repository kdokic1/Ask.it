export const getAccountDetails = async () => {
    const response = await fetch('/app/accountDetails', {
        method: "GET",
        headers: { 
            token: localStorage.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }, 
    });
    if(response.ok){
        const accountDetails = await response.json();
        return accountDetails;
    }
};


export const editAccountDetails = async (acc) => {

    const response = await fetch('/app/editUser', {
        method: 'PUT',
        headers: {
            token: localStorage.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(acc)
    });

    return response;
};

