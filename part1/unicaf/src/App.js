import { useState } from "react";

const Button = ({ text, handler }) => {
  return <button onClick={handler}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const allFeedback = () => good + neutral + bad;
  const average = () => (good * 1 + bad * -1) / allFeedback() || 0;
  const positive = () => (good / allFeedback()) * 100 || 0;
  if (good === 0 && neutral === 0 && bad === 0) return <p>No feedback given</p>;
  else
    return (
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={allFeedback()} />
          <StatisticsLine text="average" value={average()} />
          <StatisticsLine text="positive" value={positive()} />
        </tbody>
      </table>
    );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handler={handleGoodClick} />
      <Button text="neutral" handler={handleNeutralClick} />
      <Button text="bad" handler={handleBadClick} /> <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
