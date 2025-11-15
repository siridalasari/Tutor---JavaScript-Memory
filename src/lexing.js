const program = `const a = 5; const b = 7; function add () { const c = 4; const d = 5 }; const e = 11; function sub () { const f = 20;}`;

const code = (instructions) => {
	const variablesLookUpTable = [];
	const functionsLookUpTable = [];
	const codeArr = instructions.split("");
	let index = 0;
	const findWord = () => {
		let word = '';
		console.log("findWord BLOCK")
		while (codeArr[index] !== " " && index < codeArr.length) {
			word += codeArr[index];
			index++;
			console.log(index);
		}
		console.log("founded word ----> ", word);
		index++
		console.log(index, codeArr[index]);
		return word;
	}
	const skipBlock = () => {
		const stack = ['{'];
		index++
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
	while (index < codeArr.length) {
		console.log("MainBlock BLOCK")
		console.log(index, codeArr[index]);
		console.log("main block started with char:", codeArr[index])
		if (codeArr[index] === '{')
			skipBlock();
		
			const currentWord = findWord();
			if (currentWord === "function") {
				const nextWord = findWord();
				functionsLookUpTable.push(nextWord)
			}
			else if (currentWord === "const") {
				const nextWord = findWord();
				variablesLookUpTable.push(nextWord);
			}
		
	}
	console.log(variablesLookUpTable, functionsLookUpTable);

}

code(program);