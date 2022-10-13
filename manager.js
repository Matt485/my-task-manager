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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var question = "Welcome to your task manager, Press:\n1. to see all your tasks\n2. to add a task\n3. to delete a task\n4. to mark a task as done\n5. to Exit the task manager\n\n";

var main = function () {
    rl.question(question, function (answer) {
        switch (answer) {
            case 'exit':
                return rl.close();
                break;
            default:
                console.log('Answer: "', answer, '"');
        };
        main(); //Calling this function again to ask new question
    });
};

main();
