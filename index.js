const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors= require('cors')
const userRouter = require("./routes/api/user");
const loginRouer = require("./routes/api/login");
const truckRouter = require("./routes/api/trucks");
const loadRouter=require("./routes/api/loads");
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


mongoose.connect("mongodb+srv://nodehw3:nodehw13@cluster0-4xj1y.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
}).then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));
mongoose.set('useFindAndModify', false);


app.use(loginRouer);
app.use(userRouter);
app.use(truckRouter);

app.listen(8081, () => console.log("started"));








// const User = mongoose.model(
//   "User",
//   mongoose.Schema({ username: String, password: String })
// );

// app.get("/api/users", (req, res) => {
//   User.find({})
//     .then(users => res.json({ status: "ok", users }))
//     .catch(e => {
//       res.status(500).json({ status: e.message });
//     });
// });
// app.get("/api/users/:id", (req, res) => {
//   User.findById(req.params.id).then(users => res.json({ status: "ok", users }));
// });

// app.put("/api/users/:id", (req, res) => {
//   User.findByIdAndUpdate(req.params.id, {
//     username: req.body.username,
//     password: req.body.password
//   }).then(user => res.json({ status: "ok", user }));
// });

// app.delete("/api/users/:id", (req, res) => {
//   User.findByIdAndDelete(req.params.id).then(user =>
//     res.json({ status: "ok", user })
//   );
// });

// app.post("/api/users", (req, res) => {
//   console.log("get", req.body);
//   const user = new User({
//     username: req.body.username,
//     password: req.body.password
//   });
//   user
//     .save()
//     .then(() => {
//       res.json({
//         status: "new user ok"
//       });
//     })
//     .catch(e => {
//       res.status(500).json({ status: e.message });
//     });
// });

// app.post("/api/drivers", (req, res) => {
//   const driver = new Driver({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     isAssigned: false,
//     assignedTruck: ""
//   });
//   driver.save();
//   Driver.find({})
//     .then(drivers => res.json({ drivers }))

//     .catch(e => {
//       res.status(500).json({ status: e.message });
//     });
// });


//C:\Program Files\MongoDB\Server\4.0\bin
