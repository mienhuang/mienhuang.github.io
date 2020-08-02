---
title: Angular 从创建项目到打包docker image 发布
date: 2020-08-02 17:17:30
tags:
---

> hello，各位亲爱的小伙伴大家好啊.
> 又是一个崭新且阳光明媚的下午,今天我们要学习的是如何从创建一个Angular的项目到打包成docker image并部署到自己的服务器上。


![](https://user-gold-cdn.xitu.io/2020/4/19/17191a5a297f4271?w=1240&h=992&f=png&s=26050)

让自己的站点运行在docker上，听起来是不是很酷？

那就让我们开始吧！

### 环境

首先呢，我们简单介绍一下我们的开发环境和工具。

* windows 10
* docker desktop: 2.2.0.5
* vs code
* Terminus
* Angular 9.0.6
* Angular CLI:9.0.6
* Nodejs: 12.16.1

> Tips: 本教程不涉及docker 的安装。 

介绍完了开发的工具和环境之后我们进入正题，先创建项目。

### 创建项目

关于如何使用Angular-CLI 创建一个项目我想大家应该都已经很清楚了对吧。

就是 `ng new docker-demo --prefix=mien`

创建成功之后我们进入目录，运行程序。

`cd docker-demo && ng serve`

之后打开浏览器，访问`localhost:4200`

![](https://user-gold-cdn.xitu.io/2020/4/19/17191c44d3df9e5b?w=854&h=784&f=png&s=45836)

还是原来的UI还是熟悉的味道对吧。

OK，下面进入docker部分。

### 流程分析

在开始写代码之前，我们先来做一个流程分析。

1. 服务端的运行环境。
    
    我们的应用是运行在docker上了，所以对于服务端而言，只需要安装docker即可。

2. 前端的挂载环境。

    在我们这个示例中，我们使用nginx来host前端项目。

3. 打包流程。

    使用过nginx的童鞋应该很清楚，最简单的操作就是把需要host的项目代码放到nginx的html目录下即可。我们呢，就按照最简单的来，不涉及额外的配置。
    
    对应到我们的项目其实就是：
    
    * `npm install`
    * `npm run build --prod`
    * copy 编译结果到nginx 的html目录下
    
    所以，看上去还是很简单的嘛


### 查看本地Image

首先我们查看本地已经存在的image和正在运行的image。

执行 `docker images` 和 `docker ps`

![](https://user-gold-cdn.xitu.io/2020/4/19/17191ca546f79fc2?w=901&h=214&f=png&s=19354)

OK，本地目前只有node 和 nginx 的image。

当然还有一个我们这次教程不涉及的`portainer`,这个是什么？其实就是一个可视化的docker 管理工具。


![](https://user-gold-cdn.xitu.io/2020/4/19/1719278024d69a68?w=853&h=835&f=png&s=70974)

对于不是很喜欢敲命令的童鞋，这个工具还是很好用的。


### 选取docker image

我们这里需要用的第三方image有两个，一个是node,另一个是nginx。那么第一步就是到docker hub 去查看需要的版本。

`https://hub.docker.com/`

1. 查看 node

![](https://user-gold-cdn.xitu.io/2020/4/19/171927c937eb64bb?w=766&h=287&f=png&s=16139)

![](https://user-gold-cdn.xitu.io/2020/4/19/171927d345712438?w=921&h=299&f=png&s=19867)

对于Node 的版本选择，我们尽量使用最新的版本。所以我们选择**13**这个版本。

2. 查看 nginx


![](https://user-gold-cdn.xitu.io/2020/4/19/171927ed7ab6f7a8?w=769&h=284&f=png&s=14967)

![](https://user-gold-cdn.xitu.io/2020/4/19/171927f09f0534d9?w=765&h=252&f=png&s=15134)

同样的我们选取新版本的1.17作为我们的nginx版本。

### 创建dockerfile

dockerfile 其实就是一个流程安排的脚本文件，先做什么，再做什么，顺序执行。我们直接来看内容：

``` dockerfile
FROM node:13 as sdk

WORKDIR /app

RUN  npm install -g @angular/cli

COPY ./docker-demo/package.json /app

RUN npm install

FROM node:13 as builder

WORKDIR /app

COPY --from=sdk /app /app

COPY ./docker-demo /app

RUN npm run build

FROM nginx:1.17.9

WORKDIR /app

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/docker-demo /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT /bin/sh -c "nginx -g 'daemon off;'"
```

我们简单过一下上面的内容：

* 指定环境，例如node 和nginx 使用`FROM`关键字
* 执行命令，例如npm i 使用`RUN`关键字
* 复制内容到指定位置，使用 `COPY from to`
* 明确命令运行位置，使用 `WORKDIR`
* 暴露端口号, 使用 `EXPOSE`。这里之所以是80是因为nginx的默认端口是80
* 指定入口，使用 `ENTRYPOINT`

### 打包image

在目录下我们运行打包命令：

`docker build -f Dockfile -t d-demo:latest .`

解释一下这条命令

`docker build` 就是运行编译指令

`-f Dockerfile` 就是指定Dockfile的位置

`-t d-demo:latest` 就是对image的tag名称

`.` 表示执行目录为当前目录

命令执行结束之后，我们使用`docker images` 查看当前存在的docker image。就能发现我们刚才创建的`d-demo:latest`了。

![](https://user-gold-cdn.xitu.io/2020/4/20/1719553f61abefbf?w=848&h=121&f=png&s=11310)

### 导出image

正常的流程打包过程是在线上的pipeline 执行的，但是我们目前是学习过程，所以就在本地执行。那么我们就需要把我们编译成功的镜像导出成文件，这样我们才能在服务端使用。

下面说一下docker 的image 导出命令。

`docker save -o d-demo.tar d-demo:latest`

`docker save`就是我们要掌握的保存image的命令.

`-o`表示保存文件

然后就是要保存的文件名 和要保存的image

然后我们查看本地文件。


![](https://user-gold-cdn.xitu.io/2020/4/20/171955bf67434d89?w=801&h=154&f=png&s=8780)

我们看到了我们刚才指定的压缩包对吧。

### 运行image

既然编译和导出都学会了，那么就让它运行起来吧。

`docker run -d -p 8090:80 d-demo:latest`

`docker run`又一个各位童鞋需要掌握的命令。

`-d` 后台运行

`-p` 指定端口映射，这里其实就是把image的80端口映射到8090，这样我们访问8090即可。

然后就是image的名称了

执行命令之后我们就可以使用`docker ps`来查看当前运行的image

![](https://user-gold-cdn.xitu.io/2020/4/20/171956168a54084e?w=1052&h=120&f=png&s=10916)

LOOK~ LOOK~ 我们的image在运行了对吧。就是这么的简单！

下面就是见证奇迹的时刻，然我们浏览器访问一下。

当当当当~


![](https://user-gold-cdn.xitu.io/2020/4/20/171956355a65841d?w=814&h=784&f=png&s=47153)

不要说我没换图哦~看端口号~

好了，这些就是本次教程的全部内容了。当然我写的很简单，但是其实里面还是存在很多坑的。比如dockerfile里面的执行顺序，还有一些看起来不需要的操作，你去掉就会发现报错了。

如果小伙伴感兴趣的话，我们可以再做一个后续。当然还有docker compose, K8S这些我们都没有涉及。如果你想看的话，那就留言告诉我吧。

> 作者：Mien，目前供职于**斯伦贝谢**。

> 涉猎范围： Angular, Vue, React, 小程序, electron, nodeJS以及一些乱七八糟的技术

> 欢迎留言提问和指正。

我们下周再见~