var navDiv = document.getElementById("navDiv");

var allA = document.getElementsByTagName("a");

// allA[0].style.visibility = 'hidden';
for (var i = 0; i < allA.length; i++) {
  allA[i].style.visibility = "hidden";
}

window.onload = function () {
  var index = 0;

  var timer;

  timer = setInterval(function () {
    allA[index].style.visibility = "visible";
    index++;
    if (index > allA.length - 1) {
      clearInterval(timer);
    }
  }, 500);
};
