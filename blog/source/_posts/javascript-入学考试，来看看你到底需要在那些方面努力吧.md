---
title: javascript 入学考试，来看看你到底需要在那些方面努力吧~
date: 2020-08-02 17:19:23
tags:
---

> 须知：每道题的完成时间最多1分钟。请自觉按照时间记录答案。

下面一共有18道前端题目，每道题目限时1分钟（其实大部分题目限时少于1分钟），答对12道以上的同学视为优秀。

下面的题目为全英文题目，但是也只需要小学英语知识就足够了。

话不多说，直接开始吧~




![](https://user-gold-cdn.xitu.io/2020/7/11/1733e5f2fa06c7f7?w=225&h=225&f=png&s=31081)



#### 1. What is one function you can use to determine whether a value is an illegal number or not?

A: NaN()

B: isNaN()

C: isNumber()

D: parseFloat()


#### 2. The following function never prints "bar" to the console, despite what is passed into the function. Why?

```javascript
function foo(x) {
  if (x = undefined) {
    console.log('foo');
  } else if (x == false) {
    console.log('bar');
  } else {
    console.log('baz');
  }
}
```

A: The first condition expression overwrites `x`.

B: The second condition expression overwrites `x`.

C: `x` can never be false because it's a function argument.

D: The first condition expression handles everything that the second would.


#### 3. What primitive type is the variable `result`?

`const result = NaN`

A: Number

B: Boolean

C: Symbol

D: String


#### 4. After the following code is executed, what is printed to the console?

```javascript
function list() {  
  return [].slice.call(arguments);
}
var leadingThirtysevenList = list.bind(null, 37);
var list2 = leadingThirtysevenList();
console.log(list2);
```

A: null

B: [37]

C: []

D: undefined

#### 5. How would you instantiate an object for the date January 2, 2000?

A: `let d = new Date();` the internal representation of a date is the number of milliseconds since January 2, 2000

B: `let d = new Date(1, 2, 2000);`

C: `let d = new Date(2000, 2, 1);`

D: `let d = new Date(2000, 0, 2);`


#### 6. Given the following:

`console.log(iterator1.next().value); // ["0", "foo"]`

Which snippet will set up iterator1 for the above behavior?

A: `let map1 = new Map();const iterator1 = map1.entries();map1.set('0', 'foo');`

B: `let map1 = new Map();const iterator1 = map1.keys();map1.set('0', 'foo');`

C: `let map1 = Map();const iterator1 = map1.items();map1.set('0', 'foo');`

D: `let map1 = new Map();const iterator1 = map1.get();map1.set('0', 'foo');`

#### 7. What static method defines setters, getters, and other configurations for a new or existing property on an object?

A: `Object["setProperty"]()`

B: `Object.prototype.Property()`

C: `Property.declare()`

D: `Object.defineProperty()`

#### 8. Given a complex object, foo, with keys that are not known ahead of time, how can you check if a given key, "k", is in the object without iterating through the whole object?

A: `...foo == k`

B: `foo contains k`

C: `"k" in foo`

D: `foo.apply(k)`


#### 9. Given that the sine of 90 degrees is 1, what is the result of the code below?`let foo = Math.sin(90);`

A: `1`

B: A ReferenceError will be thrown; the trigonometry functions are meant to be called at a global scope:`let foo = sin(90)`

C: A ValueError will be thrown; `Math.sin()` expects a second argument specifying degrees or radians

D: Not 1, because `Math.sin()` expects the parameter to be in radians


#### 10. What happens when an object inherits from another object using `Object.create()`?

A: A copy of the old object is created, and the constructor is used to construct the new object.

B: The prototype chain for the original object is given to the new object, giving a reference of and access to all of the original object properties.

C: One by one, the object's properties are copied over to the new object.

D: The new object is given a reference to the original object's constructor, which allows the new object to create a new prototype chain.


#### 11. How can you remove all of the items within an array?

A: `let arr = [‘hello’, ‘world’];
arr.length = 0;`

B: `var arr = [‘hello’, ‘world’];
arr.empty();`

C: `var arr = [‘hello’, ‘world’];
arr.remove(2);`

D: `var arr = [‘hello’, ‘world’];
arr.toShortList();`

#### 12. What is wrong with this snippet?
```javascript
class MegaArray extends Array{
  constructor(contents){
    this.contents = contents;
  }
}
let mArr = new MegaArray(1, 2, 3);
```

A: The class constructor does not call `parent()`.

B: Classes both cannot inherit built-in types and must pass constructor arguments to the parent's constructor using `super()`.

C: The class constructor does not call `super()`, so `this` is not defined when inheriting from `Array`.

D: Classes cannot inherit from built-in types.

#### 13. Which code snippet correctly shows unpacking the arguments object into an array?

A: `Array.toArray(arguments)`

B: `[arguments]`

C: `arguments.toArray()`

D: `Array.from(arguments)`


#### 14. The following snippet throws an error. Why?


```javascript
function foo() {
  'use strict';
  (function () {
    var point = {x: 42, y: 27};
    with (point) {
      console.log('The coordinates are: x: ', x, 'y: ', y);
    }
  })();
}
foo();
```

A: You cannot use immediately invoked function expressions (IIFEs) in strict mode

B: You cannot add the `'use strict'`; directive in a function

C: You cannot declare object literals in strict mode

D: You cannot use `with` statements in strict mode


#### 15. When inheriting from a parent class, what does the `super` keyword do in the child's constructor?

A: `super` invokes the parent's constructor, and by extension, defines the lexical context and this object for the child class.

B: `super` instantiates the parent class and deep copies the properties over to the child class.

C: `super` invokes the parent constructor, and then performs a deep copy of the parent properties over to the child class to make a wholly new object.

D: `super` instantiates the parent class and copies the properties over as virtual properties on the child class.

#### 16. What does this print to the console and why?


```javascript
function Foo() {}
function Bar() {}
Bar.prototype = Object.create(Foo.prototype);

let banana = new Bar();
let apple = new Foo();

console.log(Bar.prototype.isPrototypeOf(apple));
console.log(Bar.prototype.isPrototypeOf(banana));
console.log(Foo.prototype.isPrototypeOf(banana));
```

A: `ReferenceError` will be thrown

B: `true`, `true`, `true`

C: `true`, `true`, `false`

D:  `false`, `true`, `true`

#### 17. What is printed to the console in the following code snippet?


```javascript
let foo = () => {
    console.log("User1");
    return false;
}
let bar = () => {
    console.log("User2");
    return true;
}
let x = false || bar() || foo();
```

A: `undefined`

B: `User2` `User1`

C: `User1` `User2`

D: `User2`

#### 18. After the following code is executed, what is printed to the console?


```javascript
let map1 = new Map();
map1.set('0', 'foo');
map1.set(1, 'bar');
const iterator1 = map1.entries();
console.log(iterator1.next().value);
```

A: `"0"`

B: `"foo"`

C: `["0", "foo"]`

D: `["foo"]`



各位同学，上面的题目怎么样是不是很简单啊~

下面公布答案：

BAABD ADCDB ACDDA DD


你答对了多少呢？


![](https://user-gold-cdn.xitu.io/2020/7/11/1733e5e90e78fe54?w=300&h=225&f=png&s=32948)

请按照时间要求，自觉答题，并把你的分数写在评论里吧~

欢迎讨论问题！

