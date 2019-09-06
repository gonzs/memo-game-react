import React, { Fragment, Component } from "react";
import { Images } from "./config/data";
import Row from "./Row";

class App extends Component {
  state = {
    boardGame: [],
    toSolve: 0,
    movs: [],
    level: "easy",
    wait: 0,
    begin: 0
  };

  startGame = () => {
    let n = 0;
    let board = [];
    let index = 0;
    let wait = 0;
    Images.forEach(elem => {
      elem.repeat = 2;
    });

    switch (this.state.level) {
      case "easy":
        n = 8;
        wait = 500;
        break;
      case "medium":
        n = 12;
        wait = 500;
        break;
      case "hard":
        n = 12;
        wait = 250;
        break;
      default:
        break;
    }

    for (let i = 0; i < (n * 2) / 4; i++) {
      let auxBoard = [];
      for (let j = 0; j < 4; j++) {
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

    this.setState({
      boardGame: board,
      toSolve: n,
      wait: wait,
      begin: Date.now()
    });
  };

  changeCard = async (rowNumber, colNumber) => {
    if (
      this.state.movs.length === 0 ||
      (this.state.movs.length === 1 &&
        (this.state.movs[0].row !== rowNumber ||
          this.state.movs[0].col !== colNumber))
    ) {
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

      if (updatedMovs.length === 2)
        setTimeout(() => {
          this.checkIsCorrect(updatedMovs, boardGame);
        }, this.state.wait);
    }
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
      if (this.state.toSolve === 0) {
        let end = Date.now();

        let timeSpent = (end - this.state.begin) / 1000;
        alert("¡¡¡YOU WIN!!! and your time was " + timeSpent + " secs");
        this.setState({ boardGame: [] });
      }
    } else {
      boardGame[mov1.row][mov1.col].show = false;
      boardGame[mov2.row][mov2.col].show = false;
      this.setState({ boardGame: boardGame, movs: [] });
    }
  };

  handleChange(event) {
    this.setState({ level: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <h1 align="center">MEMO-GAME</h1>
        {this.state.toSolve === 0 ? (
          <div align="center">
            <select
              value={this.state.level}
              onChange={this.handleChange.bind(this)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <br />
            <button onClick={this.startGame.bind(this)}>Start</button>
          </div>
        ) : (
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
        )}
      </Fragment>
    );
  }
}

export default App;
