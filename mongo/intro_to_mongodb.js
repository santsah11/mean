// Create a database called 'my_first_db'.
use my_first_db;

// Create students collection.
db.createCollection("students")

// Each document you insert into this collection should have the following format: ({name: STRING, home_state: STRING, lucky_number: NUMBER, birthday: {month: NUMBER, day: NUMBER, year: NUMBER}})
// Create 5 students with the appropriate info.
db.students.insert({ name: "Emily", home_state: "California", lucky_number: 8, birthday: { month: 12, day: 25, year: 1901 } })
db.students.insert({ name: "Sant", home_state: "California", lucky_number: 66, birthday: { month: 12, day: 15, year: 1981 } })
db.students.insert({ name: "Oscar", home_state: "California", lucky_number: 58, birthday: { month: 12, day: 25, year: 1989 } })
db.students.insert({ name: "Louis", home_state: "California", lucky_number: 68, birthday: { month: 12, day: 5, year: 1992 } })
db.students.insert({ name: "Money", home_state: "California", lucky_number: 98, birthday: { month: 2, day: 8, year: 1988 } })

// Get all students.
db.students.find().pretty()

// Retrieve all students who are from California (San Jose Dojo) or Washington (Seattle Dojo).
db.students.find({ home_state: "California" }).pretty()

// Get all students whose lucky number is:
// greater than 3
db.students.find({ lucky_number: { $gt: 3 } }).pretty()

// less than or equal to 10
db.students.find({ lucky_number: { $lte: 10 } }).pretty()

// between 1 and 9 (inclusive)
db.students.find({ lucky_number: { $gt: 0, $lt: 10 } }).pretty()

// Add a field to each student collection called 'interests' that is an ARRAY.  It should contain the following entries: 'coding', 'brunch', 'MongoDB'. Do this in ONE operation.
db.students.update({}, { $set: { interests: ['coding', 'brunch', 'MongoDB'] } }, { multi: true })

// Add some unique interests for each particular student into each of their interest arrays.
db.students.update({ _id: ObjectId("5be0dd038735c87dd4993131") }, { $push: { interests: 'jogging' } })

// Add the interest 'taxes' into someone's interest array.
db.students.update({ _id: ObjectId("5be0dd038735c87dd4993131") }, { $push: { interests: 'taxes' } })

// Remove the 'taxes' interest you just added.
db.students.update({ _id: ObjectId("5be0dd038735c87dd4993131") }, { $pull: { interests: "taxes" } })

// Remove all students who are from California (or Washington).
db.students.remove({ home_state: "California" })

// Remove a student by name. 
db.students.remove({ name: "Emily" })


// Remove a student whose lucky number is greater than 5 (JUST ONE)
db.students.deleteOne({ lucky_number: { $gt: 5 } })


// Add a field to each student collection called 'number_of_belts' and set it to 0.
db.students.update({}, { $set: { number_of_belts: 0 } }, { multi: true })

// Increment this field by 1 for all students in California (berkeley Dojo).
db.students.update({ home_state: "California" }, { $set: { number_of_belts: 1 } }, { multi: true })

// Rename the 'number_of_belts' field to 'belts_earned'
db.students.update({}, { $rename: { 'number_of_belts': 'belts_earned' } }, { multi: true })

// Remove the 'lucky_number' field.
db.students.update({}, { $unset: { lucky_number: "" } }, { multi: true })


// Add a 'updated_on' field, and set the value as the current date.
db.students.update({}, { $currentDate: { updated_on: { $type: "date" } } }, { multi: true })
