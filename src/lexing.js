const program = `const a = 5; const b = 7; function add () { const c = 4; const d = 5}`;

const code = (instructions) => {
	const variablesLookUpTable = [];
	const functionsLookUpTable = [];
	const codeArr = instructions.split("");
	let index = 0;
	const findWord = () => {
		let word = '';
		while (codeArr[index] !== " " && index < codeArr.length) {
			word += codeArr[index];
			index++;
		}
		index++;
	return word;
	}
	console.log(codeArr)
	while (index < codeArr.length) {
		const currentWord = findWord();
		const nextWord = findWord();
		if (currentWord === "function") {
			functionsLookUpTable.push(nextWord)
		}
		else if (currentWord === "const") {
			variablesLookUpTable.push(nextWord);
		}
	}
	console.log(variablesLookUpTable, functionsLookUpTable);

}

code(program);