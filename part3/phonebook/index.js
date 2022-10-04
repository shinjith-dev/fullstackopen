const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
require("dotenv").config();
const Person = require("./mongo");
const PORT = process.env.PORT;

app.use(express.static("build"));

app.use(express.json());

app.use(function (req, res, next) {
  req.start = new Date(Date.now());
  next();
});

app.use(cors());

morgan.token("jsonbody", (req, res) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.jsonbody(req, res),
    ].join(" ");
  })
);

app.get("/info", (req, res) => {
  res.set("content-type", "text/html");
  res.send(
    `<p>Phonebook has info of ${persons.length} people</p><p>${req.start}</p>`
  );
});

var people;

app.get("/api/persons", (req, res) => {
  Person.find({}).then((val) => {
    res.json(val);
    people = val;
  });
});

app.get("/api/persons/:id", (req, res) => {
  const person = persons.find((person) => person.id === Number(req.params.id));
  person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

// const generateId = () => {
//   let randomId = 0;
//   do {
//     randomId = Math.floor(Math.random() * 1000);
//   } while (persons.find((person) => person.id === randomId) !== undefined);
//   return randomId;
// };

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: "name is missing",
    });
  } else if (!body.number) {
    return res.status(400).json({
      error: "number is missing",
    });
  }

  if (persons.filter((person) => person.name === body.name).length !== 0)
    return res.status(400).json({
      error: "name must be unique",
    });

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  res.json(person);
});

app.listen(PORT, () => console.log(`sever started on port ${PORT}`));

module.exports = app;