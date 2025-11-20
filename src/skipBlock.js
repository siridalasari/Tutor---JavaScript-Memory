export const skipBlock = () => {
  skipEscapes();
  const stack = ["{"];
  index++;
  //console.log("skipBlock BLOCK")
  while (stack.length != 0) {
    if (codeArr[index] === "}") {
      stack.pop();
    } else if (codeArr[index] === "{") {
      stack.push("{");
    }
    index++;
    //console.log(index, codeArr[index]);
  }
};
