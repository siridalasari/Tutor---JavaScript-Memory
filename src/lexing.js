import { getHeapAddress } from "./heapAddress.js";

const program = `const a = "siri"; const b = 7; function add() { const c = 4; const d = 5 } const e = 11; function sub() { const f = 20;} `;
const variablesLookUpTable = [];
const functionsLookUpTable = [];
const heapMemory = [];
const code = (instructions) => {

	const codeArr = instructions.split("");
	let index = 0;
	const findWord = (char) => {
		let word = '';
		//console.log("findWord BLOCK")
		while (codeArr[index] !== char && index < codeArr.length) {
			word += codeArr[index];
			index++;
			//console.log(index);
		}
		//console.log("founded word ----> ", word);
		codeArr[index] === "(" ? index : index++;
		//console.log(index, codeArr[index]);
		return word;
	}
	const skipBlock = () => {
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
	while (index < codeArr.length) {
		//console.log("MainBlock BLOCK")
		const startIndex = index;
		//console.log(index, codeArr[index]);
		//console.log("main block started with char:", codeArr[index])
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
			functionsLookUpTable.push({ [nextWord]: heapAddress });
			heapMemory.push({ [heapAddress]: fnBlock })

		}
		else if (currentWord === "const") {
			const nextWord = findWord(" ");
			const skipOperator = findWord(" ")
			const assignedValue = findWord(";")


			variablesLookUpTable.push({ [nextWord]: assignedValue });

		}

	}
	//console.log("stack", functionsLookUpTable, variablesLookUpTable);
	//console.log("heap", heapMemory);
}

code(program);


const displayMemory = () => {
	console.log("================= Stack ================");
	functionsLookUpTable.forEach(element => {
		console.log(element);
	})
	variablesLookUpTable.forEach(element => {
		console.log(element);
	})
	console.log("================= Heap ================");
	heapMemory.forEach(element => {
		console.log(element);
	})
}
displayMemory();
// { "0xss710": "function add() { const c = 4; const d = 5 }" }
// { "0xss274": "function sub() { const f = 20;}" }

heapMemory.forEach(element => {
	for (const key in element) {
		console.log(key, element[key])
		const startIndex = element[key].split("").indexOf("{");
		const lastIndex = element[key].split("").lastIndexOf("}");
		console.log(element[key].split("").slice(startIndex + 1, lastIndex));
		code(element[key].split("").slice(startIndex + 1, lastIndex).join(""));

		displayMemory();
	}
})
