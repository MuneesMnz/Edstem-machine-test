import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import HomePage from "./pages/Home/Home";
import QuizPage from "./pages/Quiz/Quiz";
import ResultPage from "./pages/Result";

function App() {
  //states
  const [pages, setPages] = useState("Home");
  const [category, setCategory] = useState("");
  const [result, setResult] = useState(0);
  console.log("tesult", result);

  const pageslist = {
    home: "Home",
    qustions: "Qustions",
    result: "Result",
  };

  // const Home = "Home";
  // const Qustions = ;
  // const Result = ;

  switch (pages) {
    case pageslist.home:
      return (
        <HomePage
          setCategory={setCategory}
          category={category}
          setPages={setPages}
        />
      );

    case pageslist.qustions:
      return (
        <QuizPage
          category={category}
          setPages={setPages}
          setResult={setResult}
        />
      );

    case pageslist.result:
      return <ResultPage setPages={setPages} result={result} />;

    default:
      <div>Home</div>;
  }
}

export default App;
