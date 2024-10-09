const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const { where } = require("sequelize");
app.use(bodyParser.json());



app.set("view engine",'ejs')

app.get("/", async (request, response) =>{
  const allTodo=await Todo.getTodo();
  if(request.accepts("html"))
  {
    response.render("index",{allTodo})
  }
  else
  {
    request.json(allTodo)
  }
});

app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");
  // FILL IN YOUR CODE HERE

  // First, we have to query our PostgerSQL database using Sequelize to get list of all Todos.
  // Then, we have to respond with all Todos, like:
  // response.send(todos)
  try{
    const todo=await Todo.findAll();
    return response.json(todo);


  }
  catch(error)
  {
    console.error(error);
    return response.status(422).json(error);
  }
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    if (!todo) {
      return response.status(404).send({ error: "Todo not found" });
    }
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    const todo = await Todo.addTodo(request.body);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  // FILL IN YOUR CODE HERE

  // First, we have to query our database to delete a Todo by ID.
  // Then, we have to respond back with true/false based on whether the Todo was deleted or not.
  // response.send(true)
  try{
      const del=await Todo.destroy(
        {
          where:
          {
            id:request.params.id
          }
        }
      )
      if(del)
      return response.send(true);
      else
      return response.send(false);
  }
  catch(error)
  {
    console.error(error);
    return response.status(422).json(error);
  }
});

module.exports = app;
