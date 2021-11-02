'use strict'

const arr = [{
    name: '张三',
    store: 99,
}, {
    name: '李四',
    store: 98,
}, {
    name: '王五',
    store: 98,
}, {
    name: '赵四',
    store: 96,
}, {
    name: '张好',
    store: 96,
}, {
    name: '李丽',
    store: 95,
}, {
    name: '王强',
    store: 95,
    ranking: 7,
}]

let prescore = 0 // 预定义分数
let ranking = 0 // 排名
let same = 0 // 是否相同

arr.forEach(item => {
    if (item.store == prescore) {
        item.ranking = ranking
        same++
    } else {
        ranking = ranking + same
        ranking++
        prescore = item.store
        same = 0
        item.ranking = ranking
    }
})
