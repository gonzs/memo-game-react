import React from "react";
import Row from "./Row";

const Board = ({ boardGame, changeCard }) => {
  return (
    <table align="center">
      <tbody>
        {boardGame.map((row, index) => {
          return (
            <Row
              value={row}
              key={index}
              rowNumber={index}
              changeCard={changeCard}
            />
          );
        })}
      </tbody>
    </table>
  );
};
export default Board;
