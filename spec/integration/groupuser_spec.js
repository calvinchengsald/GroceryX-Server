const sequelize = require("../../src/db/models/index").sequelize;
const Group = require("../../src/db/models").Group;
const GroupUser = require("../../src/db/models").GroupUser;
const User = require("../../src/db/models").User;
const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3001/groupuser/";

describe("INTEGRATE : groupuser", () => {

  beforeEach((done) => {
    this.groupUser;
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
          GroupUser.create({
             userId : this.user.id,
             groupId : this.group.id
          })
          .then((data) => {
            this.groupUser = data;
            done();
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


     it("should create a GroupUser ", (done) => {
         const options = {
           url: `${base}create`,
           form: {
             userId: this.user.id,
             groupId: this.group.id,
           }
         };
         request.post(options, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain(this.user.id);
               expect(body).toContain(this.group.id);
               done();
          });
     });
     it("should fail to create a GroupUser with no user id", (done) => {
         const options = {
           url: `${base}create`,
           form: {
             groupId: this.group.id
           }
         };
         request.post(options, (err, res, body) => {
              expect(body).toContain("false");
               done();
          });
     });

   });

   describe("POST READ ", () => {


     it("should READ a GroupUser with post", (done) => {
         const options = {
           url: `${base}${this.groupUser.id}`
         };
         request.post(options, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain(this.groupUser.groupId);
               expect(body).toContain(this.groupUser.userId);
               expect(body).toContain(this.user.name);
               expect(body).toContain(this.group.groupName);
               done();
          });
     });


   });

   describe("POST UPDATE ", () => {
     beforeEach((done) => {
         this.user2;
         User.create({
           name: "Anvin",
           password: "blarg",
           username: "calvinvon"

         })
         .then((user)=>{
           this.user2 = user;
           done();
         })
         .catch((err)=>{
           console.log(err);
           done();
         })
     });

     it("should UPDATE a GroupUser with post", (done) => {
         const options = {
           url: `${base}update/${this.groupUser.id}`,
           form: {
             userId: this.user2.id
           }
         };
         request.post(options, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain(this.groupUser.groupId);
               expect(body).toContain(this.user2.id);
               done();
          });
     });


   });
   describe("POST DELETE ", () => {


     it("should DELETE a GroupUser with post", (done) => {
         const options = {
           url: `${base}delete/${this.groupUser.id}`,
         };
         request.post(options, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain(true);
               done();
          });
     });

     it("should not DELETE a GroupUser that doesnt exist", (done) => {
         const options = {
           url: `${base}update/${this.groupUser.id+2}`,
         };
         request.post(options, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain("Group User not found");
               done();
          });
     });


   });









});
