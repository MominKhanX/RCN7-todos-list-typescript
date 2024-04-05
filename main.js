#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let conditions = true;
// Print welcome message
console.log(chalk.bold.rgb(73, 158, 255)(`${chalk.bold.hex('#499EFF')(`\n  \t\t <<<======================================>>>`)}`));
console.log(chalk.rgb(0, 255, 51).bold("\n \t<================ Welcome to My Todo-List Application ================>\n"));
console.log(chalk.bold.rgb(73, 158, 255)(`${chalk.bold.hex('#499EFF')(`\t\t <<<======================================>>>\n`)}`));
/*
while (conditions){
    let addTask = await inquirer.prompt([
        {
            name: "Task",
            type: "input",
            message: chalk.blue.bold("Indicate your new task:")
        }
    ]);
    todoList.push(addTask.Task);
    console.log(`${addTask.Task} task added succesfuly in Todo-List.`);

    let addMoreTask = await inquirer.prompt([
        {
            name: "addMore",
            type: "confirm",
            message: chalk.green.bold("Would you like to include more tasks?"),
            default: "false"
        }
    ]);
    conditions = addMoreTask.addMore;
}
console.log(chalk.yellow.bold("Here's your revised to-do list:"), todoList);

// Create, Update, add, Delete, Read
*/
let main = async () => {
    while (conditions) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.cyan.bold("Select an option to perform:"),
                choices: [
                    chalk.yellow.bold("Add Task"),
                    chalk.rgb(0, 196, 255).bold("Update To-do List"),
                    chalk.rgb(246, 57, 95).bold("Delete Task"),
                    chalk.rgb(0, 255, 94).bold("Read To-do List"),
                    chalk.rgb(216, 219, 167).bold("Exit")
                ]
            }
        ]);
        if (option.choice === chalk.yellow.bold("Add Task")) {
            await addTasks();
        }
        else if (option.choice === chalk.rgb(246, 57, 95).bold("Delete Task")) {
            await deleteTask();
        }
        else if (option.choice === chalk.rgb(0, 255, 94).bold("Read To-do List")) {
            await viewTask();
        }
        else if (option.choice === chalk.rgb(0, 196, 255).bold("Update To-do List")) {
            await updateTask();
        }
        else if (option.choice === chalk.rgb(216, 219, 167).bold("Exit")) {
            conditions = false;
        }
    }
};
// Function to add new task to the list
let addTasks = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.magenta.bold("Enter your new task :"),
            validate: function (value) {
                if (value.trim() !== '') {
                    return true;
                }
                return chalk.red.bold("Please enter a valid task!");
            }
        }
    ]);
    todoList.push(newTask.task);
    console.log(chalk.rgb(26, 255, 0).bold((`\n ${newTask.task} added successfully in to-do list!`)));
};
// function to view all todo-list items
let viewTask = () => {
    console.log(chalk.rgb(0, 128, 255).bold((`\n Your To-do List: \n`)));
    todoList.forEach((task, index) => {
        console.log(`${index}: ${task}`);
    });
    if (todoList.length === 0) {
        console.log(chalk.rgb(255, 0, 0).bold(("Your Todo-List is Empty!")));
    }
};
// Function to update a task in the list
let updateTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellow.bold("Enter the 'Index Number' of the task you want to update:")
        }
    ]);
    let updatedTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.magenta("Enter the updated task:")
        }
    ]);
    todoList[taskIndex.index] = updatedTask.task;
    console.log(chalk.rgb(26, 255, 0).bold((`\nTask updated successfully!`)));
    await viewTask(); // Show the updated task list after modification
};
// Function to delete a task from the list
let deleteTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.green.bold("Enter The 'Index Number' of the task you want to delete:")
        }
    ]);
    let deletedTask = todoList.splice(taskIndex.index, 1);
    console.log(chalk.rgb(0, 255, 179).bold((`\n ${deletedTask} has been excluded from your To-do List Successfully.`)));
};
main();
