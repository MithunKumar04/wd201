"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      await this.overdue();
      console.log("\n");

      console.log("Due Today");
      await this.dueToday();
      console.log("\n");

      console.log("Due Later");
      await this.dueLater();
    }

    static async overdue() {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todos = await Todo.findAll({
          where: {
            dueDate: { [Op.lt]: today },
          },
        });
        const todoList = todos
          .map((todo) => todo.displayableString())
          .join("\n");
        console.log(todoList);
      } catch (error) {
        console.error(error);
      }
    }

    static async dueToday() {
      try {
        const todos = await Todo.findAll({
          where: {
            dueDate: new Date(),
          },
        });
        const todoList = todos
          .map((todo) => todo.displayableString())
          .join("\n");
        console.log(todoList);
      } catch (error) {
        console.error(error);
      }
    }

    static async dueLater() {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todos = await Todo.findAll({
          where: {
            dueDate: { [Op.gt]: today },
          },
        });
        const todoList = todos
          .map((todo) => todo.displayableString())
          .join("\n");
        console.log(todoList);
      } catch (error) {
        console.error(error);
      }
    }

    static async markAsComplete(id) {
      try {
        await Todo.update(
          { completed: true },
          {
            where: {
              id: id,
            },
          },
        );
      } catch (error) {
        console.error(error);
      }
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};
