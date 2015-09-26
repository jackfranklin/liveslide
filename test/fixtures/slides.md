# ES6 with jspm

## Setup
- load up jspm registry in tab
- run server on port 3000
- check the wifi

## Getting Started
### Change: index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Open Sauce</title>
    <script src="jspm_packages/system.js"></script>
    <script src="config.js"></script>
    <script>
      System.import('app/main');
    </script>
  </head>
  <body>
  </body>
</html>
```

- Don't forget to talk about each of the scripts and how we import them
- use `jspm` Vim snippet to type this for you!
