![CF](https://i.imgur.com/7v5ASc8.png)  String Manipulation
=======
## Overview

`includes` - Does a string include another?
```
  let str = "My instructors shred";
  str.includes('uct'); // true
```

`substr` - Returns part of a string between indexes
```
  let str = "My instructors shred";
  str.substring(0,2); // My
```

`charAt` - Returns the character at an indexed position
```
  let str = "My instructors shred";
  str.charAt(0); // M
```

`charCodeAt` - Returns the ASCII Code of a character
```
  let str = "My instructors shred";
  str.charCodeAt(0); // 77
  
  'A'.charCodeAt(0); // 65
  
```

`fromCharCode` - Returns a letter from ASCII Code
```
  String.fromCharCode(77); // M
```


## Reference and Resources
* [Strings at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
