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

var task = () => {
    return JSON.parse(JSON.stringify({"name": "default", "completed": false}));
};

var main = function () {
    const question = "Welcome to your task manager, Press:\n1. to see all your tasks\n2. to add a task\n3. to delete a task\n4. to mark a task as done\n5. to Exit the task manager\n\n";

    rl.question(question, function (answer) {
        switch (answer) {
            case "1":
                const items = read_file();
                console.log("\n");
                items.forEach(item => {
                    console.log(`${item.name}`);
                });
                console.log("\n");
                break;
            case "2":
                console.log("==========================");
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
                const items_delete = read_file();
                console.log("\n");
                let count = 1;
                items_delete.forEach(item => {
                    console.log(`${count} - ${item.name}`);
                    count++;
                });
                console.log("\n");
                break;
            case "4":
                break;
            case "5":
                return rl.close();
                break;
            default:
                console.log('Answer: "', answer, '"');
        };
        main(); //Calling this function again to ask new question
    });
};

main();
