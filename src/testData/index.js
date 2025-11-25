console.log("index called!");

const module1 = require("./modules/module1");
const module3 = require("./modules/nestedModules/module3");

console.log("module1 from index", module1);
console.log("module3 from index", module3);
