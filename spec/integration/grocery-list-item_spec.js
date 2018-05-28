const sequelize = require("../../src/db/models/index").sequelize;
const GroceryList = require("../../src/db/models").GroceryList;
const Group = require("../../src/db/models").Group;
const User = require("../../src/db/models").User;
const GroceryListItem = require("../../src/db/models").GroceryListItem;
const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3001/groceryListItem/";

describe("INTEGRATE : groceryListItem", () => {

  beforeEach((done) => {
      this.groceryList;
      this.user;
      this.group;
      this.groceryListItem;
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
              GroceryListItem.create({
                name: "orange",
                groceryListId: this.groceryList.id,
                userId: this.user.id,
                budget: 10,
                purchased: true,
                priority: 5
              })
              .then((item) => {
                this.groceryListItem = item;
                done();
              })
              .catch((err) => {
                console.log(err);
                done();
              });
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

     it("should create a GroceryListItem with post", (done) => {
         const options = {
           url: `${base}create`,
           form: {
             name: "banana",
             groceryListId: this.groceryList.id,
             userId: this.user.id,
             budget: 11,
             purchased: false,
             priority: 4
           }
         };
         request.post(options, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain("banana");
               expect(body).toContain(this.groceryList.id);
               expect(body).toContain(this.user.id);
               expect(body).toContain(11);
               expect(body).toContain(false);
               expect(body).toContain(4);
               done();
          });
     });
     it("should fail to create a GroceryListItem with no name", (done) => {
         const options = {
           url: `${base}create`,
           form: {
             groceryListId: this.groceryList.id,
             userId: this.user.id,
             budget: 11,
             purchased: false,
             priority: 4
           }
         };
         request.post(options, (err, res, body) => {
              expect(body).toContain("false");
               done();
          });
     });

   });

   describe("POST READ ", () => {


     it("should READ a GroceryListItem with post", (done) => {
         const options = {
           url: `${base}${this.groceryListItem.id}`
         };
         request.post(options, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain(this.groceryListItem.name);
               expect(body).toContain(this.groceryListItem.budget);
               expect(body).toContain(this.groceryListItem.purchased);
               expect(body).toContain(this.groceryListItem.priority);
               expect(body).toContain(this.groceryList.name);
               expect(body).toContain(this.user.name);
               expect(body).toContain(this.group.groupName);
               done();
          });
     });


   });

   describe("POST UPDATE ", () => {


     it("should UPDATE a GroceryListItem with post", (done) => {
         const options = {
           url: `${base}update/${this.groceryListItem.id}`,
           form: {
             name: "mega bananas",
             groceryListId: this.groceryList.id,
             userId: this.user.id,
             budget: 100,
             purchased: true,
             priority: 10
           }
         };
         request.post(options, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain("mega bananas");
               expect(body).toContain(this.groceryList.id);
               expect(body).toContain(this.user.id);
               expect(body).toContain(100);
               expect(body).toContain(true);
               expect(body).toContain(10);
               done();
          });
     });


   });
   describe("POST DELETE ", () => {


     it("should DELETE a GroceryListItem with post", (done) => {
         const options = {
           url: `${base}delete/${this.groceryListItem.id}`,
         };
         request.post(options, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain(true);
               done();
          });
     });

     it("should not DELETE a GroceryListItem that doesnt exist", (done) => {
         const options = {
           url: `${base}update/${this.groceryListItem.id+2}`,
         };
         request.post(options, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain("item not found");
               done();
          });
     });


   });









});
