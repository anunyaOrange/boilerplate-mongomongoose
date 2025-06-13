require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);
// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
// mongoose.connect(process.env.MONGO_URI, clientOptions);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log("Error connecting to the database:", err);
  }
  console.log("Database connection established" + process.env.MONGO_URI + " successfully");
});



const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({ name: "Jane Fonda", age: 28, favoriteFoods: ["eggs", "fish", "fresh fruit"] });

  person.save(function (err, data) {
    console.log("Person created and saved:", data);
    if (err) return console.error(err);
    done(null, data)
  });

  // Person.create({ name: "Jane Fonda", age: 28, favoriteFoods: ["eggs", "fish", "fresh fruit"] }, function (err, data) {
  //   console.log("Person created and saved:", data);
  //   if (err) return console.log(err);
  //   done(null, data);
  // });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    console.log("People created and saved:", data);
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    console.log("DATA:", data);
    if (err) return console.log(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: { "$in": [food] } }, function (err, data) {
    console.log("DATA:", data);
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    console.log("DATA:", data);
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, data) {
    console.log("DATA:", data);
    if (err) return console.log(err);
    data.favoriteFoods.push(foodToAdd);
    data.save(function (err, data) {
      if (err) return console.log(err);
      console.log("Updated person:", data);
      done(null, data);
    });
  });

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function (err, data) {
    console.log("DATA:", data);
    if (err) return console.log(err);
    done(null, data);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, data) {
    console.log("DATA:", data);
    if (err) return console.log(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, function (err, data) {
    console.log("DATA:", data);
    if (err) return console.log(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: { "$in": [foodToSearch] } })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec(function (err, data) {
      console.log("DATA:", data);
      if (err) return console.log(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
