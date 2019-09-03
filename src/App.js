import React, { Fragment, Component } from "react";
import { Images } from "./config/data";
import Row from "./Row";

class App extends Component {
  state = {
    boardGame: [],
    solved: false,
    movs: []
  };

  componentDidMount() {
    let board = [];

    const n = 8;
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

    this.setState({ boardGame: board });
  }

  changeCard = (rowNumber, colNumber) => {
    let boardGame = this.state.boardGame;
    boardGame[rowNumber][colNumber].show = !this.state.boardGame[rowNumber][
      colNumber
    ].show;

    this.setState({
      boardGame: boardGame,
      movs: this.state.movs.concat([{ row: rowNumber, col: colNumber }])
    });

    setInterval(() => {
      if (this.state.movs.length === 2) this.checkIsCorrect();
    }, 10);
  };

  checkIsCorrect = () => {
    let mov1 = this.state.movs[0];
    let mov2 = this.state.movs[1];
    let boardGame = this.state.boardGame;
    let id1 = boardGame[mov1.row][mov1.col].id;
    let id2 = boardGame[mov2.row][mov2.col].id;

    if (id1 === id2) {
      console.log("iguales");
      boardGame[mov1.row][mov1.col].solved = true;
      boardGame[mov2.row][mov2.col].solved = true;
      boardGame[mov1.row][mov1.col].show = true;
      boardGame[mov2.row][mov2.col].show = true;
      this.setState({ boardGame: boardGame, movs: [] });
    } else {
      console.log("distintos");
      boardGame[mov1.row][mov1.col].show = false;
      boardGame[mov2.row][mov2.col].show = false;
      setInterval(() => {
        this.setState({ boardGame: boardGame, movs: [] });
      }, 1000);
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
