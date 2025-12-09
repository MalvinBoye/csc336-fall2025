# NoTime(StudyTimer) — Full-Stack Focus Timer (React + Express)

A multi-mode neon productivity timer inspired by Not Boring’s aesthetic.  
Built with React, Express, React Router.  
Users choose their study mode, complete focus sessions, and receive a motivational joke after each session. All completed sessions are stored using a JSON database on the Express server.

---

Render

FrontEnd(Reacts)
https://notime-studytimer.onrender.com/

BackEnd(Express)
https://csc336-fall2025-final.onrender.com/

Be sure to replace the URLs after deployment.

---

WHat does the APP do
NoTime helps users stay focused using structured study intervals.  
It includes:
-   Multiple timer modes (Pomodoro, 52/17, Flow Timer, Custom)
- A full-screen neon timer interface
- Motivational "reward" screen with a randomly selected joke
- Tracking of completed focus sessions
- A history page showing all prior sessions (fetched from Express API)
- Full-stack data flow between React and Express
- Persistent storage using a JSON file (`server/data.json`)

Routes include:
- `/` — Choose timer mode  
- `/timer` — Timer screen  
- `/history` — Session log from server  

Functionality
- Start, pause, reset
- Work → Break transitions
- Neon progress bar
- 5-second “reward popup” after each session

Custom Time Mode
Users can enter:
- Custom work time  
- Custom break time  

Session History page 
Loads session history from backend using:
api/sessions
