// import 'package:flutter/material.dart';

// class CactusBarrier extends StatelessWidget {
//   final double size;
//   final bool isUpsideDown;

//   CactusBarrier({required this.size, this.isUpsideDown = false});

//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       width: 100,
//       height: size,
//       decoration: BoxDecoration(
//         color: Colors.transparent,
//       ),
//       child: Transform(
//         alignment: Alignment.center,
//         transform: Matrix4.rotationZ(isUpsideDown ? 3.14159 : 0),
//         child: Center(
//           child: Text(
//             '🌵',
//             style: TextStyle(
//               fontSize: 80,
//               color: Colors.green.shade800,
//               height: 1.0,
//             ),
//           ),
//         ),
//       ),
//     );
//   }
// }

// import 'package:flutter/material.dart';

// class CactusBarrier extends StatelessWidget {
//   final double size;
//   final bool isUpsideDown;

//   CactusBarrier({required this.size, this.isUpsideDown = false});

//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       width: 150, // Keep the width consistent for collision detection
//       height: 170,
//       child: Transform(
//         alignment: Alignment.center,
//         transform: Matrix4.rotationX(isUpsideDown ? 3.14159 : 0),
//         child: Image.asset(
//           'assets/images/pitcher_plant.gif', // Path to your GIF asset
//           fit: BoxFit.cover,
//         ),
//       ),
//     );
//   }
// }

import 'package:flutter/material.dart';

class CactusBarrier extends StatelessWidget {
  final double size;
  final bool isUpsideDown;
  final bool showCactus; // Determines which widget to display

  CactusBarrier({
    required this.size,
    this.isUpsideDown = false,
    this.showCactus = true, // Default to showing the cactus
  });

  @override
  Widget build(BuildContext context) {
    if (showCactus) {
      // Return the cactus emoji widget
      return Container(
        width: 100,
        height: size,
        decoration: BoxDecoration(
          color: Colors.transparent,
        ),
        child: Transform(
          alignment: Alignment.center,
          transform: Matrix4.rotationZ(isUpsideDown ? 3.14159 : 0),
          child: Center(
            child: Text(
              '🌵',
              style: TextStyle(
                fontSize: 80,
                color: Colors.green.shade800,
                height: 1.0,
              ),
            ),
          ),
        ),
      );
    } else {
      // Return the pitcher plant GIF widget
      return Container(
        width: 150, // Keep the width consistent for collision detection
        height: 170,
        child: Transform(
          alignment: Alignment.center,
          transform: Matrix4.rotationX(isUpsideDown ? 3.14159 : 0),
          child: Image.asset(
            'assets/images/pitcher_plant.gif', // Path to your GIF asset
            fit: BoxFit.cover,
          ),
        ),
      );
    }
  }
}
