var a =
  "hello everyone welcome to typing test where you can enjoy typing as well as learning you can learn to type fast like no one else in the world";
var z = a.split(" ");
var len = z.length;
var gametime = 60 * 1000;
window.timer = null;
window.gameStart = null;
function wo() {
  var ind = Math.floor(Math.random() * len);
  return z[ind];
}
function refresh() {
  return location.reload();
}
function addClass(el, name) {
  el.className += " " + name;
}
function removeClass(el, name) {
  el.className = el.className.replace(name,"");
}
function replaceClass(el, names, namee){
  el.className = el.className.replace(names, namee);
}
function foramt(j) {
  return `<div class="word"><span class="letter">${j.split("").join('</span><span class="letter">')}</span></div>`;
}
function wor() {
  for (var i = 0; i < 100; i++) {
    document.getElementById("text").innerHTML += foramt(wo());
  }
  addClass(document.querySelector(".word"), "highlightbox");
  addClass(document.querySelector(".letter"), "current");
  document.getElementById("timer").innerHTML = "1:00";
  window.timer = null;
}
var so = document.querySelector(".word.highlightbox");
function gameover(){
  clearInterval(window.timer);
  var icon = document.querySelector(".material-icons");
  icon.style.top = "35px";
  var timer = document.querySelector(".timer");
  replaceClass(timer, "timer", "time");
  var textbox = document.querySelector(".text-box");
  var texx = document.querySelector(".tex");
  texx.setAttribute("type", "hidden");
  replaceClass(textbox, "text-box", "text-boxx");
  replaceClass(texx, "tex", "texx");
  var wordincorrect = document.querySelectorAll(".word.incorrect").length;
  var wordsuccess = document.querySelectorAll(".word.success").length;
  var result = document.querySelector(".result");
  var headings = document.querySelector(".heading");
  var wpm = document.querySelector(".wp");
  var scores = document.querySelector(".scores");
  replaceClass(result, "result", "results");
  replaceClass(wpm, "wp", "wpm");
  addClass(headings, "headings");
  var heading = document.querySelector(".heading");
  var headh1 = document.createElement('h1');
  var headh1text = document.createTextNode("RESULT:");
  headh1.appendChild(headh1text);
  heading.appendChild(headh1);
  var wpmh1 = document.createElement('h1');
  var wpmh1text = document.createTextNode(wordsuccess + " " + "WPM");
  var wpmp = document.createElement('p');
  var wpmptext = document.createTextNode("(words per minute)");
  wpmh1.appendChild(wpmh1text);
  wpm.appendChild(wpmh1);
  wpmp.appendChild(wpmptext);
  wpm.appendChild(wpmp);
  var  wrongh2 = document.createElement('h2');
  var wrongh2text = document.createTextNode("Wrong Words : " + " ");
  var wrongh3 = document.createElement('h3');
  var wrongh3text = document.createTextNode(wordincorrect);
  wrongh2.appendChild(wrongh2text);
  wrongh3.appendChild(wrongh3text);
  scores.appendChild(wrongh2);
  scores.appendChild(wrongh3);
}
document.getElementById("tex").addEventListener("keyup", ev=>{
  var Key = ev.key;
  var word = document.querySelector(".word.highlightbox");
  var clo = document.getElementsByClassName("word highlightbox")[0].innerHTML;
  var cloo = clo.length;
  var letter = document.querySelector(".letter.current");
  var lett = letter?.innerHTML || ' ';
  var isletter = Key.length === 1 && Key !== " ";
  var text = document.getElementById("tex");
  var min = 1;
  var time = min * 60;
  if(!window.timer && lett){
    window.timer = setInterval(timefun => {
      if(!window.gameStart){
        window.gameStart = new Date().getTime;
      }
      var minutes = time / 60;
      var seconds = time % 61;
      document.getElementById("timer").innerHTML = `0:${seconds}`;
      time--; 
      if(seconds < 10){
        document.getElementById("timer").innerHTML = `0:${'0' + seconds}`;
      }
      if(seconds <= 0){
        gameover();
      }
    }, 1000);
  }
  if(isletter){
    if(letter){
      addClass(letter, Key === lett ? "correct" : "wrong");
      removeClass(letter, "current");
      if(letter.nextSibling){
        addClass(letter.nextSibling, "current"); 
      }
    }
    else{
      var vali = document.querySelectorAll(".word.highlightbox .letter.correct");
      addClass(word, "highlightwrong");
    }
  }
  if(Key === ' '){
    text.value = null;
    if(word){
      var val = document.querySelectorAll(".word.highlightbox .letter.wrong");
      var valc = document.querySelectorAll(".word.highlightbox .letter.correct");
      var vale = document.querySelectorAll(".word.highlightbox .letter");
      if(lett !== " " || val.length >= 1){
        var valid = document.querySelectorAll(".word.highlightbox .letter:not(.wrong)");
        valid.forEach(leter =>{
          addClass(leter, "wrong");
        });
        var validate = document.querySelectorAll(".word.highlightbox .letter.correct");
        validate.forEach(lete =>{
          replaceClass(lete, "correct", "");
        });
        addClass(word, "incorrect");
      }
      if(valc.length === vale.length){
        addClass(word, "success");
      }
      if(document.querySelector(".word.highlightbox.highlightwrong")){
        removeClass(word, "highlightwrong");
        var vali = document.querySelectorAll(".word.highlightbox .letter.correct");
        vali.forEach(mem => {
          replaceClass(mem, "correct", "wrong");
        });
        replaceClass(word, "success", "incorrect");
      }
      removeClass(word, "highlightbox");
      addClass(word.nextSibling, "highlightbox");
      if(letter){
        removeClass(letter, "current");
      }
      addClass(word.nextSibling.firstChild, "current");
    }
  }
  if(Key === 'Backspace'){
    var wordlen = word.querySelectorAll("span").length;
    var keylen = document.querySelector(".tex").value.length;
    if(word && letter){
      removeClass(letter, "current");
      addClass(letter.previousSibling, "current");
      removeClass(letter.previousSibling, "correct");
      removeClass(letter.previousSibling, "wrong");
    }
    if(word.lastChild){
      removeClass(word, "highlightwrong");
      //replaceClass(word.lastChild, "wrong", "current");
      //replaceClass(word.lastChild, "correct", "current");
      if(keylen === wordlen - 1){
        replaceClass(word.lastChild, "wrong", "current");
        replaceClass(word.lastChild, "correct", "current");
      }
    }
  }
  if(document.querySelector(".word.highlightbox").getBoundingClientRect().top > 388.5){
    var text = document.getElementById("text");
    var margin = parseInt(text.style.marginTop || '0px');
    text.style.marginTop = (margin - 120) + 'px';
  }
});
wor();