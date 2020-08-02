---
title: Angular 微前端实践 之 Single-SPA 手把手教程（上）
date: 2020-08-02 17:18:42
tags:
---

> 最近自己在研究Angular的微前端实践，算是比较完整的从零走通了整个流程。了解到很多小伙伴也有这方面的需求，所以整理了一些内容希望对各位小伙伴有帮助。

各位看官时间有限，我们直接进入正题。

### 目标

* 一个container项目，两个微前端项目
* container项目的展示页面同时加载两个项目
* 不同项目之间，资源抽离，减小加载资源量

### 环境

* node -v 10.16.3
* npm -v 6.9.0 
* angular -v 8.2.11
* VS code

### 项目准备

* 确认本地安装Angular-cli
* 使用命令 `ng new project --prefix=prefix`创建三个项目
* 微前端的项目最好使用不同的prefix这样在加载项目的时候才不会出错。

本示例中执行的命令如下：
* `ng new container --prefix=slb`
* `ng new app1 --prefix=app1`
* `ng new app2 --prefix=app2`

### container部分

#### 安装依赖

* `npm i single-spa --save`
* `npm i systemjs --save`
* `npm i import-map-overrides --save`

#### 修改angular.json

将build下的scripts修改如下：
``` javascript
"scripts": [
    "node_modules/systemjs/dist/system.min.js",
    "node_modules/systemjs/dist/extras/amd.min.js",
    "node_modules/systemjs/dist/extras/named-exports.min.js",
    "node_modules/systemjs/dist/extras/named-register.min.js",
    "node_modules/import-map-overrides/dist/import-map-overrides.js"
    ]
```

以上我们就完成了container项目的配置工作，下面开始进入代码环节。

#### 修改index.html

在head标签下增加
```
<meta name="importmap-type" content="systemjs-importmap" />
<script type="systemjs-importmap" src="/assets/import-map.json"></script>
```
在body标签下增加

```
<import-map-overrides-full></import-map-overrides-full>
```

index.html 最终内容如下：

``` html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Container</title>
  <base href="/">
  <meta name="importmap-type" content="systemjs-importmap" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <script type="systemjs-importmap" src="/assets/import-map.json"></script>
</head>
<body>
  <slb-root></slb-root>
  <import-map-overrides-full></import-map-overrides-full>
</body>
</html>
```

细心的小伙伴可能会注意到为我们引入了一个还没有创建的文件。

```
<script type="systemjs-importmap" src="/assets/import-map.json"></script>
```

就是上面这行代码中的JSON文件。那么下一步我们就来创建这个文件。

#### 创建微前端项目索引文件

在assets目录下新建import-map.json文件，内容如下。

``` json
{
    "imports": {
      "app1": "http://localhost:4201/main.js",
      "app2": "http://localhost:4202/main.js"
    }
  }
  
```
在demo中我们都是本地服务加载这些文件，所以这里的地址都是`localhost`。`4201`和`4202`分别是两个微前端项目的端口。

#### 创建spa-host component

执行`ng g c spa-host`

angular-cli 会帮助我们创建一个spa-host component。这个组件会是我们挂载微前端的地方。

#### 修改spa-host component

##### spa-host.component.html

在html 页面创建两个挂载元素。

``` html
<div #app1></div>
<div #app2></div>
```

挂载点的数量与我们需要挂载的微前端个数一致，在当前demo中我们需要挂载两个项目，分别为app1和app2。


##### spa-host.component.ts

先获取挂载点:

``` typescript
  @ViewChild('app1', { static: true }) private app1: ElementRef;
  @ViewChild('app2', { static: true }) private app2: ElementRef;
```

为了上述代码能够运行，我们需要引入依赖。

``` typescript
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
```

在获取挂载点之后，我们就可以将另外的两个前端项目进行挂在了。

接下来我们需要一个方法来挂载项目。


#### 创建微前端挂载函数

在src下创建service文件夹

创建 `single-spa.service.ts`

在这里service中我们需要两个方法，一个是挂载，一个是卸载。

所以这个service的核心方法只有 `mount` 和 `unmount`。

这里项目的挂载我们需要依赖`single-spa`提供的`mountRootParcel`方法来实现。

``` javascript
mountRootParcel(app, { domElement });
```
这个方法接受两个参数，第一个是需要挂载的项目，第二个是一个options,为我们需要传的就是这个domElement,也就是我们的挂载点。

这个方法会返回一个挂载的Parcel 对象，内容如下：

```
  type Parcel = {
    mount(): Promise<null>;
    unmount(): Promise<null>;
    update(customProps: object): Promise<any>;
    getStatus():
      | "NOT_LOADED"
      | "LOADING_SOURCE_CODE"
      | "NOT_BOOTSTRAPPED"
      | "BOOTSTRAPPING"
      | "NOT_MOUNTED"
      | "MOUNTING"
      | "MOUNTED"
      | "UPDATING"
      | "UNMOUNTING"
      | "UNLOADING"
      | "SKIP_BECAUSE_BROKEN"
      | "LOAD_ERROR";
    loadPromise: Promise<null>;
    bootstrapPromise: Promise<null>;
    mountPromise: Promise<null>;
    unmountPromise: Promise<null>;
  };
```

从这里我们可以发现，Parcel是我们卸载app的依据。

所以我们在卸载应用的时候需要执行的就是`Parcel.unmount()`;

到这里我们基本清楚我们的挂载和卸载的实现了，下面上代码：

``` typescript
import { Injectable } from '@angular/core';
import { Parcel, mountRootParcel,  } from 'single-spa';
import { Observable, from } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SingleSpaService {
  private loadedParcels: {
    [appName: string]: Parcel
  } = {};

  constructor() { }

  mount(appName: string, domElement: HTMLElement): Observable<void> {
    return from(window.System.import(appName))
      .pipe(
        tap(app => {
          this.loadedParcels[appName] = mountRootParcel(app, { domElement });
        }),
        mapTo(null)
      );
  }

  unmount(appName: string): Observable<void> {
    return from(this.loadedParcels[appName].unmount()).pipe(
      tap(() => delete this.loadedParcels[appName]),
      mapTo(null)
    );
  }
}

```

在上面的代码中我们使用了Window.System.import 方法，但是我们在运行的时候会发现，在window下并不存在System这个对象。

其实这个对象是有的，只是没有被lint 出来而已，但是我们还是有办法解决这个难看的报错的。

src目录下新建一个types文件夹，然后创建ambient.d.ts文件，当然换一个你自己喜欢的名字也可以。

内容如下：
```
import { ParcelConfig } from 'single-spa';

declare global {
  interface Window {
    System: {
      import: (app: string) => Promise<ParcelConfig>;
    };
  }
}

```

这样，我们就不会有报错了。

tips:

`loadedParcels` 是我们存储已经挂载的应用的变量。

创建完成 `single-spa` service之后我们回到 `spa-host`组件来完成我们页面的挂载和卸载。

##### spa-host.component.ts

##### 实例化spa-service

``` typescript
constructor(private service: SingleSpaService) { }
```

##### 挂载

``` typescript
this.service.mount('app1', this.app1.nativeElement).subscribe();
this.service.mount('app2', this.app2.nativeElement).subscribe();
```

在我们的demo 中，因为是假的项目和固定的挂载数目，所以我将挂载方法写在了`onInit` 方法内，但是在实际的项目中挂载方法的执行应该是在你获取到数据之后。

##### 卸载

``` typescript
zip(
    this.service.unmount('app1'),
    this.service.unmount('app2')
).toPromise();
```

关于卸载的处理如果项目是挂载一次的，那么都应该在`onDestory` 的时候统一卸载所有挂载应用。如果是页面动态变化的，那么卸载也会发生在`onChange`的时候。


#### 完整代码

``` typescript
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { SingleSpaService } from '../../service/single-spa.service';
import { zip } from 'rxjs';

@Component({
  selector: 'slb-spa-host',
  templateUrl: './spa-host.component.html',
  styleUrls: ['./spa-host.component.scss']
})
export class SpaHostComponent implements OnInit, OnDestroy {

  constructor(private service: SingleSpaService) { }

  @ViewChild('app1', { static: true }) private app1: ElementRef;
  @ViewChild('app2', { static: true }) private app2: ElementRef;


  ngOnInit() {
    this.service.mount('app1', this.app1.nativeElement).subscribe();
    this.service.mount('app2', this.app2.nativeElement).subscribe();
  }

  async ngOnDestroy() {
    await zip(
      this.service.unmount('app1'),
      this.service.unmount('app2')
    ).toPromise();
  }
}

```

至此，我们就做完了`spa-host` component 的全部改动。

我们既然已经创建完这个component，接下来当然是让它起作用。

#### 查看app.module.ts

确认 `SpaHostComponent`已经被引入并声明完成。如果没有那就手动完成一下。

引入component
```
import { SpaHostComponent } from './spa-host/spa-host.component';
```

加到declarations 中

``` typescript
  declarations: [
    AppComponent,
    SpaHostComponent
  ],
```

完整代码：

``` typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SpaHostComponent } from './spa-host/spa-host.component';

@NgModule({
  declarations: [
    AppComponent,
    SpaHostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

#### 修改路由

将`SpaHostComponent`挂在跟路由下
``` typescript
const routes: Routes = [
  {
    path: '',
    component: SpaHostComponent
  }
];
```

完整代码
``` typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpaHostComponent } from './spa-host/spa-host.component';


const routes: Routes = [
  {
    path: '',
    component: SpaHostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

#### app.component.html

删除默认添加的内容只剩余`router-outlet`
``` html
<router-outlet></router-outlet>
```

#### main.js启动single-spa

在main.js 中添加下列代码，启动single-spa

``` typescript
import * as singleSpa from 'single-spa';

singleSpa.start();
```

上面就是全部的container 项目的改动了。

### 微前端部分

下面我们开始修改微前端项目。在我们demo 里面两个微前端项目是完全相同的，所以下面我们以app1来举例。

#### 加载single-spa

执行命令
`ng add single-spa-angular`

这条命令会帮我们完成一下内容

* 安装 `single-spa-angular`
* 创建 `src/main.single-spa.ts`
* 创建 `src/single-spa/single-spa-props.ts`
* 创建 `src/single-spa/asset-url.ts`
* 创建 `EmptyRouteComponent`并引入到`app-routing.module.ts`
* 增加npm script `build:single-spa` 和 `serve:single-spa`
* 创建 `extra-webpack.config.js`

`tips`

关于webpack config这部分Angular 的7以及之前版本和8+的处理上不同。

#### 修改端口

上面的命令增加了两个npm script, 但是里面的端口号是默认的4200，我们需要修改为我们真正使用的。这里4200是我们的container的端口号，所以这里我们使用4201.

将这两个脚本修改为：

```
"build:single-spa": "ng build --prod --deploy-url http://localhost:4201/",
"serve:single-spa": "ng serve --disable-host-check --port 4201 --deploy-url http://localhost:4201/ --live-reload false",
```

#### 修改路由

将路由指向我们创建的`EmptyRouteComponent`,修改路由为如下。
```
const routes: Routes = [
  {
    path: '**',
    component: EmptyRouteComponent
  }
];
```

providers 修改为如下

``` typescript
providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
```

完整代码：

``` typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

const routes: Routes = [
  {
    path: '**',
    component: EmptyRouteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppRoutingModule { }

```
#### 修改app.component.html

最后，我们修改一下`app.component.html`，删除之前的内容。

修改为
``` html
<h1>Mien's first Micro Front-end project</h1>
```

这就是为前端部分的全部改动。同样的我们需要对app2也做同样的修改。

然后让我们运行一下看看吧~

告诉我，你也看到了下面的内容对吗？

![](https://user-gold-cdn.xitu.io/2020/3/14/170d92003934c236?w=822&h=421&f=jpeg&s=37789)


### 写在后面

以上便是**Angular 微前端实践 之 Single-SPA 手把手教程（上）** 的全部内容的，本文的下半部分还在整理中，如果感兴趣的话请评论告诉我。

对本文中的问题，也欢迎留言提问。

如有错误，欢迎指正。

#### 下半部分预告（计划）

* 路由处理
* 依赖抽离
* 动态挂载
* SPA功能实现分析
* 问题回答

另外还有不使用single-spa 的微前端实现，如果这些有人看就再整理一篇文章。

>第一次在掘金发文章，希望小伙伴们多多支持啊。