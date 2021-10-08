import { useState, useEffect } from 'react';

const Home = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(async() => {
        const response = await fetch('http://localhost:5000/questions', {
            method: "GET",
            headers: { token: localStorage.token },
        });

        if(response.ok){
            const fetchedQuestions = await response.json();
            setQuestions(fetchedQuestions);
        }
            
    }, []);
    return ( 
        <div className="home">
           {questions.map((quest) => (
               <div className="blog" key={quest.id}>
                   <h2>{ quest.title }</h2>
                   <p>{ quest.description }</p>
               </div>
           ))}
        </div>
     );

}
 
export default Home;