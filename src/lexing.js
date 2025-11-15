const program = `const a = 5; const b = 7; function add () { const c = 4; const d = 5}`;

const code = (instructions) => {
	const variablesLookUpTable = [];
	const functionsLookUpTable = [];
	const codeArr = instructions.split("");
	let index = 0;
	console.log(codeArr)
	while (index < codeArr.length) {
		let word = '';
		while (codeArr[index] !== " " && index < codeArr.length) {
			word += codeArr[index];
			index++;
		}
		index++;
		let nextWord = '';
		while (codeArr[index] !== " " && index < codeArr.length) {
			nextWord += codeArr[index];
			index++;
		}
		if (word === "function") {
			functionsLookUpTable.push(nextWord)
		}
		else if (word === "const") {
			variablesLookUpTable.push(nextWord);
		}
		index++;
	}
	console.log(variablesLookUpTable, functionsLookUpTable);

}

code(program);