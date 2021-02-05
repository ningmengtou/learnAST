// 这个方法是来出来 标签属性的
export default function (attrsString) {
  // 如果 attrsString 是 undefined 就返回空数组
  if (attrsString == undefined) {
    return []
  }

  // 设置接收结果为数组
  let result = []
  // 是否遍历在引号中
  let toMarks = false
  // 断点
  let point = 0

  // 遍历 attrsString 
  for (let i = 0; i < attrsString.length; i++) {
    let chrat = attrsString[i]
    // 第一次遇到引号
    if (chrat == '"') {
      // toMarks 取反为 true 
      toMarks = !toMarks
    } else if (chrat == ' ' && toMarks == false) {
      // 当遇到空格并且 toMarks 为 false 表示之前的是一个属性
      if (attrsString.substring(point, i).trim().length > 0) {
        // 把获取到的值添加到 result 中
        result.push(attrsString.substring(point, i).trim())
        // point 为最新的 i
        point = i
      }
    }
  }
  // 把后面的属性也添加到result中
  if (attrsString.substring(point).trim().length > 0) {
    result.push(attrsString.substring(point).trim())
  }

  // 出来result中的元素以对象形式添加进去
  result = result.map(item => {
    return {
      name: item.match(/^(.+)="(.+)"$/)[0],
      value: item.match(/^(.+)="(.+)"$/)[1]
    }
  })

  return result
}