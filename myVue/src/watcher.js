
class Watcher{
    //app  -- vue实例
    //expr -- 监视的数据的名字
    //cb -- 回调函数, 如果数据发生变化, 就调用
    constructor(app, expr, cb) {
        this.app = app
        this.expr = expr
        this.cb = cb

        Dep.target = this
        // 需要把expr的旧值获取并存起来
        this.oldV = this.getAppValue(app, expr)

        Dep.target = null
    }

    update() {
        // 获取旧值
        let oldV = this.oldV
        // 变化时 , 获取新值
        let newV = this.getAppValue(this.app, this.expr)

        if (newV !== oldV) {
            this.cb(newV, oldV)
        }
    }

    getAppValue(app, expr) {
        let data = app.data
        expr.split('.').forEach(item => {
            data = data[item]
        })
        return data
    }
}


// 用于管理管理所有的订阅者 和 通知这些订阅者
class Dep {
    constructor() {

        // 用于管理订阅者
        this.subs = []
    }

    // 添加订阅者
    addSub(watcher) {
        this.subs.push(watcher)
    }


    //  通知订阅者
    notify() {
        // 通知所有订阅者 ,调用watcher中的update
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}