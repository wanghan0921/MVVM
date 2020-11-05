/*
 observer用于给data中所有的数据添加getter 和 setter
 方便我们在获取或者设置data中数据的时候, 实现我们的逻辑
*/

class Observer {
    constructor(data) {
        this.data = data
        console.log(data)
        this.walk(data)
    }

    walk(data) {
        if (!data || typeof data != 'object') {
            return
        }

        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])

            this.walk(data[key])
        })
    }

    // data中的每一个数据 , 都应该维护一个dep对象
    defineReactive(obj, key, value) {
        let self = this
        let dep = new Dep
        Object.defineProperty(obj, key, {
            get() {
                
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(v) {
                if (v === value) return
                console.log('set')
                value = v
                self.walk(v)

                // window.watcher.update()
                dep.notify()
            }
        })
    }
}