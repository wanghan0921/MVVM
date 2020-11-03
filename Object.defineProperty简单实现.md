```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    

    <script>

        let obj = {
            name: 'wanghan'
        }

        let value = obj.name
        Object.defineProperty(obj, 'name', {
            get() {
                console.log('get')
                return value
            },
            set(v) {
                console.log('set')
                console.log(v)
                value = v
            }
        })
    </script>
</body>
</html>
```
