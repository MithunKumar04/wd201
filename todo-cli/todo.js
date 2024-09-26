const { title } = require("process");

const todoList = () => {
    all = []
    const add = (todoItem) => {
      all.push(todoItem)
    }
    const markAsComplete = (index) => {
      all[index].completed = true
    }
  
    const overdue = () => {
      let od=all.filter((i)=>
      {
        const val=i.dueDate;
        return val==yesterday;
      }
      )
      let od2=[];
      od.forEach(element => {
        if(element.completed==true)
            od2.push( `[x] ${element.title} ${element.dueDate}`)
        else
        od2.push( `[ ] ${element.title} ${element.dueDate}`)   
      });
        return od2;
    }
  
    const dueToday = () => {
        let td=all.filter((i)=>
            {
              const val=i.dueDate;
              return val==today;
            }
            )
            let td2=[];
            td.forEach(element => {
              if(element.completed==true)
                  td2.push( `[x] ${element.title}`)
              else
              td2.push( `[ ] ${element.title}`)   
            });
            return td2;
    }
  
    const dueLater = () => {
        let dl=all.filter((i)=>
            {
              const val=i.dueDate;
              return val==tomorrow;
            }
            )
            let dl2=[];
            dl.forEach(element => {
              if(element.completed==true)
                  dl2.push( `[x] ${element.title} ${element.dueDate}`)
              else
              dl2.push( `[ ] ${element.title} ${element.dueDate}`)   
            });
              return dl2;
    }
  
    const toDisplayableList = (list) => {
        str="";
        list.forEach((element1)=>
        {
            str=str.concat(element1,"\n");
        })
        str=str.concat("\n");
    return str;
    }
  
    return {
      all,
      add,
      markAsComplete,
      overdue,
      dueToday,
      dueLater,
      toDisplayableList
    };
  };
  
  // ####################################### #
  // DO NOT CHANGE ANYTHING BELOW THIS LINE. #
  // ####################################### #
  
  const todos = todoList();
  
  const formattedDate = d => {
    return d.toISOString().split("T")[0]
  }
  
  var dateToday = new Date()
  const today = formattedDate(dateToday)
  const yesterday = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() - 1))
  )
  const tomorrow = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() + 1))
  )
  
  todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
  todos.add({ title: 'Pay rent', dueDate: today, completed: true })
  todos.add({ title: 'Service Vehicle', dueDate: today, completed: false })
  todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
  todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })
  
  console.log("My Todo-list\n")
  
  console.log("Overdue")
  var overdues = todos.overdue()
  var formattedOverdues = todos.toDisplayableList(overdues)
  console.log(formattedOverdues)
  
  console.log("Due Today")
  let itemsDueToday = todos.dueToday()
  let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday)
  console.log(formattedItemsDueToday)
  
  console.log("Due Later")
  let itemsDueLater = todos.dueLater()
  let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater)
  console.log(formattedItemsDueLater)