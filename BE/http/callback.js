function learn(sth) {
  console.log(sth);
}

function v(cb, sth) {
  sth += " is cool";
  cb(sth);
}


v(learn, "node");

v(function(sth) {
  console.log(sth);
}, "react");






