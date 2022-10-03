const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an arguement: node mongoose.js <password>"
  );
  process.exit(1);
}

const passwd = process.argv[2];

const uri = `mongodb+srv://whitewolf:${passwd}@cluster1.qhhmprl.mongodb.net/?retryWrites=true&w=majority`;

if (process.argv.length > 3) {
  const name = process.argv[3],
    number = process.argv[4] ?? "";
  mongoose
    .connect(uri)
    .then((result) => {
      const person = new Person({
        name: name,
        number: number,
      });
      person.save().then((result) => {
        console.log(`added ${name} number:${number} to phonebook`);
        mongoose.connection.close();
      });
    })
    .catch((err) => console.log(err));
} else {
  mongoose
    .connect(uri)
    .then((result) => {
      console.log("phonebook");
      Person.find({}).then((result) => {
        result.forEach((note) => {
          console.log(`${note.name}: ${note.number}`);
        });
        mongoose.connection.close();
      });
    })
    .catch((err) => console.log(err));
}
