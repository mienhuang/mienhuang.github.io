---
title: 300秒写出高质量的代码
---


> hello, 各位亲爱的小伙伴，大家好啊~

不知道大家有没有遇到组内的小朋友，写的代码不规范，不是最好的写法，而且有很多很糟糕的写法。那么就把这篇文章分享给TA吧~

我们今天来列举一下场景下的代码如何才能做到高可读性和高维护性。

### log

我想对于打印日志，大家肯定都不陌生。但是你写的日志输出真的是最优秀的吗？

举例：

我有三只猫咪~

```javascript
const cat1 = { name: '小美妞', age: 2, color: 'orange' };
const cat2 = { name: '大黑蛋', age: 2, color: 'black' };
const cat3 = { name: '小老虎', age: 2, color: 'orange' };
```

如果我想看一下这三只猫咪的信息，怎么写？

```javascript
// 'Bad Code 💩'
// 是这样？
console.log(cat1);
console.log(cat2);
console.log(cat3);

//还是这样？
console.log(cat1, cat2,cat3);
```

我们先看下输出结果。

![](https://user-gold-cdn.xitu.io/2020/5/13/1720d8a2b87b02e8?w=1000&h=269&f=png&s=27545)


这个输出结果并不能让我们很直观的对应到变量上，而且如果我们在控制台看到这个信息也多半是一脸懵逼。

那正确的写法是什么呢？

```javascript
// 'Good Code ✅'
console.log('%c My Cats ----->', 'color: orange; font-weight: bold;')
console.log({ cat1, cat2, cat3 });
```


![](https://user-gold-cdn.xitu.io/2020/5/13/1720d8ed67b4528e?w=1001&h=261&f=png&s=24374)

我们来看一下这个简单的改动，看上去只是把他们放到了一个对象内部，但是最直观的好处就是，我们有了内容和变量的对应关系。


如果我们要打印一个数组对象，那另外一个选择也非常不错。

那就是table,这样能非常清楚的展示数据内容。

```javascript
console.table([cat1, cat2, cat3]);
```


![](https://user-gold-cdn.xitu.io/2020/5/13/1720d965664d03b5?w=1004&h=293&f=png&s=25702)

### 循环

举例：

```javascript
const catsWeight = [3000, 4900, 5200];
```

我的三只猫的重量，分别是3000g, 4900g和5200g。我想要的是计算三只猫的总重量，和那几只猫太胖了，超过了4500g,以及他们如果都减肥一半的体重是多少。

```javascript
'Bad Loop Code 💩'

const totalWeight = 0;
const overWeightCats = [];
const reduceHalf = [];
for (i = 0; i < catsWeight.length; i++) { 
    totalWeight += catsWeight[i];
    if (catsWeight[i] > 4500) {
        overWeightCats.push(catsWeight[i])
    }
    reduceHalf.push(catsWeight[i] / 2);
}
```


```javascript
'Good Loop Code ✅'

// Reduce
const totalWeight = catsWeight.reduce((acc, cur) => acc + cur)

// Map
const reduceHalf = catsWeight.map(c => c / 2)

// Filter
const overWeightCats = catsWeight.filter(c => c > 4500);
```

再比如，如果我想知道，有没有猫咪超过5000g,我只想知道有还是没有，并不关心是那一只。

```javascript

const hasCatWeightOver5000 = catsWeight.some(c => c > 5000);

```

再再比如，我不知道我的猫吃的是不是好，体重是不是都超过了3000g.

```javascript
const allCatsOver3000 = catsWeight.every(c => c > 3000);
```

所以，我们在遇到循环问题的时候，总不能一个For走天下是不是。虽然它确实好用。

再有就是，我个人喜欢纯函数，和单一功能性的函数。这样的函数条理清晰，可读性更高。


### 对象属性读取

举例：

我有一只猫咪，名字叫大黑！

```javascript
const cat = {
    name: '大黑',
    legs: 4,
    type: '中华田园猫',
    age: 2,
    color: 'black'
}
```

我想打印这只猫的信息

```javascript
// 'Bad Code 💩'
function logInfo(cat) {
    return `我的猫名字是${cat.name}，它有${cat.legs}条腿，它今年${cat.age}岁了，它是一只${cat.color}颜色的${cat.type}`;
}
```

```javascript
// 'Good Code ✅'

function logInfo({ name, legs, type, age, color }) {
    return `我的猫名字是${name}，它有${legs}条腿，它今年${age}岁了，它是一只${color}颜色的${type}`;
}
// OR
function logInfo(cat) {
    const { name, legs, type, age, color } = cat;
    return `我的猫名字是${name}，它有${legs}条腿，它今年${age}岁了，它是一只${color}颜色的${type}`;
}
```

其实上面的例子还涵盖到了一个写法，那就是`${}`

```javascript
const { name, legs, type, age, color } = cat;
const catInfo = '我的猫名字是'+name+'它今年'+age+'岁了!'
```

这种写法，在我们的日常代码中应该也非常常见。

所以是时候换一种写法了哦~


### 新增属性和对象拷贝

举例：

我有一只猫咪，名字叫小美妞！

```javascript
const cat = {
    name: '小美妞',
    legs: 4,
    type: '中华田园猫',
    age: 2,
    color: 'orange'
}
```

如果我想得到一个新的对象也包含这只猫的所有信息。

之前的做法是：

```javascript
const newCat = Object.assign({}, cat);
```

在之前，我们确实没有更好的写法。但是现在我们有了~

```javascript
const newCat = {...cat};
```

如果我想给我的猫加一个信息性别！

之前的做法是：

```javascript
cat = Object.assign(cat, { genda: 'male' });
// OR

cat.genda = 'male';
```

现在我们可以这样

```javascript
cat = {...cat,  genda: 'male' };
```

### 数组值的读取

举例：

我有三只猫

```javascript
const cats = ['大黑', '小美妞', '小老虎']; 
```
我想知道第一只和第二只分别是谁。

```javascript
// 'Bad Code 💩'
const first = cats[0];
const second = cats[1];
```

下面的写法是推荐的

```javascript
// 'Good Code ✅'
const [first, second, ...rest] = cats;
```

假如有一天我又养了两只猫

```javascript
// 'Bad Code 💩'
cats.push('newCat1');
cats.push('newCat2');
```

下面的写法是推荐的

```javascript
// 'Good Code ✅'
cats = [...cats, 'newCat1', 'newCat2'];
```

### Promise

举例：

我有三只猫咪，每天都要派发小鱼干。但是发小鱼干是一个异步的工作。

```javascript
const distribute = (name) => Promise.resolve(`${name} 拿到小鱼干了！`);
const start = () => Promise.resolve('开始');
```

```javascript
// 'Bad Code 💩'
start()
.then(() => {
    return distribute('大黑');
})
.then(() => {
    return distribute('小美妞');
})
.then(() => {
    return distribute('小老虎');
})
.then(() => {
    console.log('大家都拿到小鱼干了');
})
```

```javascript
// 'Good Code ✅'
    Promise.all([
        distribute('大黑'),
        distribute('小美妞'),
        distribute('小老虎')
    ])
    .then(() => {
    console.log('大家都拿到小鱼干了');
})

// OR
const first = await distribute('大黑');
const second = await distribute('小美妞');
const third = await distribute('小老虎');
```


### If else 和 return

首先，就我个人而言，我十分不喜欢else，我的代码里面几乎从来不会出现else,除非极少数实在没办法。合理的使用return,会极大的增加代码的可读性。

举例：

我有三只可爱的小猫咪，他们都喜欢往箱子里面钻。

现在箱子在地上，我想知道里面有没有猫，如果没有猫，告诉我没有猫咪，是一只的话，告诉我是谁，两只也告诉我是谁，三只就不用告诉我了。

```javascript
// 'Bad Code 💩'
const box = ['大黑', '小美妞', '小老虎'];

function check(box) {
    if(box.length===0) {
        console.log('没有猫咪');
    } else if(box.length < 3) {
      box.forEach(cat => console.log(cat));  
    } else {
    }
}

```

```javascript
// 'Good Code ✅'
const box = ['大黑', '小美妞', '小老虎'];

function check(box) {
    const len = box.length;
    if(len === 3) return;
    
    if(len === 0) {
        console.log('没有猫咪');
        return;
    }
    
    box.forEach(cat => console.log(cat));  
}

```


好了，以上就是我们本次的全部内容了~

代码的规范和写法是一个比较细节的事情，需要大家在日常的代码中时刻注意，多想一下这个地方是不是有更好的写法。


> Mien, 5年前端开发经验，目前就职于斯伦贝谢。

> 涉猎范围： Angular, Vue, React, 小程序, electron, nodeJS以及一些乱七八糟的技术

> 欢迎留言提问和指正。

我是Mien,我们下期再见。
