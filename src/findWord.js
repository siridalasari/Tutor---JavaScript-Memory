export const findWord = (char) => {
  skipEscapes();
  let word = "";
  //console.log("findWord BLOCK")
  while (codeArr[index] !== char && index < codeArr.length) {
    word += codeArr[index];
    index++;
    //console.log(index, codeArr[index]);
  }
  //console.log("founded word ----> ", word);
  //console.log(index, codeArr[index]);
  return word;
};
