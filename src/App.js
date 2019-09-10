import React, { Fragment, Component } from "react";
import { Images } from "./config/data";
import Board from "./Board";
import SelectionScreen from "./SelectionScreen";

class App extends Component {
  /* Application State */
  state = {
    boardGame: [],
    toSolve: 0,
    movs: [],
    level: "easy",
    wait: 0,
    begin: 0
  };

  /* Define difficulty level */
  defineLevel(level) {
    switch (level) {
      case "easy":
        return { n: 8, wait: 500 };
      case "medium":
        return { n: 12, wait: 500 };
      case "hard":
        return { n: 12, wait: 250 };
      default:
        break;
    }
  }

  /* Put default valut for repeat property  */
  setDefaultValuesImages() {
    Images.forEach(elem => {
      elem.repeat = 2;
    });
  }

  /* Fill board game */
  startGame() {
    let board = [];
    let index = 0;

    this.setDefaultValuesImages();

    let { n, wait } = this.defineLevel(this.state.level);

    for (let i = 0; i < (n * 2) / 4; i++) {
      let auxBoard = [];
      for (let j = 0; j < 4; j++) {
        /*Select random image */
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
  }

  /* Validations when press a card */
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

  /* Validation when discover 2 cards */
  checkIsCorrect(movs, boardGame) {
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
  }

  /* Handle action of Select component */
  handleChange(event) {
    this.setState({ level: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <h1 align="center">MEMO-GAME</h1>
        {this.state.toSolve === 0 ? (
          <SelectionScreen
            level={this.state.level}
            handleChange={this.handleChange.bind(this)}
            startGame={this.startGame.bind(this)}
          />
        ) : (
          <Board
            boardGame={this.state.boardGame}
            changeCard={this.changeCard}
          />
        )}
      </Fragment>
    );
  }
}

export default App;
