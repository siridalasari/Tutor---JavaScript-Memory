const block = `{
    const b = 27;
    if(b < 5) {
        const x = 5;
    }

    {

    }

    { { }}
}
`
const findBlock = (bl) => {
	const block = bl.split("")
	console.log(block)
	const stack = ['{'];
	console.log(stack)
	let index = 1;
	while (stack.length != 0) {
		if (block[index] === '}')
			stack.pop();
		else if (block[index] === "{")
			stack.push("{")
		index++
		console.log(stack)
	}
}

findBlock(block);