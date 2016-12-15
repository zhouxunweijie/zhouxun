
var a = require("./A");
function avg(){
    return a.sun.apply(null,arguments)/arguments.length
};
module.exports = {
    avg : avg
}
