import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotifiacation] = useState(null);

  useEffect(() => {
    personServices.getAll().then((data) => setPersons(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1,
    };
    if (!persons.some((person) => person.name === newPerson.name)) {
      personServices.create(newPerson).then((data) => {
        setPersons(persons.concat(data));
        setNewName("");
        setNewNumber("");
        setNotifiacation({ value: `Added ${newPerson.name}`, type: "message" });
        window.setTimeout(() => {
          setNotifiacation(null);
        }, 5000);
      });
    } else {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace old number with new one?`
        )
      )
        personServices
          .update(
            persons.find((person) => person.name === newPerson.name).id,
            newPerson
          )
          .then((data) => {
            setPersons(
              persons.map((person) => (person.id !== data.id ? person : data))
            );
            setNewName("");
            setNewNumber("");
            setNotifiacation({
              value: `Updated ${newPerson.name}`,
              type: "message",
            });
            window.setTimeout(() => {
              setNotifiacation(null);
            }, 5000);
          });
      console.log(persons.find((person) => person.name === newPerson.name).id);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handlePersonDelete = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name} ?`
      )
    )
      personServices
        .remove(id)
        .then((data) => {
          setPersons(persons.filter((person) => person.id !== id));
          setNewName("");
          setNewNumber("");
          setNotifiacation({
            value: `removed ${persons.find((person) => person.id === id).name}`,
            type: "error",
          });
          window.setTimeout(() => {
            setNotifiacation(null);
          }, 5000);
        })
        .catch((e) => {
          setNotifiacation({
            value: `${
              persons.find((person) => person.id === id).name
            } has already been removed from server`,
            type: "error",
          });
          window.setTimeout(() => {
            setNotifiacation(null);
          }, 5000);
        });
  };

  var filtered = persons
    .slice()
    .filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filtered={filtered} handleDelete={handlePersonDelete} />
    </div>
  );
};

export default App;
