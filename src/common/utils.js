export function slice(...args) {
  return Array.prototype.slice.call(...args);
}

/**
* 转换成String
* @export
* @param {*} n
* @returns {String}
*/
export function toString(s) {
  return Object.prototype.toString.call(s);
}

/**
* 判断是否Number
* @export
* @param {Numer} n
* @returns {Boolean}
*/
export function isNumber(n){
  return toString(n) === "[object Number]" && !isNaN(n);
}

/**
* 判断是否字符串
* @export
* @param {String} str
* @returns {Boolean}
*/
export function isString(str){
  return toString(str) === "[object String]";
}

/**
* 判断是否函数
* @export
* @param {function} func
* @returns {Boolean}
*/
export function isFunction(func){
  return toString(func) === "[object Function]";
}

/**
* 判断是否数组
* @export
* @param {function} func
* @returns {Boolean}
*/
export function isArray(func){
  return toString(func) === "[object Array]";
}

/**
* 判断是否普通对象
*
* @export
* @param {Object} o
* @returns {Boolean}
*/
export function isObject(o) {
  return toString(o) === '[object Object]' && o.constructor instanceof Object;
}

/**
*
* 对象属性值是否为空
* @export
* @param {Object} o
* @returns
*/
export function isEmptyObject(o) {
  for (let p in o)
      return !1;
  return !0;
}

/**
* 判断是否Date是否有效
* @export
* @param {Date Object} date
* @returns {Boolean}
*/
export function isDateValid(date) {
if (date instanceof Date) {
  return !isNaN(date.getTime());
} else {
  return false;
}
}

/**
* 小于10的数字增加前缀0
* @export
* @param {Numer} n
* @returns {String}
*/
export function zeroPrefix(num) {
  if (!isNumber(num) || num < 0) {
      return '';
  }

  return num >= 10 ? `${num}` : `0${num}`;
}

/**
* 日期格式化函数
* 占位符(2017-03-01 12:30:45)：
* YYYY: 2017
* YY: 17
* MM: 03
* DD: 01
* HH: 12
* mm: 30
* ss: 45
* @export
* @param {Date|Number|String} date
* @param {String} format 格式
* @returns {Boolean}
*/
export function dateFormat(date, format = '') {
  const oDate = new Date(date);
  let str = '';

  if (isDateValid(oDate) && isString(format)) {
      const year = oDate.getFullYear();
      const month = zeroPrefix(oDate.getMonth() + 1);
      const day = zeroPrefix(oDate.getDate());
      const hours = zeroPrefix(oDate.getHours());
      const minutes = zeroPrefix(oDate.getMinutes());
      const seconds = zeroPrefix(oDate.getSeconds());

      str = format.replace(/yyyy/g, year);
      str = str.replace(/yy/g, String(year).slice(-2));
      str = str.replace(/MM/g, month);
      str = str.replace(/dd/g, day);
      str = str.replace(/HH/g, hours);
      str = str.replace(/mm/g, minutes);
      str = str.replace(/ss/g, seconds);
  }

  return str;
}

export function getDayTimestamp(source) {
  const oDate = new Date(source);

  if (!isDateValid(oDate)) {
      return 0;
  }

  return new Date(`${dateFormat(oDate, 'yyyy/MM/dd')}`).getTime();
}

export function getDateWidthDayOffset(offset) {
  const oDate = new Date();

  if (isNumber(offset) && offset !== 0) {
      oDate.setDate(oDate.getDate() + offset);
  }

  return oDate;
}

/**
* 判断两个时间点的大小
* @export
* @param {String} timeA - 第一个时间段 A（01:01）
* @param {String} timeB - 第一个时间段 B（11:11）
* @returns {String} 较大值
*/
export function maxTime(timeA, timeB) {
  let A = timeA.split(':')[0]*100 + timeA.split(':')[1]*1
  let B = timeB.split(':')[0]*100 + timeB.split(':')[1]*1

  return A>B?timeA:timeB
}

/**
* 判断两个时间段是否有重叠
* @export
* @param {Object} timeA - 第一个时间段 A
* @param {number} timeA.start - 时间段 A 开始时间
* @param {number} timeA.start - 时间段 A 结束时间
*
* @param {Object} timeB - 第一个时间段 B
* @param {number} timeB.start - 时间段 B 开始时间
* @param {number} timeB.start - 时间段 B 结束时间
* 
* @returns {Boolean} 
*/
export function timeIsOverlap(timeA, timeB) {
  let A1 = timeA.start;
  let A2 = timeA.end;
  let B1 = timeB.start;
  let B2 = timeB.end; 

  // 不重叠的场景： [A1, A2, B1, B2]、[B1, B2, A1, A2]
  return !(B1 == maxTime(A2, B1) || A1 == maxTime(B2, A1));
}

/**
 * 判断两个对象是否相等
 * 浅度判断：
 *      1.只判断obj的第一层属性总数是否一样
 *      2.值的===判断是否为真
 * 深度判断：
 *      值为对象，参考本规则
 *      值为数组，参考equalArray的深度判断
 *      值为其他类型，用===判断
 * @param  {[type]} obj1
 * @param  {[type]} obj2
 * @param  {[type]} deepCheck
 * @return {[type]}
 */
export function equalObject (obj1, obj2, deepCheck) {
  if (obj1 === obj2) {
      return true;
  };
  // 属性总数不等，直接返回false
  var size1 = 0;
  for (var key in obj1){
      size1++;
  }
  var size2 = 0;
  for (var key in obj2){
      size2++;
  }
  if (size1 !== size2) {
      return false;
  };
  
  if (!deepCheck) { // 浅度判断
      for (var key in obj1){
          if (obj1[key] !== obj2[key]) {
              return false;
          };
      }
      return true;
  };
  var type1,type2;
  for (var key in obj1){
      type1 = type(obj1[key]);
      type2 = type(obj2[key]);
      if (type1 !== type2) {
          return false;
      };
      if (type1 === "Object") {
          if (!equalObject(obj1[key], obj2[key], true)) {
              return false;
          };
      }else if (type1 === "Array") {
          if (!equalArray(obj1[key], obj2[key],true)) {
              return false;
          };
      }else if (obj1[key] !== obj2[key]) {
          return false;
      };
  }
  return true;

}
/**
 * 判断两个数组是否相等
 * 浅度相等：两数组toString一样
 * 深度相等的判断规则：
 *   1.长度相等
 *   2.俩数组的每一项：
 *      若为数组：参考本函数规则。
 *      若为对象：参考equalObject的规则。
 *      其他的数据类型，要求===判断为true
 * @param  {[type]} arr1
 * @param  {[type]} arr2
 * @param  {[type]} deepCheck
 * @return {[type]}
 */
export function equalArray (arr1, arr2, deepCheck) {
  if (arr1 === arr2) {
      return true;
  };
  // 长度不等，不用继续判断
  if (arr1.length !== arr2.length) {
      return false;
  };
  // 浅度检查
  if (!deepCheck) {
      return arr1.toString() === arr2.toString();
  };
  // 判断每个基本数据类型是否一样
  var type1, type2; // 数组每一项的数据类型
  for (var i = 0; i < arr1.length; i++) {
      type1 = type(arr1[i]);
      type2 = type(arr2[i]);

      // 数据类型不一样，无需判断
      if (type1 !== type2) {
          return false;
      };

      if (type1 === "Array") {
          if (!equalArray(arr1[i], arr2[i], true)) {
              return false;
          };
      }else if (type1 === 'Object') {
          if (!equalObject(arr1[i], arr2[i], true)) {
              return false;
          };
      }else if (arr1[i] !== arr2[i]) {
          return false;
      };

  };
  return true;
}
export function ObjCopy(obj){
    var newobj = {};
    for ( var attr in obj) {
        newobj[attr] = obj[attr];
    }
    return newobj;
}

export function currencyDisplay (val) {
    if(isString(val)){
        val = parseFloat(val);
    }
    if (!val) {
        return '￥0' ;
    }
    return `￥${val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export function percentDisplay (val) {
    if (val === 0) {
        return '0%' ;
    } 
    else if (val === 1) {
        return '100%';
    }
    else {
        return `${(val * 100).toFixed(3).slice(0, -1)}%`;
    }
}

export function sexDisplay (val) {
    if (val === 1){
        return '男';
    } else if(val === 0){
        return '女';
    } else{
        return '未知';
    }
}
