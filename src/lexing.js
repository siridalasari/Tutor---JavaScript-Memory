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
	console.log(codeArr)
	let index = 0;
	const findWord = (char) => {
		skipEscapes();
		let word = '';
		console.log("findWord BLOCK")
		while (codeArr[index] !== char && index < codeArr.length) {
			word += codeArr[index];
			index++;
			console.log(index, codeArr[index]);
		}
		console.log("founded word ----> ", word);
		// codeArr[index] === "(" ? index : index++;
		console.log(index, codeArr[index]);
		return word;
	}
	const skipBlock = () => {
		skipEscapes();
		const stack = ['{'];
		index++;
		console.log("skipBlock BLOCK")
		while (stack.length != 0) {
			if (codeArr[index] === '}')
				stack.pop();
			else if (codeArr[index] === "{")
				stack.push("{")
			index++;
			console.log(index, codeArr[index]);
		}
	}
	const skipEscapes = () => {
		while (codeArr[index] === " " || codeArr[index] === "\n" || codeArr[index] === "\t") {
			console.log("Escape sequence BLOCK");
			console.log(index, codeArr[index].toString())
			index++;
		}

	};

	while (index < codeArr.length) {
		console.log("MainBlock BLOCK")
		if (codeArr[index] === ";") index++;
		skipEscapes();
		const startIndex = index;
		//console.log(index, codeArr[index]);

		console.log("main block started with char:", codeArr[index])
		if (codeArr[index] === '{')
			skipBlock();

		const currentWord = findWord(" ");
		if (currentWord === "function") {
			const nextWord = findWord("(");
			const heapAddress = getHeapAddress();
			findWord(" ");
			skipBlock();
			const lastIndex = index;
			const fnBlock = codeArr.slice(startIndex, lastIndex).join("");
			functionsLookUpTable[nextWord] = heapAddress;
			heapMemory[heapAddress] = fnBlock

		}
		else if (currentWord === "const") {
			const nextWord = findWord(" ");
			const skipOperator = findWord(" ")
			const assignedValue = findWord(";") // or should be space


			variablesLookUpTable[nextWord] = assignedValue;

		}

	}
	console.log("stack", functionsLookUpTable, variablesLookUpTable);
	console.log("heap", heapMemory);
	lookUpTableGlobal.push([functionsLookUpTable, variablesLookUpTable]);
	heapMemoryGlobal.push(heapMemory);
	console.log(heapMemory, Object.keys(heapMemory).length);
	if (Object.keys(heapMemory).length) {
		console.log("entered into recurrsion");
		for (const key in heapMemory) {

			console.log(key, heapMemory[key])
			const instructions = heapMemory[key].split("");
			const startIndex = instructions.indexOf("{");
			const lastIndex = instructions.lastIndexOf("}");
			//console.log(instructions.slice(startIndex + 1, lastIndex));
			code(instructions.slice(startIndex + 1, lastIndex).join(""));

		}
	}
}

code(program);


const displayMemory = () => {
	console.log("================= Stack ================");
	lookUpTableGlobal.forEach(element => {
		console.log(element);
	})
	console.log("================= Heap ================");
	heapMemoryGlobal.forEach(element => {
		console.log(element);
	})
}
displayMemory();



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

// diplayStepByStep();