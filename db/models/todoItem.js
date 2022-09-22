'use strict';

module.exports = (sequelize, DataTypes) => {
    var TodoItem = sequelize.define('TodoItem', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        list_id: DataTypes.INTEGER,
        name: DataTypes.STRING(256),
        details: DataTypes.STRING(2048),

    }, {
        underscored: true,
        tableName: 'todo_item',
        timestamps: false
    });

    TodoItem.associate = function (models) {
        // associations can be defined here
        TodoItem.belongsTo(models.TodoList, {
            foreignKey: 'list_id',
            target: 'id'
        });
    };

    return TodoItem;
};