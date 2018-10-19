//Input: String s
// Output: String k, where all the characters in s are separated by comas

const addComas = str => {
  if (!str) {
    return "";
  }
  let strArr = str.split("");
  return strArr.join(",");
};

//Input: String s
// Output: String k, where all the characters in s are separated by comas

//source: https://stackoverflow.com/questions/8392035/javascript-add-method-to-string-class
String.prototype.addComas = function() {
  if (!this) {
    return "";
  }
  this.split("");
  return this.join(",");
};

//Use arguments object
const log = (...args) => {
  const logConstant = "Custom_Logger_String";
  const args2 = [logConstant, ...args];
  isProd ? console.log(...args2) : "";
};

//creates Logger
//returns logFunction
const createLogger = prefix => {
  return function(...args) {
    const args2 = [prefix, ...args];
    isProd ? console.log(...args2) : "";
  };
};
