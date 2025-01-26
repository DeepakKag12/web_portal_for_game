const introMusic = new Audio("./audio/introSong.mp3");
const shootingSound = new Audio("./audio/shoooting.mp3");
const killEnemySound = new Audio("./audio/killEnemy.mp3");
const gameOverSound = new Audio("./audio/gameOver.mp3");
const heavyWeaponSound = new Audio("./audio/heavyWeapon.mp3");
const hugeWeaponSound = new Audio("./audio/hugeWeapon.mp3");
const canvas = document.createElement("canvas");
document.querySelector(".myGame").appendChild(canvas);
canvas.width = innerWidth;
canvas.height = innerHeight;
const context = canvas.getContext("2d");
let difficulty = 2;
const form = document.querySelector("form");
const scoreBoard = document.querySelector(".scoreBoard");
const lightWeaponDamage = 10;
const hugeyWeaponDamage = 80;
const heavyWeaponDamage = 40;
let playerScore = 0;

document.querySelector("input").addEventListener("click", (e) => {
  e.preventDefault();
  introMusic.pause();
  form.style.display = "none";
  scoreBoard.style.display = "block";

  const userValue = document.getElementById("difficulty").value;
  if (userValue == "Easy") {
    setInterval(spawnEnemy, 2000);
    return (difficulty = 2);
  }
  if (userValue == "Hard") {
    setInterval(spawnEnemy, 1400);
    return (difficulty = 7);
  }
  if (userValue == "Medium") {
    setInterval(spawnEnemy, 1000);
    return (difficulty = 5);
  }
  if (userValue == "Insane") {
    setInterval(spawnEnemy, 700);
    return (difficulty = 10);
  }
});

//End Screen

const gameOverLoader = () => {
  const gameOverBanner = document.createElement("div");
  const gameOverBtn = document.createElement("button");
  const highScore = document.createElement("div");
  highScore.innerHTML = `High Score : ${
    localStorage.getItem("highScore")
      ? localStorage.getItem("highScore")
      : playerScore
  }`;

  const oldHighScore =
    localStorage.getItem("higScore") && localStorage.getItem("highScore");

  if (oldHighScore < playerScore) {
    localStorage.setItem("highScore", playerScore);
    highScore.innerHTML = `highScore : ${playerScore}`;
  }
  gameOverBtn.innerText = "Play Again";
  gameOverBanner.appendChild(highScore);
  gameOverBanner.appendChild(gameOverBtn);
  gameOverBtn.onclick = () => {
    window.location.reload();
  };
  gameOverBanner.classList.add("gameover");
  document.querySelector("body").appendChild(gameOverBanner);
};
playerPosition = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

// Creating player class
class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false
    );
    context.fillStyle = this.color;

    context.fill();
  }
}

//Weapon class

class Weapon {
  constructor(x, y, radius, color, velocity, damage) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.damage = damage;
  }
  draw() {
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false
    );
    context.fillStyle = this.color;

    context.fill();
  }
  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

class HugeWeapon {
  constructor(x, y, damage) {
    this.x = x;
    this.y = y;

    this.color = `hsl(${Math.floor(Math.random() * 360)},100%,50%)`;

    this.damage = damage;
  }
  draw() {
    context.beginPath();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, 200, canvas.height);
  }
  update() {
    this.draw();
    this.x += 20;
  }
}
// Enemy class -------------

class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false
    );
    context.fillStyle = this.color;

    context.fill();
  }
  update() {
    this.draw();
    (this.x += this.velocity.x), (this.y += this.velocity.y);
  }
}

// particle class -------------
fraction = 0.99;
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }
  draw() {
    context.save();
    context.globalAlpha = this.alpha;
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false
    );
    context.fillStyle = this.color;

    context.fill();
    context.restore();
  }
  update() {
    this.draw();
    this.velocity.x *= fraction;
    this.velocity.y *= fraction;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
  }
}

// Main logic
//create player object
const abhi = new Player(playerPosition.x, playerPosition.y, 15, "white");

const weapons = [];
const enemies = [];
const particles = [];
const hugeWeapons = [];
const spawnEnemy = () => {
  const enemySize = Math.random() * (40 - 5) + 5;
  const enemyColor = `hsl(${Math.floor(Math.random() * 360)},100%,50%)`;
  let random;
  if (Math.random() < 0.5) {
    random = {
      x: Math.random() < 0.5 ? canvas.width + enemySize : 0 - enemySize,
      y: Math.random() * canvas.height,
    };
  } else {
    random = {
      y: Math.random() < 0.5 ? canvas.height + enemySize : 0 - enemySize,
      x: Math.random() * canvas.width,
    };
  }

  //finding angle btn cneter and enemy post
  const myAngle = Math.atan2(
    canvas.height / 2 - random.y,
    canvas.width / 2 - random.x
  );

  //making velocity
  const velocity = {
    x: Math.cos(myAngle) * difficulty,
    y: Math.sin(myAngle) * difficulty,
  };

  //adding enemy to arry

  enemies.push(new Enemy(random.x, random.y, enemySize, enemyColor, velocity));
};

// animation function

let animationId;

function animation() {
  // recursion function
  animationId = requestAnimationFrame(animation);

  //clearing canvas from each frame
  context.fillStyle = "rgba(49,49,49,0.1)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  //drawing player
  abhi.draw();

  particles.forEach((particle, particleIndex) => {
    if (particle.alpha <= 0) {
      particles.splice(particleIndex, 1);
    } else {
      particle.update();
    }
  });

  //generating huge weapons

  hugeWeapons.forEach((hugeWeapon, hugeWeaponIndex) => {
    if (hugeWeapon.x > canvas.width) {
      hugeWeapons.splice(hugeWeaponIndex, 1);
    } else {
      hugeWeapon.update();
    }
  });

  //generating bullets
  weapons.forEach((weapon, weaponIndex) => {
    weapon.update();
    if (
      weapon.x + weapon.radius < 1 ||
      weapon.y + weapon.radius < 1 ||
      weapon.x - weapon.radius > canvas.width ||
      weapon.y - weapon.radius > canvas.height
    ) {
      weapons.splice(weaponIndex, 1);
    }
  });
  enemies.forEach((enemy, enemyIndex) => {
    enemy.update();
    const distanceBtweenPlayerAndEnemy = Math.hypot(
      abhi.x - enemy.x,
      abhi.y - enemy.y
    );
    if (distanceBtweenPlayerAndEnemy - abhi.radius - enemy.radius < 1) {
      cancelAnimationFrame(animationId);
      gameOverSound.play();
      hugeWeaponSound.pause();
      killEnemySound.pause();
      shootingSound.pause();
      heavyWeaponSound.pause();
      return gameOverLoader();
    }
    // const distanceBtweenHugeWeaponAndEnemy =

    hugeWeapons.forEach((hugeWeapon) => {
      const distanceBtweenHugeWeaponAndEnemy = hugeWeapon.x - enemy.x;

      if (
        distanceBtweenHugeWeaponAndEnemy <= 200 &&
        distanceBtweenHugeWeaponAndEnemy >= -200
      ) {
        playerScore += 10;
        scoreBoard.innerHTML = `Score : ${playerScore}`;
        killEnemySound.play();
        setTimeout(() => {
          enemies.splice(enemyIndex, 1);
        }, 0);
      }
    });
    weapons.forEach((weapon, weaponeIndex) => {
      const distanceBtweenWeaponAndEnemy = Math.hypot(
        weapon.x - enemy.x,
        weapon.y - enemy.y
      );

      if (distanceBtweenWeaponAndEnemy - weapon.radius - enemy.radius < 1) {
        if (enemy.radius > weapon.damage + 8) {
          gsap.to(enemy, {
            radius: enemy.radius - weapon.damage,
          });
          //   enemy.radius -= 5;
          setTimeout(() => {
            weapons.splice(weaponeIndex, 1);
          }, 0);
        } else {
          for (let i = 0; i < enemy.radius * 5; i++) {
            particles.push(
              new Particle(weapon.x, weapon.y, Math.random() * 2, enemy.color, {
                x: (Math.random() - 0.5) * (Math.random() * 5),
                y: (Math.random() - 0.5) * (Math.random() * 5),
              })
            );
          }
          playerScore += 10;
          scoreBoard.innerHTML = `Score : ${playerScore}`;
          killEnemySound.play();
          setTimeout(() => {
            enemies.splice(enemyIndex, 1);
            weapons.splice(weaponeIndex, 1);
          }, 0);
        }
      }
    });
  });
}

canvas.addEventListener("click", (e) => {
  shootingSound.play();
  const myAngle = Math.atan2(
    e.clientY - canvas.height / 2,
    e.clientX - canvas.width / 2
  );
  const velocity = {
    x: Math.cos(myAngle) * 8,
    y: Math.sin(myAngle) * 8,
  };

  weapons.push(
    new Weapon(
      canvas.width / 2,
      canvas.height / 2,
      6,
      `rgb(${Math.random() * 250},${Math.random() * 250},${
        Math.random() * 250
      })`,
      velocity,
      lightWeaponDamage
    )
  );
});

canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();

  if (playerScore <= 10) return;
  heavyWeaponSound.play();
  playerScore -= 5;
  scoreBoard.innerHTML = `Score : ${playerScore}`;

  const myAngle = Math.atan2(
    e.clientY - canvas.height / 2,
    e.clientX - canvas.width / 2
  );
  const velocity = {
    x: Math.cos(myAngle) * 4,
    y: Math.sin(myAngle) * 4,
  };

  weapons.push(
    new Weapon(
      canvas.width / 2,
      canvas.height / 2,
      15,
      `rgb(${Math.random() * 250},${Math.random() * 250},${
        Math.random() * 250
      })`,
      velocity,
      heavyWeaponDamage
    )
  );
});

addEventListener("keypress", (e) => {
  playerScore -= 20;
  if (playerScore <= 30) return;
  hugeWeaponSound.play();
  scoreBoard.innerHTML = `Score : ${playerScore}`;
  if (e.key === " ") {
    hugeWeapons.push(new HugeWeapon(0, 0, hugeyWeaponDamage));
  }
});

addEventListener("resize", () => {
  window.location.reload();
});

animation();