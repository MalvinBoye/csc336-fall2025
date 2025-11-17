import { useEffect, useState } from "react";
import "./App.css";

function ApiAdvice() {
    const [advice, setAdvice] = useState(" ");
    const [loading, setLoading] = useState(true);


const fetchAdvice=() => {
    setLoading(true);

    fetch('https://api.adviceslip.com/advice')
        .then((res) => {
            if (!res.ok) 
                throw new Error("Failed to fetch advice");
                return res.json();
            })
            
        .then(data => {
            setAdvice(data.slip.advice);
            setLoading(false);
        })
        .catch(() => {
            setAdvice("Could not Load Advice");
            setLoading(false);
        });
};

useEffect(()=> {
    fetchAdvice();
}, []);

return (
    <div className="adivice-cn">
        <h2> Random Advice</h2>
        {loading ? (
            <p>Loading...</p>
        ):(
            <>
            <p>"{advice}"</p>
            </>
        )}
    <button className="advice-btn" onClick={fetchAdvice}>
        Get New Advice
        </button>              
    </div>
    );
}

export default ApiAdvice;