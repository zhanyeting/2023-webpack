import { add, minus } from './math';
import './math';   // 自己写的模块，如果没被使用，就会tree-shaking 掉

// 库文件，只要导入了，即使没使用，也不会 tree-shaking 掉
// /*#__PURE__*/import 'lodash';   
//  import _ from 'lodash';
import {join} from 'lodash';


import './index.css';


import "./common.global";
import "./global";

// console.log(add(9,8));
console.log(100)