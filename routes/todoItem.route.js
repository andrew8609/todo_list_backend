const todoItemController = require("../controllers/todoItem.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers"
        );
        next();
    });

    app.delete("/api/todoItem", todoItemController.deleteTodoItem);
    app.post("/api/todoItem", todoItemController.postTodoItem);

};
