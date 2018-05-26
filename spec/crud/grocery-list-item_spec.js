const sequelize = require("../../src/db/models/index").sequelize;
const GroceryListItem = require("../../src/db/models").GroceryListItem;
const GroceryList = require("../../src/db/models").GroceryList;
const Group = require("../../src/db/models").Group;
const User = require("../../src/db/models").User;
const request = require("request");
const server = require("../../src/server");

describe("CRUD : groceryListItem", () => {

  beforeEach((done) => {
      this.groceryListItem;
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
              GroceryListItem.create({
                name: "orange",
                groceryListId: this.groceryList.id,
                userId: this.user.id,
                budget: 10,
                purchased: true,
                priority: 5
              })
              .then((data) => {
                this.groceryListItem = data;
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


   describe("CREATE ", () => {

     it("should create a GroceryListItem family", (done) => {
       GroceryListItem.create({
         name: "apple",
         groceryListId: this.groceryList.id,
         userId: this.user.id,
         budget: 7,
         purchased: false,
         priority: 1
       })
       .then((data) => {
         expect(data.name).toBe("apple");
         expect(data.groceryListId).toBe(this.groceryList.id);
         expect(data.userId).toBe(this.user.id);
         expect(data.budget).toBe(7);
         expect(data.purchased).toBe(false);
         expect(data.priority).toBe(1);
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });
     it("should not create a GroceryListItem with no name", (done) => {
       GroceryListItem.create({
         groceryListId: this.groceryList.id,
         userId: this.user.id,
         budget: 7,
         purchased: false,
         priority: 1
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
     it("should read groceryListItem orange", (done) => {
       GroceryListItem.findById(this.groceryListItem.id)
       .then((data) => {
         expect(data.name).toBe(this.groceryListItem.name);
         expect(data.userId).toBe(this.groceryListItem.userId);
         expect(data.budget).toBe(this.groceryListItem.budget);
         expect(data.purchased).toBe(this.groceryListItem.purchased);
         expect(data.priority).toBe(this.groceryListItem.priority);
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });

   });

   describe("UPDATE ", () => {
     it("should update a GroceryListItem Family to Family2", (done) => {
       let newGroceryListItem = {
         name: "mandarin"
       }
       GroceryListItem.findById(this.groceryListItem.id)
       .then((data) => {
           if(!data){
             console.log("GroceryListItem not found");
             expect("GroceryListItem not found").toBe("GroceryListItem found");
             done();
           }
           data.update(newGroceryListItem, {
             fields: Object.keys(newGroceryListItem)
           })
           .then((updatedData) => {
             expect(updatedData.name).toBe(newGroceryListItem.name);
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
       let id = this.groceryListItem.id;
       GroceryListItem.destroy({
         where: {id}
       })
       .then((data) => {
         GroceryListItem.all()
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
