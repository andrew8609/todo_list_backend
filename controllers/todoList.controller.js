const { Validator } = require('node-input-validator');
const TodoItem = require('../db/models').TodoItem;
const TodoList = require('../db/models').TodoList;

module.exports = {

    async getTodoListItems(req, res) {
        if (req.params.listName == undefined || req.params.listName == "") {
            res.status(422).json("list name should be provided.");
        }
        await TodoList
            .findOne({
                where: {
                    name: req.params.listName
                },
                include: [{
                    model: TodoItem,
                    attributes: ['name', 'details']
                }]
            })
            .then(todoListItems => {
                res.status(200).send(todoListItems);
            })
            .catch(error => {
                console.log(error);
            });
    },
    async postTodoList(req, res) {
        const v = new Validator(req.body, {
            name: 'required',
            description: 'required'
        });

        const matched = await v.check();

        if (!matched) {
            return res.status(422).json(v.errors);
        }
        await TodoList.create({
            name: req.body.name,
            description: req.body.description,
        });
        return res.status(200).json("successfully created new todo list.");
    }
}