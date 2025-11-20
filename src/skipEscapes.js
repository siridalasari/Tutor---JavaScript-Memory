export const skipEscapes = () => {
  while (
    codeArr[index] === " " || codeArr[index] === "\n" ||
    codeArr[index] === "\t"
  ) {
    //console.log("Escape sequence BLOCK");
    //sconsole.log(index, codeArr[index].toString())
    index++;
  }
};
