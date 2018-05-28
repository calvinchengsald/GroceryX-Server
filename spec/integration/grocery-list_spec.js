const sequelize = require("../../src/db/models/index").sequelize;
const GroceryList = require("../../src/db/models").GroceryList;
const Group = require("../../src/db/models").Group;
const User = require("../../src/db/models").User;
const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3001/groceryList/";

describe("INTEGRATE : groceryList", () => {

  beforeEach((done) => {
      this.groceryList;
      this.user;
      this.group;
      sequelize.sync({force: true}).then((res) => {
        User.create({
          name: "Calvin",
          password: "pass",
          username: "calvinvon"
        })
        .then((user)=>{
          this.user = user;
          Group.create({
            groupName: "Family"
          })
          .then((group)=>{
            this.group = group;
            GroceryList.create({
               name : "walmart time",
               date: new Date(),
               groupId: this.group.id,
               ownerId: this.user.id,
               private: true

            })
            .then((data) => {
              this.groceryList = data;
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          })
          .catch((err)=>{
            console.log(err);
            console.log("ERRRRRROR WITH BEFORE EACH2");
            done();
          })
        })
        .catch((err)=>{
          console.log(err);
          console.log("ERRRRRROR WITH BEFORE EACH3");
          done();
        })

      });
  });


   describe("POST CREATE ", () => {
     beforeEach((done) => {
         this.group2;
         Group.create({
           groupName: "Calvin2"
         })
         .then((group)=>{
           this.group2 = group;
           done();
         })
         .catch((err)=>{
           console.log(err);
           done();
         })
     });

     it("should create a GroceryList with post", (done) => {
         const options = {
           url: `${base}create`,
           form: {
             name: "Target milk run",
             date: new Date(),
             groupId : this.group.id,
             ownerId : this.user.id,
             private : false
           }
         };
         request.post(options, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain("Target milk run");
               expect(body).toContain(false);
               done();
          });
     });
     it("should fail to create a GroceryList with no name", (done) => {
         const options = {
           url: `${base}create`,
           form: {
             date: new Date(),
             groupId : this.group.id,
             ownerId : this.user.id,
             private : false
           }
         };
         request.post(options, (err, res, body) => {
              expect(body).toContain("false");
               done();
          });
     });

   });

   describe("POST READ ", () => {


     it("should READ a GroceryList with post", (done) => {
         const options = {
           url: `${base}${this.groceryList.id}`
         };
         request.post(options, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain(this.groceryList.name);
               expect(body).toContain(this.groceryList.private);
               expect(body).toContain(this.group.groupName);
               expect(body).toContain(this.user.name);
               done();
          });
     });


   });

   describe("POST UPDATE ", () => {


     it("should UPDATE a GroceryList with post", (done) => {
         const options = {
           url: `${base}update/${this.groceryList.id}`,
           form: {
             name: "Target and then Pet Stop",
             date: new Date(),
             groupId : this.group.id,
             ownerId : this.user.id,
             private : false
           }
         };
         request.post(options, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain("Target and then Pet Stop");
               expect(body).toContain(false);
               done();
          });
     });


   });
   describe("POST DELETE ", () => {


     it("should DELETE a GroceryList with post", (done) => {
         const options = {
           url: `${base}delete/${this.groceryList.id}`,
         };
         request.post(options, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain(true);
               done();
          });
     });

     it("should not DELETE a GroceryList that doesnt exist", (done) => {
         const options = {
           url: `${base}update/${this.groceryList.id+2}`,
         };
         request.post(options, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain("list not found");
               done();
          });
     });


   });









});
