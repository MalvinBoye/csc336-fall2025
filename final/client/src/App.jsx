import { useState, useEffect } from "react";
import TimerPage from "./pages/TimerPage.jsx";
import SelectPage from "./pages/SelectPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import SixSevenScene from "./components/SixSevenScene.jsx"; I tried using this library I am using for my capstone but isnt working (maybe next time)


const MODES = [
  { id: "pomodoro", name: "POMODORO", workTime: 25, breakTime: 5 },
  { id: "52-17", name: "52/17", workTime: 52, breakTime: 17 },
  { id: "flow", name: "FLOW TIMER", workTime: 90, breakTime: 20 },
  { id: "custom", name: "CUSTOM", workTime: 30, breakTime: 10 },
];

const JOKES = [
  "Why did the scarecrow win an award? Because he was outstanding in his field.!",
  "What do you call fake spaghetti? An impasta.",
  "What do you call a factory that makes okay products? A satisfactory.",
  "I used to play piano by ear, but now I use my hands.",
  "I'm reading a book on anti-gravity. It's impossible to put down!",
  "Why can't your nose be 12 inches long? Because then it would be a foot",
  "I’m on a whiskey diet. I’ve lost three days already."
];

function AppLogic() {
  const navigate = useNavigate();

  // Modes for the timer and the custom settings
  const [currentModeIndex, setCurrentModeIndex] = useState(0);
  const [customWork, setCustomWork] = useState(30);
  const [customBreak, setCustomBreak] = useState(10);

  // The timer's state
  const [selectedMode, setSelectedMode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  // Jokes
  const [showJoke, setShowJoke] = useState(false);
  const [currentJoke, setCurrentJoke] = useState("");

   // EasterEggs
  const [showRoast, setShowRoast] = useState(false);
  const [roastType, setRoastType] = useState(null); // for serious and group and sixseven67

//Mode rotation
  const rotateLeft = () =>
    setCurrentModeIndex((prev) => (prev - 1 + MODES.length) % MODES.length);
  const rotateRight = () =>
    setCurrentModeIndex((prev) => (prev + 1) % MODES.length);



  function startSession() {
    const mode = MODES[currentModeIndex];
    
    
    // If we're in CUSTOM mode, check for easter eggs
    if (mode.id === "custom") {
      const w = Number(customWork);
      const b = Number(customBreak);

      // 1 min work, 1 min break 
      if (w === 1 && b === 1) {
        setRoastType("serious");
        setShowRoast(true);

        setTimeout(() => {
          setShowRoast(false);
          setRoastType(null);
        }, 4000); // 4 seconds
        return; // don't start session
      }

      // 6 min work, 9 min break 
      if (w === 6 && b === 9) {
        setRoastType("growup");
        setShowRoast(true);

        setTimeout(() => {
          setShowRoast(false);
          setRoastType(null);
        }, 4000); // 4 seconds
        return;
      }

      // 6 min work, 7 min break 
      if (w === 6 && b === 7) {
        setRoastType("sixseven");
        setShowRoast(true);

        setTimeout(() => {
          setShowRoast(false);
          setRoastType(null);
        }, 15000); // 30 seconds
        return;
      }
    }

    // If none of those easterr eggs, proceed as normal
    let finalMode = mode;

    if (mode.id === "custom") {
      finalMode = {
        ...mode,
        workTime: Number(customWork),
        breakTime: Number(customBreak),
      };
    }

    setSelectedMode(finalMode);
    setIsWorkTime(true);
    setTimeLeft(finalMode.workTime * 60);
    setIsRunning(false);

    navigate("/timer");
  }


//Timer Controls
  function toggleTimer() {
    if (!selectedMode) return;
    if (timeLeft <= 0) return;
    setIsRunning((prev) => !prev);
  }

  function resetTimer() {
    if (!selectedMode) return;
    const base = isWorkTime
      ? selectedMode.workTime * 60
      : selectedMode.breakTime * 60;

    setTimeLeft(base);
    setIsRunning(false);
  }

 //The time format (minutes:seconds)
  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

//The progressBar
  function getProgress() {
    if (!selectedMode) return 0;

    const total = (isWorkTime
      ? selectedMode.workTime
      : selectedMode.breakTime) * 60;

    const elapsed = total - timeLeft;
    return Math.min(Math.max((elapsed / total) * 100, 0), 100);
  }

 //Timer 
  useEffect(() => {
    if (!isRunning || !selectedMode) return;

    if (timeLeft === 0) {
      // Work session finished
      if (isWorkTime) {
        setIsRunning(false);
        setSessionsCompleted((prev) => prev + 1);

        const joke = JOKES[sessionsCompleted % JOKES.length];
        setCurrentJoke(joke);
        setShowJoke(true);

        // After joke, move to break
        setTimeout(() => {
          setShowJoke(false);
          setTimeLeft(selectedMode.breakTime * 60);
          setIsWorkTime(false);
        }, 5000);
      } else {
        // Break finished now back to work
        setIsRunning(false);
        setTimeLeft(selectedMode.workTime * 60);
        setIsWorkTime(true);
      }
      return;
    }

    const id = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(id);
  }, [isRunning, timeLeft, isWorkTime, selectedMode]);

 //Routes
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <SelectPage
              currentMode={MODES[currentModeIndex]}
              onRotateLeft={rotateLeft}
              onRotateRight={rotateRight}
              customWork={customWork}
              customBreak={customBreak}
              onChangeCustomWork={setCustomWork}
              onChangeCustomBreak={setCustomBreak}
              onStartSession={startSession}
            />
          }
        />

        <Route
          path="/timer"
          element={
            <TimerPage
              selectedMode={selectedMode}
              isWorkTime={isWorkTime}
              timeLeft={timeLeft}
              formatTime={formatTime}
              isRunning={isRunning}
              onToggleTimer={toggleTimer}
              onResetTimer={resetTimer}
              onBack={() => navigate("/")}
              sessionsCompleted={sessionsCompleted}
              progressPercent={getProgress()}
              showJoke={showJoke}
              currentJoke={currentJoke}
            />
          }
        />

        <Route path="/history" element={<HistoryPage />} />




        
      </Routes>

      {showRoast && (
        <div className="explosion-overlay">
          {roastType === "serious" && (
            <div className="explosion-content">
              <div className="explosion-big-text">ARE WE SERIOUS?</div>
              <p className="explosion-sub">1 minute?? Be for real.</p>
            </div>
          )}

          {roastType === "growup" && ( 
            <div className="explosion-content">
              <div className="explosion-big-text">GROW UP.</div>
              <p className="explosion-sub">6 minutes of work, 9 minutes break is crazy.</p>
            </div>
          )}

          {roastType === "sixseven" && (
              <div className="explosion-content">
                <div className="explosion-big-text"> 6 7 </div>
                  <p className="explosion-sub">
                    CLOSE THIS TAB FOR the sake of YOURS AND MY MENTAL HEALTH
                  </p>
                
              </div>
          )}

          </div>

          )}
    </>
  );
}



export default function App() {
  return (
    <BrowserRouter>
      <AppLogic />
    </BrowserRouter>
  );
}


