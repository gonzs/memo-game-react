import React from "react";

const SelectionScreen = ({ level, handleChange, startGame }) => {
  return (
    <div align="center">
      <select value={level} onChange={handleChange}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <br />
      <button onClick={startGame}>Start</button>
    </div>
  );
};
export default SelectionScreen;
