
const sequelize = require("../../src/db/models/index").sequelize;
const GroceryList = require("../../src/db/models").GroceryList;
const Group = require("../../src/db/models").Group;
const GroupUser = require("../../src/db/models").GroupUser;
const User = require("../../src/db/models").User;
const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3001/group/";

describe("INTEGRATE : group", () => {

  beforeEach((done) => {
    this.groupUser;
    this.user;
    this.group;
    this.groceryList;
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
          GroupUser.create({
             userId : this.user.id,
             groupId : this.group.id
          })
          .then((data) => {
            this.groupUser = data;
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
          .catch((err) => {
            console.log(err);
            done();
          });
        })
        .catch((err)=>{
          console.log(err);
          done();
        })
      })
      .catch((err)=>{
        console.log(err);
        done();
      })

    });
  });




   describe("POST CREATE ", () => {


     it("should create a Group with post", (done) => {
         const options = {
           url: `${base}create`,
           form: {
             groupName: "sassy sandwichers"
           }
         };
         request.post(options, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain("sassy sandwichers");
               done();
          });
     });
     it("should fail to create a Group with no name", (done) => {
         const options = {
           url: `${base}create`,
           form: {

           }
         };
         request.post(options, (err, res, body) => {
              expect(body).toContain("cannot be null");
               done();
          });
     });

   });

   describe("POST READ ", () => {


     it("should READ a Group with post", (done) => {
         const options = {
           url: `${base}${this.group.id}`
         };
         request.post(options, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain(this.group.groupName);
               expect(body).toContain(this.group.id);
               expect(body).toContain(this.user.name);
               expect(body).toContain(this.groceryList.name);
               done();
          });
     });


   });

   describe("POST UPDATE ", () => {


     it("should UPDATE a Group with post", (done) => {
         const options = {
           url: `${base}update/${this.group.id}`,
           form: {
             groupName: "sassier sandwichers"
           }
         };
         request.post(options, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain("sassier sandwichers");
               done();
          });
     });


   });
   describe("POST DELETE ", () => {


     it("should DELETE a Group with post", (done) => {
         const options = {
           url: `${base}delete/${this.group.id}`,
         };
         request.post(options, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain(true);
               done();
          });
     });

     it("should not DELETE a Group that doesnt exist, sassy", (done) => {
         const options = {
           url: `${base}update/${this.group.id+2}`,
         };
         request.post(options, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain("group not found");
               done();
          });
     });


   });









});
