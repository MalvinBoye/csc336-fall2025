import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function HistoryPage() {
  
  const [sessions, setSessions] = useState([]);



  useEffect(() => {
    fetch(`${API}/api/sessions`)
      .then((res) => res.json())
      .then(setSessions)
      .catch((err) => console.error("Failed to fetch sessions", err));
  }, []);

  return (
    <div className="history-page">
      <h1>Study Session History</h1>

      <div className="history-list">
        {sessions.length === 0 && <p>No sessions yet.</p>}

        {sessions.map((s) => (
          <div key={s.id} className="history-card">
            <h3>{s.mode}</h3>
            <p>{s.workTime} min work / {s.breakTime} min break</p>
            <p className="history-date">
              Completed: {new Date(s.completedAt).toLocaleString()}
            </p>
          </div>
        ))}
       </div>
    </div>
  );
}
