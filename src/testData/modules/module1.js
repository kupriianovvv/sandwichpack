console.log("module1 called");

module.exports.fromModule1 = "fromModule1";
const module2 = require("./module2");
const module4 = require("./nestedModules/ultraNestedModules/module4");
module.exports.gotFromNestedRequire = module2;
console.log("module2 from module1", module2);
console.log("module4 from module1", module4);
