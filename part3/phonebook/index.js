const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/person");
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

var people = [];

app.get("/info", (req, res) => {
  res.set("content-type", "text/html");
  res.send(
    `<p>Phonebook has info of ${people.length} people</p><p>${req.start}</p>`
  );
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((val) => {
    res.json(val);
    people = val;
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => res.json(person))
    .catch((err) => res.status(404).end());
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndDelete(req.params.id).then((deleted) =>
    res.status(204).end()
  );
});

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

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((addedPesron) => res.json(addedPesron));
});

app.listen(PORT, () => console.log(`sever started on port ${PORT}`));

module.exports = app;
