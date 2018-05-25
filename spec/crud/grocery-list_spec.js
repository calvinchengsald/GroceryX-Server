const sequelize = require("../../src/db/models/index").sequelize;
const GroceryList = require("../../src/db/models").GroceryList;
const Group = require("../../src/db/models").Group;
const User = require("../../src/db/models").User;
const request = require("request");
const server = require("../../src/server");

describe("CRUD : groceryList", () => {

  beforeEach((done) => {
      this.groceryList;
      this.user;
      this.group;
      sequelize.sync({force: true}).then((res) => {
        User.create({
          name: "Calvin",
          password: "pass"
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

     it("should create a GroceryList target", (done) => {
       GroceryList.create({
          name : "target",
          date: new Date(),
          groupId: this.group2.id,
          ownerId: this.user.id,
          private: false
       })
       .then((data) => {
         expect(data.name).toBe("target");
         expect(data.ownerId).toBe(this.user.id);
         expect(data.groupId).toBe(this.group2.id);
         expect(data.private).toBe(false);
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });
     it("should not create a GroceryList with no name", (done) => {
       GroceryList.create({
         date: new Date(),
         groupId: this.group2.id,
         ownerId: this.user.id,
         private: false
       })
       .then((data) => {
         expect(data.name).toBe("Should not ever reach here zzzzz");
         done();
       })
       .catch((err) => {
         expect(err.message).toContain("cannot be null");
         done();
       });
     });
   });

   describe("READ ", () => {
     it("should read groceryList Walmart", (done) => {
       GroceryList.findById(this.groceryList.id)
       .then((data) => {
         expect(data.name).toBe(this.groceryList.name);
         expect(data.ownerId).toBe(this.groceryList.ownerId);
         expect(data.groupId).toBe(this.groceryList.groupId);
         expect(data.private).toBe(this.groceryList.private);
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });

   });

   describe("UPDATE ", () => {
     it("should update a GroceryList Family to Family2", (done) => {
       let newGroceryList = {
         name: "Family2",
         date: new Date()
       }
       GroceryList.findById(this.groceryList.id)
       .then((data) => {
           if(!data){
             console.log("GroceryList not found");
             expect("GroceryList not found").toBe("GroceryList found");
             done();
           }
           data.update(newGroceryList, {
             fields: Object.keys(newGroceryList)
           })
           .then((updatedData) => {
             expect(updatedData.name).toBe(newGroceryList.name);
             expect(updatedData.date).toBe(newGroceryList.date);
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
     it("should delete only list walmart", (done) => {
       let id = this.groceryList.id;
       GroceryList.destroy({
         where: {id}
       })
       .then((data) => {
         GroceryList.all()
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
