const readline = require('readline');
const fs = require('fs');

const read_file = () => {
    try {
        const data = fs.readFileSync('./test.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
};

const write_data = (data) => {
    fs.writeFile("test.json", JSON.stringify(data), err => {
        // Checking for errors
        if (err) throw err;
        console.log("List Updated"); // 
    });
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const read_all_tasks = () => {
    const items = read_file();
    let count = 1;
    console.log("\n");
    items.forEach(item => {
        if (item.completed) {
            console.log(`[x]-${count}- ${item.name}`);
        } else {
            console.log(`[ ]-${count}- ${item.name}`);
        }
        count++;
    });
    console.log("========================");
    console.log("\n");
};

var task = () => {
    return JSON.parse(JSON.stringify({"name": "default", "completed": false}));
};

var main = function () {
    const question = "Welcome to your task manager, Press:\n1. to see all your tasks\n2. to add a task\n3. to delete a task\n4. to mark a task as done\n5. to Exit the task manager\n\n";

    rl.question(question, function (answer) {
        switch (answer) {
            case "1":
                    read_all_tasks();
                    break;
            case "2":
                rl.question("Which task would you like to add?\n", function (added_item) {
                    task = task();
                    task["name"] = added_item;
                    let updated_list = read_file();
                    updated_list.push(task);
                    write_data(updated_list);
                    rl.close();
                });
                break;
            case "3":
                read_all_tasks();
                rl.question("Which task would you like to delete?\n", function (deleted_item_nbr) {
                    const index = Number(deleted_item_nbr) - 1;
                    let all_tasks = read_file();
                    all_tasks[index]["name"] = "";
                    let result = all_tasks.filter(object => object["name"] != "");
                    write_data(result);
                    rl.close();
                });
                break;
            case "4":
                read_all_tasks();
                rl.question("Which task would you like to mark as completed?", function (completed_item_nbr) {
                    const index = Number(completed_item_nbr) - 1;
                    let tasks_all = read_file();
                    tasks_all[index]["completed"] = true;
                    write_data(tasks_all);
                    rl.close();
                });
                break;
            case "5":
                return rl.close();
                break;
            default:
                console.log('Answer: "', answer, '"');
        };
        main(); //Calling this function to ask again
    });
};

main();
