console.log("module3 called");
const module4 = require("./ultraNestedModules/module4");
module.exports = {
  fromModule3: "fromModule3",
};

console.log("module4 from module3", module4);
