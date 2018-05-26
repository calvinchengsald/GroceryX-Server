const sequelize = require("../../src/db/models/index").sequelize;
const GroupUser = require("../../src/db/models").GroupUser;
const User = require("../../src/db/models").User;
const Group = require("../../src/db/models").Group;
const request = require("request");
const server = require("../../src/server");

describe("CRUD : group", () => {

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
              console.log("ERRRRRROR WITH BEFORE EACH");
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



   describe("CREATE ", () => {
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
     it("should create a groupuser", (done) => {
       GroupUser.create({
          userId : 1,
          groupId : this.group2.id
       })
       .then((data) => {
         expect(data.userId).toBe(1);
         expect(data.groupId).toBe(this.group2.id);
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });
     it("should not create a usergorup with no groupId", (done) => {
       GroupUser.create({
          userId : 1,
          username: "calvinvon"
       })
       .then((data) => {
         expect(data.userId).toBe("Should not ever reach here zzzzz");
         done();
       })
       .catch((err) => {
         expect(err.message).toContain("cannot be null");
         done();
       });
     });
   });

   describe("READ ", () => {
     it("should read usergroup", (done) => {
       GroupUser.findById(this.groupUser.id)
       .then((data) => {
         expect(data.groupId).toBe(this.groupUser.groupId);
         expect(data.userId).toBe(this.groupUser.userId);
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });

   });

   describe("UPDATE ", () => {
     beforeEach((done) => {
         this.user2;
         User.create({
           name: "Calvin2",
           password: "password",
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
     it("should update a usergroup to id 3", (done) => {
       let newGroup = {
         userId: this.user2.id,
         groupId: this.group.id
       }
       GroupUser.findById(this.groupUser.id)
       .then((data) => {
           if(!data){
             console.log("Group not found");
             expect("Group not found").toBe("Group found");
             done();
           }
           data.update(newGroup, {
             fields: Object.keys(newGroup)
           })
           .then((updatedData) => {
             expect(updatedData.groupId).toBe(newGroup.groupId);
             expect(updatedData.userId).toBe(newGroup.userId);
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
     it("should delete only groupuser", (done) => {
       let id = this.groupUser.id;
       GroupUser.destroy({
         where: {id}
       })
       .then((data) => {
         GroupUser.all()
         .then((datas)=>{
           expect(datas.length).toBe(0);
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
