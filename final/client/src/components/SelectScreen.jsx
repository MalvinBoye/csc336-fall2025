import "../styles/SelectScreen.css";

export default function SelectScreen({
  currentMode,
  onRotateLeft,
  onRotateRight,
  customWork,
  customBreak,
  onChangeCustomWork,
  onChangeCustomBreak,
  onStartSession,
}) {
  const isCustom = currentMode.id === "custom";

  return (
    <div className="select-screen">
      <div className="select-card">
        <header className="select-header">
          <h1 className="select-title">NoTime(StudyTimer)</h1>
          <p className="select-subtitle">[ CHOOSE YOUR FOCUS MODE ]</p>
        </header>

        <section className="mode-wheel">
          <div className="mode-icon">⚙</div>
          <h2 className="mode-name">{currentMode.name}</h2>
          <p className="mode-meta">
            {currentMode.workTime} min work / {currentMode.breakTime} min break
          </p>

          <div className="mode-controls">
            <button
              type="button"
              className="btn btn-outline btn-circle"
              onClick={onRotateLeft}
            >
              &lt;
            </button>
            <button
              type="button"
              className="btn btn-outline btn-circle"
              onClick={onRotateRight}
            >
              &gt;
            </button>
          </div>
        </section>

        {isCustom && (
          <section className="custom-settings">
            <div className="custom-field">
              <label className="custom-label">WORK TIME (MIN)</label>
              <input
                type="number"
                className="custom-input"
                value={customWork}
                min={1}
                onChange={(e) => onChangeCustomWork(e.target.value)}
              />
            </div>

            <div className="custom-field">
              <label className="custom-label">BREAK TIME (MIN)</label>
              <input
                type="number"
                className="custom-input"
                value={customBreak}
                min={1}
                onChange={(e) => onChangeCustomBreak(e.target.value)}
              />
            </div>
          </section>
        )}

        <button
          type="button"
          className="btn btn-primary btn-full"
          onClick={onStartSession}
        >
          [ START SESSION ]
        </button>

        <p className="select-footer">/// FOCUS. EARN. REPEAT ///</p>
      </div>
    </div>
  );
}
