const { Validator } = require('node-input-validator');
const TodoItem = require('../db/models').TodoItem;
const TodoList = require('../db/models').TodoList;

module.exports = {

    async postTodoItem(req, res) {
        const v = new Validator(req.body, {
            list_id: 'required',
            name: 'required',
            details: 'required'
        });

        const matched = await v.check();

        if (!matched) {
            return res.status(422).json(v.errors);
        }

        await TodoList.findOne({
            where: {
                id: req.body.list_id
            }
        })
            .then(async row => {
                if (!row) {
                    return res.status(400).send("this list id does not exist.");
                } else {
                    await TodoItem.create({
                        name: req.body.name,
                        details: req.body.details,
                        list_id: req.body.list_id,
                    });
                    return res.status(200).json("successfully added new todo item to the list.");
                }
            })
    },

    async deleteTodoItem(req, res) {

        var { todoListName, todoItemName } = req.query;

        await TodoList.findOne({
            where: {
                name: todoListName
            }
        })
            .then(todoList => {
                if (todoList != null) {
                    TodoItem.destroy({
                        where: {
                            list_id: todoList.id,
                            name: todoItemName
                        }
                    })
                        .then(() => {
                            res.status(200).send("Todo item successfully deleted.");
                        })
                        .catch(err => {
                            res.status(400).send("error in deleting todo item");
                        })
                }
            });
    }
}