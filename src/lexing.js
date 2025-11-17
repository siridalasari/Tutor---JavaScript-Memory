import { getHeapAddress } from "./heapAddress.js";

const program =
	`     const a = "siri";
 const b = 7;  
function add() {
	function siri() {
		const me = "hi"
	}
	const c = 4;
	const d = 5;
}
const e = 11; 
function sub()    {
	 const f = 20;}
const last = 30`


const lookUpTableGlobal = [];
const heapMemoryGlobal = [];
const code = (instructions) => {
	const variablesLookUpTable = {};
	const functionsLookUpTable = {};
	const heapMemory = {};

	const codeArr = instructions.split("");
	//console.log(codeArr)
	let index = 0;
	const findWord = (char) => {
		skipEscapes();
		let word = '';
		//console.log("findWord BLOCK")
		while (codeArr[index] !== char && index < codeArr.length) {
			word += codeArr[index];
			index++;
			//console.log(index, codeArr[index]);
		}
		//console.log("founded word ----> ", word);
		//console.log(index, codeArr[index]);
		return word;
	}
	const skipBlock = () => {
		skipEscapes();
		const stack = ['{'];
		index++;
		//console.log("skipBlock BLOCK")
		while (stack.length != 0) {
			if (codeArr[index] === '}')
				stack.pop();
			else if (codeArr[index] === "{")
				stack.push("{")
			index++;
			//console.log(index, codeArr[index]);
		}
	}
	const skipEscapes = () => {
		while (codeArr[index] === " " || codeArr[index] === "\n" || codeArr[index] === "\t") {
			//console.log("Escape sequence BLOCK");
			//sconsole.log(index, codeArr[index].toString())
			index++;
		}

	};

	while (index < codeArr.length) {
		//console.log("MainBlock BLOCK")
		if (codeArr[index] === ";") index++;
		skipEscapes();
		const startIndex = index;
		//console.log("main block started with char:", index, codeArr[index])
		if (codeArr[index] === '{')
			skipBlock();

		const currentWord = findWord(" ");
		if (currentWord === "function") {
			const nextWord = findWord("(");
			const heapAddress = getHeapAddress();
			findWord(" ");// to skip paranthesis
			skipBlock();//to find the last index of the block
			const lastIndex = index;
			const fnBlock = codeArr.slice(startIndex, lastIndex).join("");//function definiton
			functionsLookUpTable[nextWord] = heapAddress;
			heapMemory[heapAddress] = fnBlock

		}
		else if (currentWord === "const") {
			const nextWord = findWord(" ");
			findWord(" ") //To skip operator
			const assignedValue = findWord(";") // or should be space
			variablesLookUpTable[nextWord] = assignedValue;

		}

	}
	//console.log("stack", functionsLookUpTable, variablesLookUpTable);
	//console.log("heap", heapMemory);
	lookUpTableGlobal.push(functionsLookUpTable);
	lookUpTableGlobal.push(variablesLookUpTable);
	heapMemoryGlobal.push(heapMemory);
	// console.log(heapMemory, Object.keys(heapMemory).length);
	// if (Object.keys(heapMemory).length) {
	// 	console.log("entered into recurrsion");
	// 	for (const key in heapMemory) {

	// 		console.log(key, heapMemory[key])
	// 		const instructions = heapMemory[key].split("");
	// 		const startIndex = instructions.indexOf("{");
	// 		const lastIndex = instructions.lastIndexOf("}");
	// 		code(instructions.slice(startIndex + 1, lastIndex).join(""));

	// 	}
	// }
}

code(program);


// const displayMemory = () => {
// 	console.log("================= Stack ================");
// 	lookUpTableGlobal.forEach(element => {
// 		console.log(element);
// 	})
// 	console.log("================= Heap ================");
// 	heapMemoryGlobal.forEach(element => {
// 		console.log(element);
// 	})
// }
// displayMemory();



// const diplayStepByStep = () => {
// 	console.log(" "+("_".repeat(30)));
// 	// console.log(lookUpTableGlobal)
// 	// console.log("only functions", lookUpTableGlobal[0])
// 	for (const key in lookUpTableGlobal[0][0]) {
// 		console.log("|  ", (key + " -> " + lookUpTableGlobal[0][0][key]).padEnd(26), "|")
// 	}
// 	console.log(" "+("_".repeat(30)));
// 	//console.log(heapMemoryGlobal)
// 	for (const key in heapMemoryGlobal[0]) {
// 		console.log("|  ", (key + " -> " + heapMemoryGlobal[0][key]).padEnd(200), "|")
// 	}
// 	console.log(" "+("_".repeat(30)));
// 	//console.log(heapMemoryGlobal)
// }

const display = () => {
	//console.log(lookUpTableGlobal);
	//console.log(heapMemoryGlobal);
	const allFunctions = Object.entries(lookUpTableGlobal[0]);
	const variablesDeclared = Object.entries(lookUpTableGlobal[1]);
	let index = -1;
	let myprompt = "";
	while (myprompt !== "s") {
		console.clear();
		//console.log(index);
		//console.log("start");
		console.log("n -> next, p -> previous");
		if (myprompt === "n")
			index += 1;
		if (myprompt === "p")
			index -= 1;
		if (myprompt === "n" && index >= 0) {
			console.log("\n============ Call Stack ============")
			for (let i = 0; i < allFunctions.length; i++) {
				console.log(allFunctions[i][0], allFunctions[i][1]);
			}
	
		}
		const buffer = variablesDeclared.slice(0, index + 1)
		if (index > 0) {
			for (let i = 0; i < index; i++) {
				console.log(buffer[i][0], buffer[i][1]);
			}
		}
		if(index >= 0) {
			console.log("\n\n\n=========== Heap Memory ===========\n")
			for (const key in heapMemoryGlobal[0]) {
			console.log(key + ":", heapMemoryGlobal[0][key])
		}
		}
		myprompt = prompt("");
		
	}
}

display();
//diplayStepByStep();