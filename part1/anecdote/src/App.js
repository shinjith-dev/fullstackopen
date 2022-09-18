import { useState } from "react";

function App() {
  const anecdotes = [
    "The best way to get a project done faster is to start sooner",
    "Every good work of software starts by scratching a developer's personal itch",
    "Perfection (in design) is achieved not when there is nothing more to add, but rather when there is nothing more to take away",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand",
    "Documentation is the castor oil of programming. Managers think it is good for programmers and programmers hate it!",
    "Programming can be fun, so can cryptography; however they should not be combined.",
    "It's OK to figure out murder mysteries, but you shouldn't need to figure out code. You should be able to read it.",
    "It's better to wait for a productive programmer to become available than it is to wait for the first available programmer to become productive.",
    "Design and programming are human activities; forget that and all is lost.",
    "Real programmers can write assembly code in any language.",
    "The price of reliability is the pursuit of the utmost simplicity. It is a price which the very rich may find hard to pay.",
  ];

  const [votes, setVotes] = useState(Array(11).fill(0));

  const [selected, setSelected] = useState(0);

  const handleNextClick = () =>
    setSelected([Math.floor(Math.random() * anecdotes.length)]);

  const handleVoteClick = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const mostVoted = () => votes.indexOf(Math.max.apply(null, votes));

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleNextClick}>next ancedote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVoted()]}</p>
    </>
  );
}

export default App;
