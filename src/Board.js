import React from 'react';
import back from './images/back.jpg';
import './Styles.css';

const Board = ({ boardGame, changeCard }) => {
  return (
    <div className="board">
      {boardGame.map((elem, index) => {
        if (elem.show)
          return (
            <div key={index}>
              <img
                src={elem.src}
                alt={index}
                onClick={changeCard.bind(this, index)}
              ></img>
            </div>
          );
        else
          return (
            <div key={index}>
              <img
                src={back}
                alt={index}
                onClick={changeCard.bind(this, index)}
              ></img>
            </div>
          );
      })}
    </div>
  );
};
export default Board;
