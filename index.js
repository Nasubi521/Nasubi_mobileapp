// 指定したID名のオブジェクトを取得
var navDiv = $("#navDiv");

// 指定したタグのオブジェクトを取得
// var allA = $("a"); <==このように取得できるが、使わないのでコメントアウト

// aタグの要素数を取得
cnt = $("a").length

// 複数の要素に同じ処理を当てる...ここはforを使わなくてもjQueryならできる
$(document).ready(function(){
  // $("a").css("visibility", "hidden");
  $("a").hide();
});
////以下のようにdocumentやreadyを省略して書くことが可能
// $(function(){
//   $("a").css("visibility", "hidden");
// });

$(window).on("load", function() {
  var index = 0;

  var timer;

  $(function(){
    timer = setInterval(function(){
      // $("a").eq(index).css("visibility", "visible");
      $("a").eq(index).toggle(250);

      index++;
      if (index == cnt) {
        clearInterval(timer);
      }
    }, 500);
  });
  
});
