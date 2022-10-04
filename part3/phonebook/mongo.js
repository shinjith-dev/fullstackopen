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
