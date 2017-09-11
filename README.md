# deep-comparison  

## Install  
`npm install deep-comparison`  
## Features  
- Object deep clone  
- Objects deep comparison  
## Usages  
```javascript
import { deepClone, isEqual } from 'deep-comparison';
const a = { name: 'John', age: 22 };
const b = deepClone(a);
isEqual(a, b); // true
```  
## License  
MIT