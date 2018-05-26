require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

module.exports = {

  init(app, express){
    app.set("views", viewsFolder);
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "..", "assets")));
    app.use(expressValidator());


    var allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', process.env.accessSite);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      let keys = Object.keys(req.body);
      if(keys.length > 0){
        let bodyJSON = new Object();
        let newBody = new Object();
        if(keys[0].includes("needJSONbreakup") && keys[0].includes("J$0nBr4k3") ){
          bodyJSON = JSON.parse(keys[0]);
          Object.keys(bodyJSON).forEach((key)=>{
            if(key==="needJSONbreakup"){
              return;
            }
            newBody[key]  = bodyJSON[key];
          })
          req.body = newBody;
        }
      }


      next();
    }
    app.use(allowCrossDomain);
  }


};
