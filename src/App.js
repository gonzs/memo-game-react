import React, { Fragment, Component } from "react";
import { Images } from "./config/data";
import Row from "./Row";

class App extends Component {
  state = {
    boardGame: [],
    toSolve: 0,
    movs: []
  };

  componentDidMount() {
    const n = 8;
    let board = [];
    let index = 0;

    for (let i = 0; i < n / 2; i++) {
      let auxBoard = [];
      for (let j = 0; j < n / 2; j++) {
        do {
          index = Math.floor(Math.random() * n);
        } while (Images[index].repeat === 0);

        auxBoard.push({
          id: Images[index].id,
          src: Images[index].src,
          show: false,
          solved: false
        });
        Images[index].repeat--;
      }
      board.push(auxBoard);
    }

    this.setState({ boardGame: board, toSolve: n });
  }

  changeCard = (rowNumber, colNumber) => {
    let boardGame = this.state.boardGame;
    boardGame[rowNumber][colNumber].show = !this.state.boardGame[rowNumber][
      colNumber
    ].show;

    let updatedMovs = this.state.movs.concat([
      { row: rowNumber, col: colNumber }
    ]);

    this.setState({
      boardGame: boardGame,
      movs: updatedMovs
    });

    if (updatedMovs.length === 2) this.checkIsCorrect(updatedMovs, boardGame);
  };

  checkIsCorrect = (movs, boardGame) => {
    let mov1 = movs[0];
    let mov2 = movs[1];
    let id1 = boardGame[mov1.row][mov1.col].id;
    let id2 = boardGame[mov2.row][mov2.col].id;

    if (id1 === id2) {
      boardGame[mov1.row][mov1.col].solved = true;
      boardGame[mov2.row][mov2.col].solved = true;
      boardGame[mov1.row][mov1.col].show = true;
      boardGame[mov2.row][mov2.col].show = true;
      this.setState({
        boardGame: boardGame,
        movs: [],
        toSolve: this.state.toSolve - 1
      });
    } else {
      setTimeout(() => {
        boardGame[mov1.row][mov1.col].show = false;
        boardGame[mov2.row][mov2.col].show = false;
        this.setState({ boardGame: boardGame, movs: [] });
      }, 1500);
    }
  };

  render() {
    return (
      <Fragment>
        <h1 align="center">MEMO-GAME</h1>
        <table align="center">
          <tbody>
            {this.state.boardGame.map((row, index) => {
              return (
                <Row
                  value={row}
                  key={index}
                  rowNumber={index}
                  changeCard={this.changeCard}
                />
              );
            })}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default App;
