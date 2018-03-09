
var formatDate = function(timestr){
  var globalTime = new Date(""+timestr), t="";
  t = globalTime.getFullYear()+
      "/" + fnTime(globalTime.getMonth(), "month")+
      "/" + fnTime(globalTime.getDate())+
      " " + fnTime(globalTime.getHours())+
      ":" + fnTime(globalTime.getMinutes())+
      ":" + fnTime(globalTime.getSeconds());
  return t;
}

var fnTime = function(time, month){
  time = parseInt(time);
  if(month){
    time++;
  }
  if(time<10){
    return "0"+time;
  }else{
    return time;
  }
}

var getRealTime = function(){
  var t = new Date();
  return formatDate(t);
}






module.exports = {
  formatDate:formatDate,
  getRealTime:getRealTime
}



