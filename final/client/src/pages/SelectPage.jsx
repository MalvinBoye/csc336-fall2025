import SelectScreen from "../components/SelectScreen.jsx";

export default function SelectPage({
  currentMode,
  onRotateLeft,
  onRotateRight,
  customWork,
  customBreak,
  onChangeCustomWork,
  onChangeCustomBreak,
  onStartSession
}) {
  return (
    <SelectScreen
      currentMode={currentMode}
      onRotateLeft={onRotateLeft}
      onRotateRight={onRotateRight}
      customWork={customWork}
      customBreak={customBreak}
      onChangeCustomWork={onChangeCustomWork}
      onChangeCustomBreak={onChangeCustomBreak}
      onStartSession={onStartSession}
    />
  );
}
