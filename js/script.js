document.addEventListener("DOMContentLoaded", function() {
  const game1Button = document.querySelector("a[href='assets/game1/game1.html'] button");
  game1Button.addEventListener("click", function() {
    console.log("Game 1 button clicked.");
   
  });

  const game2Button = document.querySelector("a[href='assets/game2/game2.html'] button");
  game2Button.addEventListener("click", function() {
    console.log("Game 2 button clicked.");
   
  });

  
  const game3Button = document.querySelector("a[href='flutter-game/game3/build/web/index.html'] button");
  game3Button.addEventListener("click", function() {
    console.log("Game 3 button clicked.");
  
  });

  
  const game4Button = document.querySelector("a[href='flutter-game/game4/build/web/index.html'] button");
  game4Button.addEventListener("click", function() {
    console.log("Game 4 button clicked.");
  
  });
});
  
