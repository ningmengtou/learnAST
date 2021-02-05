import parseAttrsString from './parseAttrsString.js'

// parse 就是主函数能转换模板字符串
export default function parse(templateStr) {
  // 指定指针
  let index = 0
  // 指定开始标签
  let startReg = /^\<([a-z]+[0-9]?)(\s[^\<]+)?\>/
  // 指定结束标签
  let endReg = /^\<\/([a-z]+[0-9]?)\>/
  // 抓取标签中的文本
  let wordReg = /^([^\<]+)\<\/[a-z]+[1-6]?\>/
  // 指定剩余部分
  let rest = ''
  // 指定两个栈 栈二有默认项children
  let stack1 = []
  let stack2 = [{
    'children': []
  }]

  while (index < templateStr.length - 1) {
    // 获取剩余部分
    rest = templateStr.substring(index)
    if (startReg.test(rest)) {
      // 如果剩余部分是以开始标签开头
      // 获取到开始标签中的标签名
      let tag = rest.match(startReg)[1]
      // 获取到标签属性
      let attrs = rest.match(startReg)[2]


      // if (attrs != undefined) {
      //   

      // }

      parseAttrsString(attrs)
      // 栈1推入标签 栈2推入对象
      stack1.push(tag)
      stack2.push({
        'tag': tag,
        'children': [],
        'attrs': parseAttrsString(attrs)
      })
      // attrs 没有值 所以需要判断来取长度
      const attrsLength = attrs ? attrs.length : 0

      // 加 2 是因为开始标签是 <>
      index += tag.length + 2 + attrsLength
    } else if (endReg.test(rest)) {
      // 如果剩余部分是以结束标签开头
      // 获取到结束标签的标签名
      let tag = rest.match(endReg)[1]
      // 获取 stack1 栈顶的项
      let stack1Pop = stack1.pop()

      // 判断结束标签是否和栈顶的标签一致
      if (tag == stack1Pop) {
        // 弹出 stack2 的栈顶项
        let stack2Pop = stack2.pop()
        // 判断 stack2 是否为空
        if (stack2.length > 0) {
          // 把之前弹出的项追加到 stack2 的栈顶 children 中
          stack2[stack2.length - 1].children.push(stack2Pop)
        }
      }
      // 加 3 是因为结束吧标签是 </>
      index += tag.length + 3

    } else if (wordReg.test(rest)) {
      // 如果剩余部分是以文字开头
      // 获取到文字内容
      let word = rest.match(wordReg)[1]
      if (word.trim() != '') {
        // 如果文本不是空
        // 把文本追加到 stack2 的栈顶 children 中
        stack2[stack2.length - 1].children.push({ 'text': word, 'type': 3 })
      }
      index += word.length
    } else {
      index++
    }
  }
  // 返回 stack2 中 children 中的第一项
  return stack2[0].children[0]
}