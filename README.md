## gbd-mall-service
简易的电商demo。

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

### 数据库初始化
不然crm系统没有超级管理员的账号。
1. 进入工程目录下`/init.d/mongo`文件夹
2. 终端执行`mongo --quiet hostname:27017/dbname init.js`（注意修改mongodb的地址，有密码的请配置密码）
3. 查看mongodb是否生成了数据

ps：使用npm script中的`initdb`完成上述初始化，前提是按照上文配置的本地数据库。