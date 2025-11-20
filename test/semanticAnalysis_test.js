import { assertEquals } from "jsr:@std/assert";
import { program } from "../src/userProgram.js";
import { linesOfCode } from "../src/lexing.js";

const output = [
  { "add()": [2, 7], "sub()": [9, 14] },
  { a: ["const", "a", '"nandhini";'], p: ["const", "p", '"prp";'] },
  {
    "add()": [
      "function add() {",
      "    function siri() {",
      '        const me = "hi";',
      "    }",
      "    const c = 4;",
      "    const d = 7;",
    ],
    "sub()": [
      "function sub() {",
      "    function sirisha() {    ",
      '        const me = "hi";',
      "    }",
      "    const c = 4;",
      "    const d = 5;",
    ],
  },
];

Deno.test("even modifications in code should match expected code", () =>
  assertEquals(linesOfCode(program), output));
