import "../styles/TimerScreen.css";
import {Link} from "react-router-dom";

export default function TimerScreen({
  selectedMode,
  isWorkTime,
  timeLeft,
  formatTime,
  isRunning,
  onToggleTimer,
  onResetTimer,
  onBack,
  sessionsCompleted,
  progressPercent,
  showJoke,
  currentJoke,
}) {
  if (!selectedMode) {
    return (
      <div className="timer-screen">
        <div className="timer-card">
          <p>Something went wrong. No mode selected.</p>
          <button type="button" className="btn btn-primary" onClick={onBack}>
            &lt; Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="timer-screen">
      <div className="timer-layout">
        <header className="timer-header">
          <button
            type="button"
            className="btn btn-outline"
            onClick={onBack}
          >
            &lt; BACK
          </button>
          <div className="session-pill">SESSIONS: {sessionsCompleted}</div>
          <Link to="/history" className="btn btn-outline">
          History
          </Link>
        </header>

        <section className="timer-card">
          <h2 className="timer-name">{selectedMode.name}</h2>
          <p className="timer-phase">
            {isWorkTime ? "/// FOCUS TIME ///" : "/// BREAK TIME ///"}
          </p>

          <div className="timer-display">{formatTime(timeLeft)}</div>

          <div className="timer-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onResetTimer}
            >
              RESET
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onToggleTimer}
            >
              {isRunning ? "PAUSE" : "START"}
            </button>
          </div>

          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </section>

        <p className="timer-footer">
          {isWorkTime
            ? "/// ELIMINATE DISTRACTIONS ///"
            : "/// STAND UP & STRETCH ///"}
        </p>
      </div>

      {showJoke && (
        <div className="joke-overlay">
          <div className="joke-card">
            <h2 className="joke-title">GREAT WORK!</h2>
            <p className="joke-subtitle">
              Session #{sessionsCompleted} complete!
            </p>
            <div className="joke-box">
              <p>{currentJoke}</p>
            </div>
            <p className="joke-footer">Starting break in a moment...</p>
          </div>
        </div>
      )}
    </div>
  );
}
