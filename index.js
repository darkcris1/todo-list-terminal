var colors = require("./Colors");
const { write } = process.stdout;
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
})
const speed = 1000 / 60;
const questions = {
	q1: "Do you you want to add a list ? \n 1. Yes \n 2. No \n--> ",
	q2: "Do you want to see the lists ? \n 1.Yes \n 2. No\n--> ",
	q3: "Add a List\n-->  ",
	q4: "Do you want to exit ? \n1.Yes\n2.No\n--> "
}
//const introStr = "\t——————————————\n\t|  ToDo-List |\n\t——————————————\n";
const introStr = `${colors.fg.White + colors.bg.Yellow}                                                                   
████████  ██████  ██████   ██████      ██      ██ ███████ ████████ 
   ██    ██    ██ ██   ██ ██    ██     ██      ██ ██         ██    
   ██    ██    ██ ██   ██ ██    ██     ██      ██ ███████    ██    
   ██    ██    ██ ██   ██ ██    ██     ██      ██      ██    ██    
   ██     ██████  ██████   ██████      ███████ ██ ███████    ██    
${colors.Reset}`                           
const todos = [];
function intro () {
	return new Promise(resolve=>{
		let i = 0;
		let inter = setInterval(function() {
			if (i >= introStr.length){
				clearInterval(inter)
				resolve();
				return;
			}
			process.stdout.write(introStr[i])
			i++;
		}, speed);
	})
}
function ask2(argument) {
	readline.question(questions.q2, input=> {
		if (parseInt(input) === 1) {
			let i = 0;
			let inter = setInterval(()=> {
				if (i > (todos.length - 1)) {
					clearInterval(inter);
					i = 0;
					ask();
					return;
				}
				console.log(colors.fg.Yellow);
				console.log(("\n",i+ 1) + ". " + todos[i]);
				console.log(colors.Reset);
				i++;

			},
				500)
		} else {
			ask();
		}
	})
}

function ask3() {
	readline.question(questions.q4,
		(ans) => {
			if (parseInt(ans) === 1) {
				readline.close();
			} else {
				ask();
			}
		});
}

function ask() {
	readline.question(questions.q1,
		(ans) => {
			if (Number(ans) === 1) {
				readline.question(questions.q3, input=> {
					todos.push(input);
					console.log(colors.fg.Blue,"\n'" +input + "'" + colors.Reset +"added to your todos \n");
					setTimeout(function() {
						ask2();
					}, 700);
				})
			} else {
				ask3();
			}
		});
}

let i = 0;
let interval = setInterval(function() {
	if (i > 100) {
		clearInterval(interval)
		intro().then(()=>ask());
		return;
	}
	console.clear();
	console.log("Loading " + (1+i));
	i++;
}, speed);