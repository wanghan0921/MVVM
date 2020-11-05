

class Vue {
    constructor(option = {}) {
        this.$el = option.el,  // app根元素
        this.data = option.data // 初始化时的数据
        this.methods = option.methods

        this.proxy(this.data)
        this.proxy(this.methods)
        if (this.$el) {
            new Compile(this.$el, this)  // 解析数据的类
        }
    }

    proxy(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                },
                set(newV) {
                    data[key] = newV
                }
            })
        })
    }
}