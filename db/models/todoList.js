'use strict';

module.exports = (sequelize, DataTypes) => {
  var TodoList = sequelize.define('TodoList', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING(256),
    description: DataTypes.STRING(2048),

  }, {
    underscored: true,
    tableName: 'todo_list',
    timestamps: false
  });

  TodoList.associate = function (models) {
    // associations can be defined here
    TodoList.hasMany(models.TodoItem, {
      foreignKey: 'list_id',
      targetKey: 'id'
    });
  };

  return TodoList;
};