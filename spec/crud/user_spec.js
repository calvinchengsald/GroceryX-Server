const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const request = require("request");
const server = require("../../src/server");

describe("CRUD : user", () => {

  beforeEach((done) => {
      this.user;
      sequelize.sync({force: true}).then((res) => {
        User.create({
           name : "Calvin",
           password: "password",
           username: "calvinvon"
        })
        .then((user) => {
          this.user = user;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
  });


   describe("CREATE ", () => {
     it("should create a User Joe Shmoe", (done) => {
       User.create({
         name: "Joe Shmoe",
         password: "secure",
         username: "calvinvon"
       })
       .then((user) => {
         expect(user.name).toBe("Joe Shmoe");
         expect(user.password).toBe("secure");
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });
     it("should not create a User Joe Shmoe with no password", (done) => {
       User.create({
         name: "Joe Shmoe",
         password: "",
         username: "calvinvon"
       })
       .then((user) => {
         expect(user.name).toBe("Should not ever reach here zzzzz");
         done();
       })
       .catch((err) => {
         expect(err.message).toContain("Cannot be null");
         done();
       });
     });
   });

   describe("READ ", () => {
     it("should read user Calvin", (done) => {
       User.findById(this.user.id)
       .then((user) => {
         expect(user.name).toBe(this.user.name);
         expect(user.password).toBe(this.user.password);
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });

   });

   describe("UPDATE ", () => {
     it("should update a User Calvin to Calvinanvin", (done) => {
       let newUser = {
         name: "Calvinanvin"
       }
       User.findById(this.user.id)
       .then((user) => {
           if(!user){
             console.log("User not found");
             expect("User not found").toBe("User found");
             done();
           }
           user.update(newUser, {
             fields: Object.keys(newUser)
           })
           .then((updatedUser) => {
             expect(updatedUser.name).toBe(newUser.name);
             expect(updatedUser.password).toBe(this.user.password);
             done();
           })
           .catch((err) => {
             console.log(err);
             done();
           });
       });
     });
     it("should update a User Calvin to Calvinanvin with new password", (done) => {
       let newUser = {
         name: "Calvinanvin",
         password: "new password"
       }
       User.findById(this.user.id)
       .then((user) => {
           if(!user){
             console.log("User not found");
             expect("User not found").toBe("User found");
             done();
           }
           user.update(newUser, {
             fields: Object.keys(newUser)
           })
           .then((updatedUser) => {
             expect(updatedUser.name).toBe(newUser.name);
             expect(updatedUser.password).toBe(newUser.password);
             done();
           })
           .catch((err) => {
             console.log(err);
             done();
           });
       });
     });


   });
   describe("DELETE ", () => {
     it("should delete only user Calvin", (done) => {
       let id = this.user.id;
       User.destroy({
         where: {id}
       })
       .then((user) => {
         User.all()
         .then((users)=>{
           expect(users.length).toBe(0);
           done();
         })
         .catch((err)=>{
           console.log(err);
           done();
         });

       })
       .catch((err) => {
         console.log(err);
         done();
       });

     });

   });








});
