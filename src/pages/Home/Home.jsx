import React from "react";
import "./home.css";
import Button from "../../component/Button";

const HomePage = ({ category, setCategory, setPages }) => {
  console.log(category);
  const handlePages = () => {
    setPages("Qustions");
  };
  return (
    <div className="homeContainer">
      <h1 className="homeHeading">Welcome To The Quiz</h1>
      <p className="homeContent">Please Select Category Below :-</p>
      <div className="categorySelect">
        <div
          onClick={() => setCategory("Science")}
          className={`categoryItem ${category === "Science" && "isSelected"}`}
        >
          Science (Computer)
        </div>
        <div
          onClick={() => setCategory("History")}
          className={`categoryItem ${category === "History" && "isSelected"}`}
        >
          History
        </div>
      </div>
      {category && <Button handleClick={handlePages}>Let's Start Quiz</Button>}
    </div>
  );
};

export default HomePage;
