import { useEffect, useState } from "react";

function ApiAdvice() {
    const [ advice, setAdvice] = useState("Loading advice.....");
    const [refreshCount, setRefreshCount] = useState(0);


const fetchAdvice=() => {
    fetch('https://api.adviceslip.com/advice')
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to fetch advice");
            }
            return res.json();
        })
        .then(data => {
            setAdvice(data.slip.advice);
        })
        .catch(err => {
            setAdvice("Could not Load Advice");
        });
};

useEffect(()=> {
    fetchAdvice();
}, [refreshCount]);

return (
    <div>
        <h2> Random Advice</h2>
        {!advice ? (
            <p>Loading...</p>
        ):(
            <>
            <p>"{advice}"</p>
            </>
        )}
    <button onClick={ () => setRefreshCount(refreshCount + 1)}>
        Get New Advice
        </button>              
    </div>
    );
}

export default ApiAdvice;