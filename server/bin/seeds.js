require("../configs/mongoose");
const User = require("../models/User");

let users = [
  {
    name: "Marta",
    birthdate: "1991-07-04T00:00:00.000+0000"
  },
  {
    name: "Andrea",
    birthdate: "1999-01-07T00:00:00.000+0000"
  },
  {
    name: "Paloma",
    birthdate: "1992-06-03T00:00:00.000+0000"
  },
  {
    name: "Elisa",
    birthdate: "1992-03-29T00:00:00.000+0000"
  },
  {
    name: "Juan",
    birthdate: "1987-05-08T00:00:00.000+0000"
  },
  {
    name: "Javi",
    birthdate: "1997-09-28T00:00:00.000+0000"
  }
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created sucessfully with the following id:`);
  console.log(usersCreated.map(u => u._id))
})
.catch(err => {
  mongoose.disconnect()
  throw err
})