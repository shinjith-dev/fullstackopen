const express = require("express");
const app = express();
const PORT = 3001;

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(function (req, res, next) {
  req.start = new Date(Date.now());
  next();
});

app.get("/api/info", (req, res) => {
  res.set("content-type", "text/html");
  res.send(
    `<p>Phonebook has info of ${persons.length} people</p><p>${req.start}</p>`
  );
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.listen(PORT, () => console.log(`sever started on port ${PORT}`));
