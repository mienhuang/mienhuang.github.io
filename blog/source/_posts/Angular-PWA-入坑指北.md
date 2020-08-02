---
title: Angular PWA 入坑指北
date: 2020-08-02 17:18:00
tags:
---

> hello，各位小伙伴大家好啊，这篇文章终于是在我拖的不能在拖的情况下，更了出来。在这里十分感谢那些不辞辛苦提醒我更新文章的小伙伴。愿你们在新的一年里，远离病毒，远离降薪，远离加班，升职加薪与你们同在，阿门~

今天我们来水一篇文章，至于为什么说水一篇文章呢，因为关于PWA入门的基础教程其实网上是有很多的，大厂的系统教程也是有的，这里我们推荐两个。

* [Your First Progressive Web App](https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0)
* [Service Worker & PWA](https://angular.io/guide/service-worker-intro)

第一个是google的code lab。非常系统的讲解了从一个普通的应用如何变成PWA应用。步骤详细，容易上手。

第二个是Angular官方的PWA文档，Angular的好处就是官方CLI提供了工具，能后快速的帮你完成基础的配置，省力但是存在一些难度和问题，需要自己处理。

下面开始正片环节！

### 什么是PWA

PWA全称Progressive web app，中文名称渐进式Web应用。

至于PWA的特点，优势，前世今生这些细节，我给各位小伙伴找了一篇文章，来自**王玉略**同学的[简单介绍一下Progressive Web App(PWA)](https://juejin.im/post/6844903556470816781).文章写的很详细，为了保证各位小伙伴看到的都是不重复的资源信息，我就不重复这些了。

> ps: @王玉略 同学记得来点赞~

### 为什么我选择PWA

如果为我们将PWA用在真实的项目上，就需要有我们技术选型的依据。为什么选择PWA？

先说一下项目需求，我们需要开发一款跨端的应用，并且该应用很大部分情况下是在离线使用。

应用的主要功能在于用户输入数据的展示，并且数据量不大。

开发周期三个月，包含需求确定，UI/UX，开发，部署。

需要开发的内容， client APP， BFF(Back-end For Front-end)， Back-end.

开发人员， 两名。
估算之后的开发实际时间大约一个半月。


我需要开发client APP和BFF。

再加上我之前并没有React Native的经验，所以如果选择React Native我并不能保证在计划时间内完成开发任务，更不要说Flutter或者原生开发了。

其实我们认真分析项目可以发现核心需求只有一个，那就是离线使用。所以传统的网页并能满足，但是PWA的特点就是可以离线运行，所以PWA可以完美的满足核心需求。

### 开发环境

* windows: 10
* node: 10.16.3
* npm: 6.9.0
* Angular CLI: 9.0.6
* Angular: 9.0.6
* Chrome: 80.0.3987.163

### 初始化Angular APP

ok, 下面进入正题，首先却创建项目。

`ng new ng-pwa-app --prefix=slb`

这样一个完整的Angular项目 GET！

接下来我们借助Angular CLI的支持执行下面这行命令。

`ng add @angular/pwa --project *project-name*`

对应到我们的项目就是

`ng add @angular/pwa --project ng-pwa-app`

到这里，我们得到了一个PWA的项目。

好，本期教程到此结束~

![](https://user-gold-cdn.xitu.io/2020/4/6/1714e78ec2326baf?w=870&h=832&f=png&s=280326)
错了，错了，我们继续...

我们首先来看下这条命令都背着我们做了什么事情。

* 安装 `@angular/service-worker`
* 启用service worker build
* 在app module 注册service worker
* 在index.html 引入`manifest` 和 `theme-color`
* 增加icon
* 创建 `ngsw-config.json`

接下来我们将项目编译一下

`ng build --prod`

编译之后我们会得到`dist/ng-pwa-app/`目录下的编译结果。

至于为什么我们不直接使用 `ng serve`来测试呢？ 

答案当然是 `ng serve` 不能够支持PWA

这时候我们需要一个server 来 host 我们的app,这里我们使用`http-serve`.

全局安装 http-serve `npm i http-server -g`

接下来我们就可以运行一下我们的项目了~

执行下面这行命令

`http-server -p 8080 -c-1 dist/ng-pwa-app`

查看`localhost:8080`

告诉我，你看到了下图~

![](https://user-gold-cdn.xitu.io/2020/4/6/1714f0a23b7dcc13?w=765&h=684&f=png&s=33173)

到这里我们先不继续往下深入，先看一下Angular CLI背着我们具体做的东西。

### manifest

``` json
{
  "name": "ng-pwa-app",
  "short_name": "ng-pwa-app",
  "theme_color": "#1976d2",
  "background_color": "#fafafa",
  "display": "standalone",
  "scope": "./",
  "start_url": "./",
  "icons": [
    {
      "src": "assets/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "assets/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
    {
      "purpose": "maskable"
    },
    {
      "src": "assets/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "maskable"
    },
      "src": "assets/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "assets/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "assets/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "assets/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "assets/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

上面的manifest 文件是CLI帮我们生成的

* name: 项目名称
* theme_color: 主题颜色
* display: 运行方式
* start_url: 加载目录或者说入口地址
* icons: 图标数组，针对不同尺寸

### ngsw-config.json

如果你之前接触过Angular的worker的话，就会知道Angular引入worker并不是我们创建一个worker.js,而是提供一个配置json,然后根据你的配置自动帮你生成worker js 文件。

下面就是这个配置文件的内容：
``` json
{
  "$schema": "./node_modules/@angular/service-worker/config/schema.json",
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": [
          "/favicon.ico",
          "/index.html",
          "/manifest.webmanifest",
          "/*.css",
          "/*.js"
        ]
      }
    }, {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": [
          "/assets/**",
          "/*.(eot|svg|cur|jpg|png|webp|gif|otf|ttf|woff|woff2|ani)"
        ]
      }
    }
  ]
}
```

针对这个文件，我们讲两部分

#### assetGroups

关于assetGroups，它出现在了上面的json文件中，从上面的内容你可以发现，这部分是与应用一起加载的资源，同时也会一起更新。因为我们在开始就已经知道了这些具体的资源，所以我们可以将这些明确的资源配置在这里。

主要包括了应用的运行类资源，html,js,css等等资源，还有就是一些文件资源，svg,png,ttf等资源。

具体细节如下：

``` typescript
interface AssetGroup {
  name: string;
  installMode?: 'prefetch' | 'lazy';
  updateMode?: 'prefetch' | 'lazy';
  resources: {
    files?: string[];
    urls?: string[];
  };
}
```
    
#### dataGroups

关于dataGroups的配置我们在上面并没有体现，那是因为这部分的缓存的资源是随应用执行而产生和发生变化的。

比如接口返回的缓存。

具体细节如下：

``` typescript
interface DataGroup {
  name: string;
  urls: string[];
  version?: number;
  cacheConfig: {
    maxSize: number;
    maxAge: string;
    timeout?: string;
    strategy?: 'freshness' | 'performance';
  };
}
```

说明一点，其中的urls的内容是一个匹配策略。你可以将你希望缓存的所有地址写在这里。


### 运行lighthouse

打开chrome 的dev tool, 选择 Audits页。


![](https://user-gold-cdn.xitu.io/2020/4/6/1714f23f230be515?w=764&h=686&f=png&s=49066)

点击 Generate report, 等待结果。

向下滑动页面，查看Progressive Web App相关的内容。如下：


![](https://user-gold-cdn.xitu.io/2020/4/6/1714f25cf4fa8e9a?w=762&h=946&f=png&s=72831)

从这里的结果上我们可以发现我们目前存在两个问题。

* 我们没使用https,先忽略这个问题，真实的生产环境你一定需要部署到https的server上。
* 缺少app-touch-icon

我们需要处理的就是第二项。

处理的方法其实很简单，就是需要在index.html页面添加

` <link rel="apple-touch-icon" href="assets/icons/icon-144x144.png">`

添加之后重新编译，和重启server.

重新运行Lighthouse.


![](https://user-gold-cdn.xitu.io/2020/4/6/1714f2c572093af4?w=1153&h=964&f=png&s=85412)

重新执行之后我们发现，错误只剩下https的问题了。但是我们依然没有在地址栏的右边看到安装按钮。这是为什么？

既然这里Lighthouse不能发现问题，那么我们切换到Application页面看一下。

进入Application tab下，左侧选择Manifest.

我们发现了下面的警告！

![](https://user-gold-cdn.xitu.io/2020/4/6/1714f3243f88d11c?w=1381&h=263&f=png&s=25817)

上面的警告说我们的给的图片不合适？可是，这不是官方的图标吗？？？

网上搜索了一番，发现有人也遇到了这个问题，但是没有看到合适的回答。

一番折腾之后我发现了一个解决方案，去manifest里面修改144X144这个图片的perpose.

从默认的`maskable` 修改为 `any`.

然后重新编译，重启server,刷新页面。


![](https://user-gold-cdn.xitu.io/2020/4/6/1714f42468235632?w=624&h=201&f=png&s=13546)

点击安装：


![](https://user-gold-cdn.xitu.io/2020/4/6/1714f43a75c7ae38?w=629&h=222&f=png&s=18823)

变样子了对吗？

![](https://user-gold-cdn.xitu.io/2020/4/6/1714f4444161d405?w=928&h=742&f=png&s=59601)

到这里，各位小伙伴现在请站起来给自己鼓鼓掌。你已经得到了一个可以安装的PWA应用的~

### 处理更新

上面我们得到了应用之后，用户就可以安装到桌面了，但是如果我们服务端更新了，但是用户这个没有同步怎么办？

Angular的SwUpdate给我们提供了这些功能。

SwUpdate 服务支持四个独立的操作：

* 获取出现可用更新的通知。如果要刷新页面，这些就是可加载的新版本。

* 获取更新被激活的通知。这时候 Service Worker 就可以立即使用这些新版本提供服务了。

* 要求 Service Worker 向服务器查询是否有新版本。

* 要求 Service Worker 

我们在 `app.component.ts`里面创建两个方法。

监听更新：

``` typescript
private _listenOnUpdate() {
    this.updates.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    this.updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }
```

如果发现可用更新或者已激活更新，我们就会看到上面的Log，具体发现更新之后的处理，你可以根据实际需求来决定。

比如你可以弹框提醒用户刷新页面。

触发更新：

``` typescript
private _checkForUpdate() {
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(1000 * 60 * 60 * 6);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(() => this.updates.checkForUpdate());
  }
```

这里设置的是每6小时触发一个检测更新。

完整代码：

``` typescript
import { Component, ApplicationRef, ChangeDetectionStrategy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval, concat } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'slb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private updates: SwUpdate, private appRef: ApplicationRef) {
    this._checkForUpdate();
    this._listenOnUpdate();
  }

  private _listenOnUpdate() {
    this.updates.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    this.updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }

  private _checkForUpdate() {
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(1000 * 60 * 60 * 6);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(() => this.updates.checkForUpdate());
  }
}
```

到这里的话，传统的教程应该已经结束了，但是我们没有，我们还有补充教程。如何手动处理worker事件。

通过上面的教程我们已经知道了，Angular会帮我们生成worker.js 文件，但是在我们实际的项目中，我们有可能需要自己监听一些事件，然后自定义一些处理。但是我们没有worker.js 文件，这时候怎么做？？

动一下你聪明的小脑瓜，想一下？

其实很简单，那就是我们自己写一个worker.js替换默认的。

当然，并不是简单的全部替换。

先上代码：

#### mien-worker.js

``` javascript
'use strict';

self.onmessage = (e) => {
  console.log(e, 'message from mien\'s custom worker service...')
}
importScripts('./ngsw-worker.js');
```

在我们自定义的worker.js 内，我们自己注册事件。在最后要做的就是把Angular帮我们做的事情拿过来用。

`importScripts('./ngsw-worker.js')`

我们再到 `app.module.ts`去修改worker的注册。

从之前的：

`ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),`

修改为：

`ServiceWorkerModule.register('mien-worker.js', { enabled: environment.production }),`

再有把我们worker文件加入到资源列表，这样这个js 就不会被编译进main.js内了。

### Angular.json

```
"assets": [
              "src/favicon.ico",
              "src/assets",
              "src/manifest.webmanifest",
              "src/mien-worker.js"
            ],
```

新增的内容是 `src/mien-worker.js`.

来看效果：


![](https://user-gold-cdn.xitu.io/2020/4/6/1714f604d0d21816?w=1255&h=116&f=png&s=19470)

OK~

到这里，本期的更新 **Angular PWA 入坑指北** 就全部结束了。

在这里我公布一个计划，我计划开一个系列专栏。从头学习javascript。在现在所有人只关心三大框架，小程序，Flutter的时候，我觉得基础才是最重要的基石，良好的基础能让你在学习新知识的时候信手拈来。哪怕是看源代码的时候也能得心应手。

如果你感兴趣，请留言告诉我吧。

> Mien, 5年前端开发经验，目前就职于**斯伦贝谢**。

> 涉猎范围： Angular, Vue, React, 小程序, electron, nodeJS以及一些乱七八糟的技术

> 欢迎留言提问和指正。

我们下周再见~