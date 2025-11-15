const program = `const a = 5; const b = 7; function add () { const c = 4; const d = 5}`;

const a_z = "abcdefghijklmnopqrstuvwxyz";
const A_Z = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "0123456789";
const spaces = " \t\n\r\f";
const brackets = "(){}[]";
const separators = ",;.:?";
const arithmetic = "+-*/%**";
const assignment = "=+=-=*=/=%=**=";
const comparison = "==!====!==>>=<<=";
const logical = "&&||!";
const quotes = "''``" + '""';
const comment = "///**/";
const specialSym = "$_";
const dictionary = "const"

const variablesLookUpTable = [];
const functionsLookUpTable = [];

const code = (instructions) => {
    const codeArr = instructions.split("");
    console.log(codeArr)
    let index = 0;
    while (index < codeArr.length) {
        if (codeArr[index] === "function") {
            functionsLookUpTable.push(codeArr[index + 1])
        }
        else if (codeArr[index] === "const" && !(codeArr[index + 2].startsWith("(")))
        {
            variablesLookUpTable.push(codeArr[index + 1]);
        }
        index += 2;
    }
    console.log(variablesLookUpTable,functionsLookUpTable);

}

code(program);

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
        if(block[index] === '}') 
            stack.pop();
        else if(block[index] === "{") 
            stack.push("{")
    index++
    console.log(stack)
    }
}

findBlock(block);