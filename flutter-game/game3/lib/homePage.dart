import 'dart:async';
import 'dart:math';
import 'package:flappy_bird/cactus_barrier.dart';
import 'package:flappy_bird/bubble.dart';
import 'package:flappy_bird/burst_animation.dart';
import 'package:flutter/material.dart';
import 'package:audioplayers/audioplayers.dart'; // Import audioplayers package

class HomePage extends StatefulWidget {
  @override
  State<HomePage> createState() {
    return _HomePage();
  }
}

class _HomePage extends State<HomePage> {
  static double bubbleYAxis = 0;
  double time = 0;
  double height = 0;
  double initialHeight = 0;
  bool gameHasStarted = false;
  static double barrierXone = 1;
  double barrierXtwo = barrierXone + 1.5; // Initial horizontal distance
  int score = 0;
  int bestScore = 0;
  Timer? gameTimer;
  bool showBurst = false;
  Alignment burstPosition = Alignment(0, 0);

  bool isAudioPlaying = false;

  // Randomization variables
  Random random = Random();
  double barrierGap = 0.4; // Initial gap as a fraction of screen height
  double barrierHeightOne = 300.0; // Initial height of the first barrier
  double barrierHeightTwo = 300.0; // Initial height of the second barrier
  double horizontalDistance =
      1.5; // Initial horizontal distance between barriers

  // Audio player instances
  final audioPlayer = AudioPlayer(); // For background music
  final collisionAudioPlayer = AudioPlayer(); // For collision sound

  double convertAlignmentToPixels(double alignment, double containerSize) {
    return (alignment + 1) * containerSize / 2;
  }

  void showGameOverDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: Colors.brown,
          title: Text(
            'Game Over',
            style: TextStyle(color: Colors.white),
            textAlign: TextAlign.center,
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'Score: $score',
                style: TextStyle(color: Colors.white, fontSize: 20),
              ),
              SizedBox(height: 10),
              Text(
                'Best Score: $bestScore',
                style: TextStyle(color: Colors.white, fontSize: 20),
              ),
            ],
          ),
          actions: [
            Center(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                  padding: EdgeInsets.symmetric(horizontal: 30, vertical: 10),
                ),
                onPressed: () {
                  Navigator.of(context).pop();
                  resetGame();
                },
                child: Text(
                  'Restart',
                  style: TextStyle(fontSize: 18),
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  bool checkCollision() {
    final RenderBox box = context.findRenderObject() as RenderBox;
    final size = box.size;

    final bubblePosition = convertAlignmentToPixels(bubbleYAxis, size.height);
    final barrierOneX = convertAlignmentToPixels(barrierXone, size.width);
    final barrierTwoX = convertAlignmentToPixels(barrierXtwo, size.width);

    final bubbleSize = 40.0;
    final barrierWidth = 100.0;

    if ((barrierOneX - barrierWidth / 2 < size.width / 2 + bubbleSize / 2 &&
            barrierOneX + barrierWidth / 2 > size.width / 2 - bubbleSize / 2) ||
        (barrierTwoX - barrierWidth / 2 < size.width / 2 + bubbleSize / 2 &&
            barrierTwoX + barrierWidth / 2 > size.width / 2 - bubbleSize / 2)) {
      if (bubblePosition < (size.height - barrierGap * size.height) / 2 ||
          bubblePosition > (size.height + barrierGap * size.height) / 2) {
        burstPosition = Alignment(0, bubbleYAxis);
        playCollisionAudio(); // Play collision audio
        return true;
      }
    }

    if (bubblePosition > size.height - bubbleSize) {
      burstPosition = Alignment(0, bubbleYAxis);
      playCollisionAudio(); // Play collision audio
      return true;
    }

    return false;
  }

  void playCollisionAudio() async {
    // List of audio file paths
    List<String> audioFiles = [
      'audios/aji-mangal.mp3',
      'audios/bekar-hai-bhaiya-mai-to-toot-gaya.mp3'
          'audios/aisa-mat-karo.mp3',
      'audios/hey-prabhu-hey-hari-ram-krishna-jagganath_Ew1vEwh.mp3',
      'audios/Voicy_khatam goodbye.mp3',
      'audios/cat-laugh-meme-1.mp3'
    ];

    // Generate a random index to pick a random audio file
    Random random = Random();
    int randomIndex = random.nextInt(audioFiles.length);

    try {
      // Stop the currently playing audio, if any
      if (isAudioPlaying) {
        await collisionAudioPlayer.stop();
      }

      // Play the randomly selected collision audio
      await collisionAudioPlayer.play(AssetSource(audioFiles[randomIndex]));
      isAudioPlaying = true;

      // Stop the audio after 7 seconds
      Timer(Duration(seconds: 7), () {
        collisionAudioPlayer.stop();
        isAudioPlaying = false;
      });
    } catch (e) {
      print("Collision audio playback error: $e");
    }
  }

  void resetGame() {
    setState(() {
      // Stop the collision audio if it's playing
      if (isAudioPlaying) {
        collisionAudioPlayer.stop();
        isAudioPlaying = false;
      }

      // Reset game variables
      bubbleYAxis = 0;
      time = 0;
      height = 0;
      initialHeight = 0;
      gameHasStarted = false;
      barrierXone = 1;
      barrierXtwo = barrierXone + 1.5;
      if (score > bestScore) {
        bestScore = score;
      }
      score = 0;
      showBurst = false;
      barrierGap = 0.4; // Reset gap
      barrierHeightOne = 300.0; // Reset barrier heights
      barrierHeightTwo = 300.0;
      horizontalDistance = 1.5; // Reset horizontal distance
    });
  }

  void startGame() async {
    gameHasStarted = true;

    // List of audio file paths
    List<String> audioFiles = [
      'audios/aaj-tak-music-part-1-made-with-Voicemod.mp3',
      'audios/gadi-wala-aaya-ghar-se-kachra-nikal-47472.mp3',
      'audios/ammi-bacha-la-re_nC230lBU.mp3'
    ];

    // Shuffle the audio files to create a random order
    audioFiles.shuffle();

    // Function to play audio files in sequence
    Future<void> playAudioSequence() async {
      for (String audioFile in audioFiles) {
        if (!gameHasStarted) break; // Stop playing if the game ends
        try {
          await audioPlayer.play(AssetSource(audioFile));
          await audioPlayer
              .onPlayerComplete.first; // Wait for the audio to finish
        } catch (e) {
          print("Audio playback error: $e");
        }
      }
      if (gameHasStarted) {
        playAudioSequence(); // Restart the sequence if the game is still running
      }
    }

    // Start playing the audio sequence
    playAudioSequence();

    // Game loop
    gameTimer = Timer.periodic(Duration(milliseconds: 50), (timer) {
      time += 0.04;
      height = -4.9 * time * time + 2.8 * time;
      setState(() {
        bubbleYAxis = initialHeight - height;
      });

      // Update barrier positions and heights
      setState(() {
        if (barrierXone < -1.5) {
          barrierXone += 3.0;
          score++;

          // Randomize height and gap for barrier one
          barrierHeightOne = random.nextDouble() * 200 +
              200; // Random height between 200 and 400
          barrierGap =
              max(0.2, 0.4 - score * 0.01); // Reduce gap as score increases

          // Randomize horizontal distance
          horizontalDistance = random.nextDouble() * 0.5 +
              1.2; // Random distance between 1.2 and 1.7
        } else {
          barrierXone -= 0.05;
        }
      });

      setState(() {
        if (barrierXtwo < -1.5) {
          barrierXtwo = barrierXone +
              horizontalDistance; // Use randomized horizontal distance
          score++;

          // Randomize height and gap for barrier two
          barrierHeightTwo = random.nextDouble() * 200 +
              200; // Random height between 200 and 400
          barrierGap =
              max(0.2, 0.4 - score * 0.01); // Reduce gap as score increases
        } else {
          barrierXtwo -= 0.05;
        }
      });

      if (checkCollision()) {
        timer.cancel();
        gameHasStarted = false;

        // Stop audio when the game ends
        audioPlayer.stop();

        setState(() {
          showBurst = true;
        });
      }
    });
  }

  void jump() {
    setState(() {
      time = 0;
      initialHeight = bubbleYAxis;
    });
  }

  @override
  void dispose() {
    gameTimer?.cancel();
    audioPlayer.dispose(); // Dispose the audio player
    collisionAudioPlayer.dispose(); // Dispose the collision audio player
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        if (gameHasStarted) {
          jump();
        } else {
          startGame();
        }
      },
      child: Scaffold(
        body: Container(
          decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/images/background.jpg'),
              fit: BoxFit.cover,
            ),
          ),
          child: Column(
            children: [
              Expanded(
                flex: 3,
                child: Stack(
                  children: [
                    if (!showBurst)
                      AnimatedContainer(
                        alignment: Alignment(0, bubbleYAxis),
                        duration: Duration(milliseconds: 0),
                        child: MyBubble(),
                      ),
                    if (showBurst)
                      AnimatedContainer(
                        alignment: burstPosition,
                        duration: Duration(milliseconds: 0),
                        child: BurstAnimation(
                          onComplete: () {
                            setState(() {
                              showBurst = false;
                              showGameOverDialog();
                            });
                          },
                        ),
                      ),
                    Container(
                      alignment: Alignment(0, -0.3),
                      child: gameHasStarted
                          ? Text("")
                          : Text(
                              "TAP TO PLAY",
                              style: TextStyle(
                                fontSize: 25,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                    ),
                    AnimatedContainer(
                      alignment: Alignment(barrierXone, 1.1),
                      duration: Duration(milliseconds: 0),
                      child: CactusBarrier(
                        size: barrierHeightOne,
                        isUpsideDown: false,
                        showCactus: false,
                      ),
                    ),
                    AnimatedContainer(
                      alignment: Alignment(barrierXone, -1.1),
                      duration: Duration(milliseconds: 0),
                      child: CactusBarrier(
                        size: barrierHeightOne,
                        isUpsideDown: true,
                        showCactus: true,
                      ),
                    ),
                    AnimatedContainer(
                      alignment: Alignment(barrierXtwo, 1.1),
                      duration: Duration(milliseconds: 0),
                      child: CactusBarrier(
                        size: barrierHeightTwo,
                        isUpsideDown: false,
                        showCactus: true,
                      ),
                    ),
                    AnimatedContainer(
                      alignment: Alignment(barrierXtwo, -1.1),
                      duration: Duration(milliseconds: 0),
                      child: CactusBarrier(
                        size: barrierHeightTwo,
                        isUpsideDown: true,
                        showCactus: false,
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                height: 15,
                color: Colors.green,
              ),
              Expanded(
                child: Container(
                  color: Colors.brown,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            "SCORE",
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 20),
                          Text(
                            "$score",
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 35,
                              fontWeight: FontWeight.bold,
                            ),
                          )
                        ],
                      ),
                      Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            "BEST",
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 20),
                          Text(
                            "$bestScore",
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 35,
                              fontWeight: FontWeight.bold,
                            ),
                          )
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
