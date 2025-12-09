import { useEffect, useRef } from "react";
import TimerScreen from "../components/TimerScreen";


const API = import.meta.env.VITE_API_URL || "https://csc336-fall2025-final.onrender.com/";

export default function TimerPage({
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
  currentJoke
}) {
  /**
   * Prevent multiple POST requests.
   * showJoke becomes true for 5 seconds after *each* completed work block.
   * But React may re-render multiple times.
   */
  const lastPostedSession = useRef(0);

  useEffect(() => {
    if (!selectedMode) return;

    // A session is completed when:
    // 1. Work mode ends, AND
    // 2. showJoke becomes true, AND
    // 3. sessionsCompleted increments, AND
    // 4. We haven't posted for this completion yet.
    if (showJoke && sessionsCompleted !== lastPostedSession.current) {
      lastPostedSession.current = sessionsCompleted;

      const payload = {
        mode: selectedMode.name,
        workTime: selectedMode.workTime,
        breakTime: selectedMode.breakTime,
      };

      fetch(`${API}/api/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then(() => {
          console.log("Session logged to backend:", payload);
        })
        .catch((err) => console.error("Failed to POST session", err));
    }
  }, [showJoke, selectedMode, sessionsCompleted]);

  return (
    <TimerScreen
      selectedMode={selectedMode}
      isWorkTime={isWorkTime}
      timeLeft={timeLeft}
      formatTime={formatTime}
      isRunning={isRunning}
      onToggleTimer={onToggleTimer}
      onResetTimer={onResetTimer}
      onBack={onBack}
      sessionsCompleted={sessionsCompleted}
      progressPercent={progressPercent}
      showJoke={showJoke}
      currentJoke={currentJoke}
    />
  );
}


