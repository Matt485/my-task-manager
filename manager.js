const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const read_file = () => {
    try {
        const data = fs.readFileSync('./test.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
};

var prompt = "Welcome to your task manager, Press:\n1. to see all your tasks\n2. to add a task\n3. to delete a task\n4. to mark a task as done\n5. to Exit the task manager\n\n";

rl.question(prompt, (answer) => {
    // TODO: Log the answer in a database
    console.log(`\nThank you for your valuable feedback: ${answer}`);
    rl.close();
});
