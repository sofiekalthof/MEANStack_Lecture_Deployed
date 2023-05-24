var $hXvsm$express = require("express");
require("express-http-proxy");
var $hXvsm$cors = require("cors");
var $hXvsm$mongodb = require("mongodb");

var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire9763"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire9763"] = parcelRequire;
}
parcelRequire.register("3j3xW", function(module, exports) {




var $2685e5b20c9f29f6$require$MongoClient = $hXvsm$mongodb.MongoClient;

var $2685e5b20c9f29f6$require$ObjectId = $hXvsm$mongodb.ObjectId;
// import Password interface
// import { Password } from "./password";
// Create Express app
const app = $hXvsm$express();
// Add CORS to all routes and methods
app.use($hXvsm$cors());
// Enable parsing of JSON bodies
app.use($hXvsm$express.json());
// Initialize parameters
// const port = eval("process.env.PORT") || 3600;
const port = eval("process.env.PASSWORD") || 3600;
const dbName = "mean-passwordManager";
const collectionName = "passwords";
// database connection string
const dbUrl = "mongodb+srv://admin:xOuG5xzD7E4ZZCdF@mycluster.upxjjyn.mongodb.net/?retryWrites=true&w=majority";
let dbConnection;
// Define server routes
// List all passwords
// TODO: Task - Write whole GET Request
app.route("/passwords").get(async (req, res)=>{
    let passwords = [];
    passwords = await dbConnection.collection(collectionName).find().toArray();
    res.json(passwords);
});
// Get a password
app.route("/password-edit/:id").get(async (req, res)=>{
    const id = req.params.id;
    const result = await dbConnection.collection(collectionName).findOne({
        _id: new $2685e5b20c9f29f6$require$ObjectId(id)
    });
    if (!result) {
        res.status(404).json({
            error: "Could not find"
        });
        return;
    }
    res.json(result);
});
// Create a new password
app.route("/passwords-edit").post(async (req, res)=>{
    const doc = req.body;
    const result = await dbConnection.collection(collectionName).insertOne(doc);
    res.status(201).json({
        _id: result.insertedId
    });
});
// Update a password
app.route("/passwords-edit/:id").put(async (req, res)=>{
    const id = req.params.id;
    const doc = req.body;
    // make sure the id field is correct object type
    doc._id = new $2685e5b20c9f29f6$require$ObjectId(id);
    const result = await dbConnection.collection(collectionName).updateOne({
        _id: new $2685e5b20c9f29f6$require$ObjectId(id)
    }, {
        $set: doc
    });
    if (result.matchedCount == 0) {
        res.status(404).json({});
        return;
    }
    res.json({});
});
// Delete a person
app.route("/passwords/:id").delete(async (req, res)=>{
    const id = req.params.id;
    // TODO: Task - Write delete query only
    await dbConnection.collection(collectionName).deleteOne({
        _id: new $2685e5b20c9f29f6$require$ObjectId(id)
    });
    res.json({});
});
// Start server and listen for requests
app.listen(port, function() {
    console.log("Listening on " + port + ".");
});
// database connection
$2685e5b20c9f29f6$require$MongoClient.connect(dbUrl).then((client)=>{
    dbConnection = client.db(dbName);
}).catch((err)=>{
    console.log(err);
});

});


parcelRequire("3j3xW");

//# sourceMappingURL=index.js.map
