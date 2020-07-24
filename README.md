## gbd-mall-service
GBD电商项目的的后端服务工程，给app和crm提供api支持。

## 使用技术栈
* [eggjs](https://eggjs.org/)
* [mongodb](https://www.mongodb.com)
* [mongoose](https://mongoosejs.com)
* [redis](https://redis.io)
* ……

## 本地开发
工程直接连接到测试环境的数据库，因此只需要：
1. 工程目录下终端执行`npm i`安装项目依赖
2. 执行`npm run debug`或`npm run dev`启动node服务（如果是vscode直接按F5运行即可）

### 连接本地数据库
> 推荐使用`docker-compose`的方式，如果不想用或想连接本地自己搭建的mongodb服务，直接从第二步开始。

1. 在工程目录下终端执行`docker-compose up`启动工程依赖的`mongodb`和`redis`服务
2. 修改`/config/config.local.js`文件中的mongodb地址配置
3. 执行`npm run debug`或`npm run dev`启动node服务

> 1. 使用`docker-compose`需要有docker环境
> 2. 如果要关闭`docker-compose`启动的服务，工程目录下终端执行`docker-compose down`即可停止

### CRM账号密码
账号：admin
密码：123456

## 生产环境部署（包括测试环境过）
> 如果是日常更新，只需要把代码在git的test（测试环境）或master（生产环境）分支执行`git push`进行推送就可以自动更新。这里讲项目初始化的配置。

1. 把工程代码复制到服务器中
2. 进入工程目录下执行`npm i --save`安装项目依赖
3. 执行`EGG_SERVER_ENV=prod npm run start`完成生产环境的服务启动（如果是测试环境，请修改`EGG_SERVER_ENV=prod`为`EGG_SERVER_ENV=test`）

### 数据库初始化
不然crm系统没有超级管理员的账号。
1. 进入工程目录下`/init.d/mongo`文件夹
2. 终端执行`mongo --quiet hostname:27017/dbname init.js`（注意修改mongodb的地址，有密码的请配置密码）
3. 查看mongodb是否生成了数据
