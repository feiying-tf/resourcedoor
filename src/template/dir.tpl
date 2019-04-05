<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{title}}</title>
    <style>
        a {
      margin-top: 5px;
      padding-left: 10px;
      font-size: 20px;
      text-decoration: none;
      display: block;
      color: #444;
      line-height: 1.5em;
      background-color: #eee;
    }
    a:hover {
      color: #222;
      /* font-size: 700px; */
      font-weight: 700;
      background-color: #ccc;
    }
    span {
      color: #00e;
    }
    </style>
</head>
<body>
{{#each files}}
    <a href="{{../dir}}/{{file}}">
     <span>【{{icon}}】</span>
     {{file}}
    </a>
{{/each}}
</body>
</html>
