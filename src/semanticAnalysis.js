const memoryAllocation = () => {

  const callStack = {};
  const heapMemory = {};

  return {
    stack :(key, value) => callStack[key] = value,
    heap :(key, value) => heapMemory[key] = value,
    callStack: callStack,
    heapContent : heapMemory
  }
}

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
  memory.stack(varName, [declarationKey, varName, assignedVal]);
};

const findBlock = (lines) => {
  const startIndex = lines.currentLineNum();
  const stack = ["{"];
  lines.nextLine();

  while (stack.length !== 0) {
    const currentLine = lines.currLine();
    if (currentLine.includes("{")) stack.push("{");
    if (currentLine.includes("}")) stack.pop();

    lines.nextLine();
  }

  lines.prevLine();
  return lines.allLines().slice(startIndex, lines.currentLineNum());
};

const functionDeclaration = (lines) => {
  const startIndex = lines.currentLineNum();
  const words = lines.currLine().split(" ").map(word => word.trim());
  const fnName = words[1];
  const functionBlock = findBlock(lines);
  memory.heap(fnName, functionBlock);
  memory.heap(fnName, [startIndex, lines.prevLineNum()]);
};

export const semanticAnalysis = (program) => {
  const lines = programLines(program);
  const memory = memoryAllocation();;

  while (lines.currentLineNum() < lines.lastLineNum()) {
    const currentLine = lines.currLine();
    const words = currentLine.split(" ");
    words.map((word) => word.trim());
    const declartionKey = words[0];

    if (declartionKey === "const") {
      constVarDeclaration(lines, memory);
    } else if (declartionKey === "function") {
      functionDeclaration(lines, memory);
    }

    lines.nextLine();
  }

  console.log("hi",[memory.callStack, memory,heapContent]);

  return [lookUpTableFunctions, lookUpTableVariables, heapMemory];
};
