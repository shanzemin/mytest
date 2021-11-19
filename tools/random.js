/**
 * 按照权重出随机区间的值
 */

 function random({ rates = [] }) {
    const sum = 100
    const random = Math.ceil(Math.random() * sum)
    const weight = []
    rates.forEach(item => {
        if (!weight.length) {
            weight.push(item)
        } else {
            weight.push(weight[weight.length - 1] + item)
        }
    })
    // 将产生的随机数存入到权重数组中
    weight.push(random)
    const sortWeight = weight.sort((a, b) => a - b)
    // 获取随机数对应的索引
    const index = sortWeight.indexOf(random)
    return index
}

const obj = {}

for (let i = 0; i < 20; i++) {
    const index = random({ rates: [20, 20, 20, 40] })
    if (obj[index] && obj[index] !== 0) {
        obj[index] += 1
    } else {
        obj[index] = 1
    }
}

console.log(obj);
