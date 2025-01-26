// import 'package:flutter/material.dart';

// class BurstAnimation extends StatefulWidget {
//   final VoidCallback onComplete;

//   const BurstAnimation({Key? key, required this.onComplete}) : super(key: key);

//   @override
//   _BurstAnimationState createState() => _BurstAnimationState();
// }

// class _BurstAnimationState extends State<BurstAnimation>
//     with SingleTickerProviderStateMixin {
//   late AnimationController _controller;
//   late Animation<double> _scaleAnimation;
//   late Animation<double> _opacityAnimation;

//   @override
//   void initState() {
//     super.initState();
//     _controller = AnimationController(
//       // Increased duration to 800ms for a slower animation
//       duration: const Duration(milliseconds: 800),
//       vsync: this,
//     );

//     // Increased scale from 2.0 to 3.0 for larger burst
//     _scaleAnimation = Tween<double>(begin: 1.0, end: 3.0).animate(
//       CurvedAnimation(
//         parent: _controller,
//         // Using easeOutCubic for smoother animation
//         curve: Curves.easeOutCubic,
//       ),
//     );

//     _opacityAnimation = Tween<double>(begin: 1.0, end: 0.0).animate(
//       CurvedAnimation(
//         parent: _controller,
//         // Adjusted curve for better fade out
//         curve: Curves.easeIn,
//       ),
//     );

//     _controller.addStatusListener((status) {
//       if (status == AnimationStatus.completed) {
//         widget.onComplete();
//       }
//     });

//     _controller.forward();
//   }

//   @override
//   void dispose() {
//     _controller.dispose();
//     super.dispose();
//   }

//   @override
//   Widget build(BuildContext context) {
//     return AnimatedBuilder(
//       animation: _controller,
//       builder: (context, child) {
//         return Container(
//           width: 100, // Added container with fixed width
//           height: 100, // and height for better positioning
//           child: Opacity(
//             opacity: _opacityAnimation.value,
//             child: Transform.scale(
//               scale: _scaleAnimation.value,
//               child: Stack(
//                 alignment: Alignment.center,
//                 children: [
//                   // Center circle
//                   Container(
//                     width: 20,
//                     height: 20,
//                     decoration: BoxDecoration(
//                       color: Colors.white,
//                       shape: BoxShape.circle,
//                     ),
//                   ),
//                   // Burst particles
//                   ...List.generate(12, (index) {
//                     return Transform.rotate(
//                       angle: index * 3.14159 / 6, // 12 particles instead of 8
//                       child: Container(
//                         width: 25, // Increased width
//                         height: 4, // Increased height
//                         margin: EdgeInsets.all(10),
//                         decoration: BoxDecoration(
//                           color: Colors.white,
//                           borderRadius: BorderRadius.circular(5),
//                           // Added shadow for better visibility
//                           boxShadow: [
//                             BoxShadow(
//                               color: Colors.white.withOpacity(0.5),
//                               spreadRadius: 2,
//                               blurRadius: 3,
//                             ),
//                           ],
//                         ),
//                       ),
//                     );
//                   }),
//                   // Additional smaller particles for more detail
//                   ...List.generate(8, (index) {
//                     return Transform.rotate(
//                       angle: index * 3.14159 / 4 + 0.4,
//                       child: Container(
//                         width: 15,
//                         height: 3,
//                         margin: EdgeInsets.all(15),
//                         decoration: BoxDecoration(
//                           color: Colors.white.withOpacity(0.7),
//                           borderRadius: BorderRadius.circular(5),
//                         ),
//                       ),
//                     );
//                   }),
//                 ],
//               ),
//             ),
//           ),
//         );
//       },
//     );
//   }
// }

import 'package:flutter/material.dart';

class BurstAnimation extends StatefulWidget {
  final VoidCallback onComplete;

  const BurstAnimation({Key? key, required this.onComplete}) : super(key: key);

  @override
  _BurstAnimationState createState() => _BurstAnimationState();
}

class _BurstAnimationState extends State<BurstAnimation>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  late Animation<double> _opacityAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );

    _scaleAnimation = Tween<double>(begin: 1.0, end: 3.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Curves.easeOutCubic,
      ),
    );

    _opacityAnimation = Tween<double>(begin: 1.0, end: 0.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Curves.easeIn,
      ),
    );

    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        widget.onComplete();
      }
    });

    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Container(
          width: 100,
          height: 100,
          child: Opacity(
            opacity: _opacityAnimation.value,
            child: Transform.scale(
              scale: _scaleAnimation.value,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Container(
                    width: 20,
                    height: 20,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
                    ),
                  ),
                  ...List.generate(12, (index) {
                    return Transform.rotate(
                      angle: index * 3.14159 / 6,
                      child: Container(
                        width: 25,
                        height: 4,
                        margin: EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(5),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.white.withOpacity(0.5),
                              spreadRadius: 2,
                              blurRadius: 3,
                            ),
                          ],
                        ),
                      ),
                    );
                  }),
                  ...List.generate(8, (index) {
                    return Transform.rotate(
                      angle: index * 3.14159 / 4 + 0.4,
                      child: Container(
                        width: 15,
                        height: 3,
                        margin: EdgeInsets.all(15),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.7),
                          borderRadius: BorderRadius.circular(5),
                        ),
                      ),
                    );
                  }),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
