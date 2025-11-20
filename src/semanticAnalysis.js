const lookUpTableVariables = {};
const lookUpTableFunctions = {};
const heapMemory = {};

const programLines = (program) => {
  const instructions = program;
  const lines = instructions.split("\n");
  let index = 0;
  return {
    nextLine: () => lines[++index],
    prevLine: () => lines[--index],
    currLine: () => lines[index],
    prevLineNum: () => index - 1,
    currentLineNum: () => index,
    lastLineNum: () => lines.length,
    allLines: () => lines,
  };
};

const constVarDeclaration = (lines) => {
  const currentLine = lines.currLine();
  const words = currentLine.trim().split(" ");
  const varName = words[1];
  const assignedVal = words[3];
  const declarationKey = words[0];
  lookUpTableVariables[varName] = [declarationKey, varName, assignedVal];
};

const findBlock = (lines) => {
  const startIndex = lines.currentLineNum();
  const fnName = lines.currLine().split(" ")[1];
  const stack = ["{"];
  lines.nextLine();
  while (stack.length !== 0) {
    const currentLine = lines.currLine();
    if (currentLine.includes("{")) stack.push("{");
    if (currentLine.includes("}")) stack.pop();

    lines.nextLine();
  }
  lines.prevLine();
  const block = lines.allLines().slice(startIndex, lines.currentLineNum());
  heapMemory[fnName] = block;
  lookUpTableFunctions[fnName] = [startIndex, lines.prevLineNum()];
};

const functionDeclaration = (lines) => {
  const functionBlock = findBlock(lines);
};

export const linesOfCode = (program) => {
  const lines = programLines(program);
  while (lines.currentLineNum() < lines.lastLineNum()) {
    const currentLine = lines.currLine();
    const words = currentLine.split(" ");
    words.map((word) => word.trim());
    const declartionKey = words[0];

    if (declartionKey === "const") {
      constVarDeclaration(lines);
    } else if (declartionKey === "function") {
      functionDeclaration(lines);
    }

    lines.nextLine();
  }

  console.log([lookUpTableFunctions, lookUpTableVariables, heapMemory]);

  return [lookUpTableFunctions, lookUpTableVariables, heapMemory];
};
