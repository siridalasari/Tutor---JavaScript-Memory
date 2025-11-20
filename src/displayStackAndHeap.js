const display = () => {
  //console.log(lookUpTableGlobal);
  //console.log(heapMemoryGlobal);
  const allFunctions = Object.entries(lookUpTableGlobal[0]);
  const variablesDeclared = Object.entries(lookUpTableGlobal[1]);
  let index = -1;
  let myprompt = "";
  while (myprompt !== "s") {
    console.clear();
    //console.log(index);
    //console.log("start");
    console.log("n -> next, p -> previous");
    if (myprompt === "n") {
      index += 1;
    }
    if (myprompt === "p") {
      index -= 1;
    }
    if (myprompt === "n" && index >= 0) {
      console.log("\n============ Call Stack ============");
      for (let i = 0; i < allFunctions.length; i++) {
        console.log(allFunctions[i][0], allFunctions[i][1]);
      }
    }
    const buffer = variablesDeclared.slice(0, index + 1);
    if (index > 0) {
      for (let i = 0; i < index; i++) {
        console.log(buffer[i][0], buffer[i][1]);
      }
    }
    if (index >= 0) {
      console.log("\n\n\n=========== Heap Memory ===========\n");
      for (const key in heapMemoryGlobal[0]) {
        console.log(key + ":", heapMemoryGlobal[0][key]);
      }
    }
    myprompt = prompt("");
  }
};
