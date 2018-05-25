module.exports = {
  init(app){

    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/user");
    const groupRoutes = require("../routes/group");
    const groupUserRoutes = require("../routes/groupUser");
    const groceryListRoutes = require("../routes/groceryList");
    const groceryListItemRoutes = require("../routes/groceryListItem");
    app.use(staticRoutes);
    app.use(groceryListRoutes);
    app.use(userRoutes);
    app.use(groupRoutes);
    app.use(groupUserRoutes);
    app.use(groceryListRoutes);
    app.use(groceryListItemRoutes);
  }
}
