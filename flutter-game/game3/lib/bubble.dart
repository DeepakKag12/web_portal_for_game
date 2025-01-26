// import 'package:flutter/foundation.dart';
// import 'package:flutter/material.dart';

// class MyBubble extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       height: 90,
//       width: 90,
//       decoration:
//           BoxDecoration(shape: BoxShape.circle, color: Colors.transparent),
//       child: ClipOval(
//         child: kIsWeb
//             ? Image.asset(
//                 'assets/images/lets.png', // Replace with your hosted GIF URL
//                 fit: BoxFit.cover,
//               )
//             : Image.asset(
//                 'assets/images/bubble3.gif',
//                 fit: BoxFit.cover,
//               ),
//       ),
//     );
//   }
// }

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class MyBubble extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 90,
      width: 90,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: Colors.transparent,
      ),
      child: ClipOval(
        child: kIsWeb
            ? Image.asset(
                'assets/images/lets.png',
                fit: BoxFit.cover,
              )
            : Image.asset(
                'assets/images/bubble3.gif',
                fit: BoxFit.cover,
              ),
      ),
    );
  }
}
