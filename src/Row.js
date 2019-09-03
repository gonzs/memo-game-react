import React from "react";
import back from "./images/back.jpg";
import "./App.css";

const Row = ({ value, rowNumber, changeCard }) => {
  return (
    <tr>
      {value.map((elem, index) => {
        return (
          <td key={index}>
            {elem.show ? (
              <img
                src={elem.src}
                alt={index}
                className="fixed_img"
                onClick={changeCard.bind(this, rowNumber, index)}
                disabled={true}
              ></img>
            ) : (
              <img
                src={back}
                alt={index}
                className="fixed_img"
                onClick={changeCard.bind(this, rowNumber, index)}
              ></img>
            )}
          </td>
        );
      })}
    </tr>
  );
};
export default Row;
