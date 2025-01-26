// import 'package:flutter/material.dart';

// class MyBarrier extends StatelessWidget {
//   final double size;

//   MyBarrier({required this.size});

//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       width: 80,
//       height: size,
//       decoration: BoxDecoration(
//         color: Colors.green,
//         border: Border.all(
//           width: 10,
//           color: const Color.fromARGB(255, 28, 69, 29),
//         ),
//         borderRadius: BorderRadius.circular(10),
//       ),
//     );
//   }
// }

import 'package:flutter/material.dart';

class MyBarrier extends StatelessWidget {
  final double size;

  MyBarrier({required this.size});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 80,
      height: size,
      decoration: BoxDecoration(
        color: Colors.green,
        border: Border.all(
          width: 10,
          color: const Color.fromARGB(255, 28, 69, 29),
        ),
        borderRadius: BorderRadius.circular(10),
      ),
    );
  }
}
