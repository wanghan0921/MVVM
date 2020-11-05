
class Compile {
    constructor (el, app) {
        // new Vue 可以传标签选择器 也可以传 元素
        this.el = typeof el == 'string' ? document.querySelector(el) : el
        this.app = app // 所有

        if (this.el) {
            new Observer(app.data)
            // 把节点全部转到内存中
            let fragment = this.node2Fragment(this.el)

            // 去解析 并编译
            this.compile(fragment)

            // 把节点放回根节点中
            this.el.appendChild(fragment)
        }
    }





    // 核心方法
    node2Fragment(node) {
        // 创建一个空的文档碎片
        let fragment = document.createDocumentFragment()
        // 获取所有子节点
        let childNodes = node.childNodes
        // 把节点添加到内存中
        this.toArray(childNodes).forEach(node => {
            fragment.appendChild(node)
        })

        return fragment
    }

    compile(fragment) {
        // 拿到所有的节点
        let childNodes = fragment.childNodes
        

        this.toArray(childNodes).forEach(node => {

            // 如果是元素节点
            if (this.isElementNote(node)) {

                // 解析
                this.compileElement(node)
            }

            // 如果是文本节点
            if (this.isTextNote(node)) {

                this.compileText(node)
            }

            // 如果当前节点还有子节点, 那么需要递归解析
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }

    compileElement(node) {
        // 拿到当前节点下的所有属性
        let attributes = node.attributes


        this.toArray(attributes).forEach(attr => {
            // 拿到节点的属性名
            let attrName = attr.name
            if (this.isDirective(attrName)) {
                
                // 把'v-'截取
                let type = attrName.slice(2)
                // 拿到属性值
                let attrValue = attr.value
                
                // if (type === 'text') {
                //     node.textContent = this.app.data[attrValue]
                // }

                // if (type === 'html') {
                //     node.innerHTML = this.app.data[attrValue]
                // }

                // if (type === 'model') {
                //     node.value = this.app.data[attrValue]
                // }

                if (this.isEventDirective(type)) {
                    compileUilt.eventHandle(node, type, this.app, attrValue)
                    // let eventType = type.split(':')[1]
                    // console.log(attrValue)
                    // node.addEventListener(eventType, this.app.methods[attrValue].bind(this.app))
                } else {
                    compileUilt[type](node, this.app, attrValue)
                }
            }
        })
    }

    compileText(node) {
        let text = node.nodeValue
        let reg = /\{\{(.+)\}\}/
        if (reg.test(text)) {
            let expr = RegExp.$1
            node.textContent = text.replace(reg, compileUilt.getAppValue(this.app, expr))
        }
    }









    // 工具
    //  类数组转数组
    toArray(likeArray) {
        return [].slice.call(likeArray)
    }

    // 判断是否是元素节点
    isElementNote(node) {
        // nodeType
        return node.nodeType == 1
    }

    // 判断是都是 文本节点
    isTextNote(node) {
        return node.nodeType == 3
    }

    // 判断是不是 'v-'开头的方法
    isDirective(attrName) {
        return attrName.startsWith('v-')
    }

    isEventDirective(attrName) {
        return attrName.split(':')[0] == 'on'
    }
}

let compileUilt = {
    text(node, app, attrValue) {
        node.textContent = this.getAppValue(app, attrValue)


        new Watcher(app, attrValue, newV => {
            node.textContent = newV
        })
    },
    html(node, app, attrValue) {
        node.innerHTML = this.getAppValue(app, attrValue)
        new Watcher(app, attrValue, newV => {
            node.innerHTML = newV
        })
    },
    model(node, app, attrValue) {
        let self = this
        node.value = this.getAppValue(app, attrValue)

        node.addEventListener('input', function () {
            // app.data[attrValue] = this.value
            self.setValue(app.data, attrValue, this.value)
        })
        new Watcher(app, attrValue, newV => {
            node.value = newV
        })
    },
    eventHandle(node, type, app, attrValue) {
        let eventType = type.split(':')[1]
        node.addEventListener(eventType, app.methods[attrValue].bind(app))
    },
    getAppValue(app, expr) {
        let data = app.data
        expr.split('.').forEach(item => {
            data = data[item]
        })
        return data
    },

    setValue(data, expr, value) {
        let arr = expr.split('.')
        arr.forEach((key, index) => {
            if (index < arr.length - 1) {
                data = data[key]
            } else {
                data[key] = value
            }
        })
    }
}