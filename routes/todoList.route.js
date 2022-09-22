const todoListController = require("../controllers/todoList.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers"
    );
    next();
  });

  app.get("/api/todoList", todoListController.getTodoListItems);
  app.post("/api/todoList", todoListController.postTodoList);

};
