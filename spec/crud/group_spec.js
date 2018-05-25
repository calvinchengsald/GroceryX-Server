const sequelize = require("../../src/db/models/index").sequelize;
const Group = require("../../src/db/models").Group;
const request = require("request");
const server = require("../../src/server");

describe("CRUD : group", () => {

  beforeEach((done) => {
      this.group;
      sequelize.sync({force: true}).then((res) => {
        Group.create({
           groupName : "Family"
        })
        .then((data) => {
          this.group = data;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
  });


   describe("CREATE ", () => {
     it("should create a Group family", (done) => {
       Group.create({
         groupName: "Family"
       })
       .then((data) => {
         expect(data.groupName).toBe(this.group.groupName);
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });
     it("should not create a Group with no name", (done) => {
       Group.create({
         name: ""
       })
       .then((data) => {
         expect(data.groupName).toBe("Should not ever reach here zzzzz");
         done();
       })
       .catch((err) => {
         expect(err.message).toContain("cannot be null");
         done();
       });
     });
   });

   describe("READ ", () => {
     it("should read group Family", (done) => {
       Group.findById(this.group.id)
       .then((data) => {
         expect(data.name).toBe(this.group.name);
         expect(data.password).toBe(this.group.password);
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });

   });

   describe("UPDATE ", () => {
     it("should update a Group Family to Family2", (done) => {
       let newGroup = {
         groupName: "Family2"
       }
       Group.findById(this.group.id)
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
             expect(updatedData.groupName).toBe(newGroup.groupName);
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
       let id = this.group.id;
       Group.destroy({
         where: {id}
       })
       .then((data) => {
         Group.all()
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
