## 如何让api支持跨域请求

> example

<p align="center">
  <img src="./test_cors.gif" alt="draggable"/>
</p>

``index.html:``

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>测试</title>
</head>
<body>
  <script>
    fetch('http://localhost:3001/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        data: 'Test'
      })
    }).then(data => {
      console.log(data);
    })
  </script>
</body>
</html>
```

> 跨域

``概念:`` [相关文章](https://juejin.im/post/5c23993de51d457b8c1f4ee1)

> 9种跨域方案中的服务端设置cors

```
浏览器会自动进行 CORS 通信，实现 CORS 通信的关键是后端。只要后端实现了 CORS，就实现了跨域。
服务端设置 Access-Control-Allow-Origin 就可以开启 CORS。 该属性表示哪些域名可以访问资源，如果设置通配符(*)则表示所有网站都可以访问资源。
虽然设置 CORS 和前端没什么关系，但是通过这种方式解决跨域问题的话，会在发送请求时出现两种情况，分别为简单请求和复杂请求。
```
1.  简单请求:只要同时满足以下两大条件，就属于简单请求 

   ```
   条件1： 使用下列方法之一: GET、HEAD、POST
   条件2:  Content-Type 的值: text/plain、multipart/form-data、application/x-www-form-urlencode
   ```

   

2. 复杂请求:

   ```
   不符合简单请求的就是复杂请求，复杂请求的cors设置，会在正式通信之前，增加一次HTTP查询请求，称为预检请求，该请求是options方法的通过该请求来知道服务端是否允许跨域请求。
   ```

> 复杂请求example: 

1. 服务端:

   ```js
   var Koa = require('koa');
   var Router = require('koa-router');
   const bodyParser = require('koa-bodyparser')
   var app = new Koa();
   var router = new Router();
   
   app.use(bodyParser()); // 解析body数据
   router.options('/test',async (ctx, next) => {
     ctx.set("Access-Control-Allow-Origin", "*");
     ctx.set("Access-Control-Allow-Headers", "Content-Type");
     ctx.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
     ctx.set('Access-Control-Allow-Credentials', true);
     ctx.set("Content-Type", "application/json;charset=utf-8");
     ctx.status = 204;
   });
   router.post('/test',async (ctx, next) => {
     // ctx.router available
     ctx.set("Access-Control-Allow-Origin", "*");
     ctx.set("Access-Control-Allow-Headers", "Content-Type");
     ctx.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
     ctx.set('Access-Control-Allow-Credentials', true);
     ctx.set("Content-Type", "application/json;charset=utf-8");
     ctx.body = {
       status: 'success',
       result: ctx.request.body
     };
   });
   
   app
     .use(router.routes())
     .use(router.allowedMethods());
   
   app.listen(3001);
   ```

   

2. 客户端:

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>测试</title>
   </head>
   <body>
     <script>
       fetch('http://localhost:3001/test', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json;charset=utf-8'
         },
         body: JSON.stringify({
           data: 'Test'
         })
       }).then(data => {
         console.log(data);
       })
     </script>
   </body>
   </html>
   ```

   