```js
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
```
