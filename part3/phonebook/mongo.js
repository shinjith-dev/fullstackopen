const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// if (process.argv.length > 3) {
//   const name = process.argv[3],
//     number = process.argv[4] ?? "";
//   mongoose
//     .connect(uri)
//     .then((result) => {
//       const person = new Person({
//         name: name,
//         number: number,
//       });
//       person.save().then((result) => {
//         console.log(`added ${name} number:${number} to phonebook`);
//         mongoose.connection.close();
//       });
//     })
//     .catch((err) => console.log(err));
// } else {
//   mongoose
//     .connect(uri)
//     .then((result) => {
//       console.log("phonebook");
//       Person.find({}).then((result) => {
//         result.forEach((note) => {
//           console.log(`${note.name}: ${note.number}`);
//         });
//         mongoose.connection.close();
//       });
//     })
//     .catch((err) => console.log(err));
// }

module.exports = mongoose.model("Person", personSchema);
