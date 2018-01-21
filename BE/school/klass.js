var student = require("./student");
var teacher = require("./teacher");

function add(stdNames, tchName) {
  teacher.add(tchName);


  stdNames.forEach(function(t, number){
     student.add(t);
  })
}






exports.add = add;

