# resourcedoor
the nodeJs static web server

## 效果
1. 如果是目录将返回目录列表
![image](https://github.com/tfeng-use/resourcedoor/blob/master/static/Catalog.png)

2. 如果是文件那返回文件内容
![image](https://github.com/tfeng-use/resourcedoor/blob/master/static/file.png)

## 安装

```
npm i -g resourcedoor
```

## 启动方法

```
resourcedoor # 把当前文件夹作为静态资源服务器根目录

resourcedoor -p 8080 # 设置端口号为 8080

resourcedoor -h localhost # 设置 host 为 localhost

resourcedoor -d /usr # 设置根目录为 /usr
```
