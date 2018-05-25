// const sequelize = require("../../src/db/models/index").sequelize;
// const Topic = require("../../src/db/models").User;
// const request = require("request");
// const server = require("../../src/server");
// const base = "http://localhost:3001/topics/";
//
// describe("routes : user", () => {
//
//   beforeEach((done) => {
//       this.topic;
//       sequelize.sync({force: true}).then((res) => {
//
//        User.create({
//          name : "Calvin"
//        })
//         .then((user) => {
//           this.user = user;
//           done();
//         })
//         .catch((err) => {
//           console.log(err);
//           done();
//         });
//
//       });
//
//     });
//
//     describe("READ /user", () => {
//       it("should return a status code 200 and all users", (done) => {
//         request.get(base, (err, res, body) => {
//           expect(res.statusCode).toBe(200);
//           expect(err).toBeNull();
//           expect(body).toContain("Calvin");
//           done();
//         });
//       });
//     });
//     describe("READ /user/:id", () => {
//       it("should return a status code 200 and first user", (done) => {
//         request.get(`${base}${this.user.id}`, (err, res, body) => {
//           expect(res.statusCode).toBe(200);
//           expect(err).toBeNull();
//           expect(body).toContain(this.user.name);
//           expect(body).toContain(this.user.password);
//           done();
//         });
//       });
//     });
//
// });
