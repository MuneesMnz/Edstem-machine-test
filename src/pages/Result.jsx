import React from "react";
import Button from "../component/Button";

const ResultPage = ({ result, setPages }) => {
  const HandlePlayAgain = () => {
    setPages("Home");
  };
  return (
    <div className="homeContainer">
      <div style={{marginBottom:"30px"}}>result {result} </div>
      <Button handleClick={HandlePlayAgain}> Play Again</Button>
    </div>
  );
};

export default ResultPage;
