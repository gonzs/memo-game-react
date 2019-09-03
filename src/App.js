import React, { Fragment } from "react";
import { Images } from "./config/data";
import "./App.css";
import back from "./images/back.jpg";

const Row = ({ value }) => {
  return (
    <tr>
      {value.map((elem, index) => {
        return (
          <td key={index}>
            {elem.show ? (
              <img src={elem.src} alt={index} className="fixed_img" />
            ) : (
              <img src={back} alt={index} className="fixed_img" />
            )}
          </td>
        );
      })}
    </tr>
  );
};

function App() {
  let board = [];

  const n = 8;
  let index = 0;

  for (let i = 0; i < n / 2; i++) {
    let auxBoard = [];
    for (let j = 0; j < n / 2; j++) {
      do {
        index = Math.floor(Math.random() * n);
      } while (Images[index].repeat === 0);

      auxBoard.push({ src: Images[index].src, show: false });
      Images[index].repeat--;
    }
    board.push(auxBoard);
  }

  return (
    <Fragment>
      <h1>MEMOTEST</h1>
      <table>
        <tbody>
          {board.map((row, index) => {
            return <Row value={row} key={index} />;
          })}
        </tbody>
      </table>
    </Fragment>
  );
}

export default App;
