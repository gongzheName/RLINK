

var c = 0;

function print() {
  console.log(c);
}

function plus(cb) {

  setTimeout(function(){
    c++;
    cb(c);
  }, 1000)
}

plus(print);










