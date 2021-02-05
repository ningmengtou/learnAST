import parse from './parse.js'

// 定义模板字符串 暂时只考虑双标签
var templateStr = `<div>
          <h3 class="box" id="2"    >你好</h3>
          <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
          </ul>
        </div>`

// 使用parse方法来让模板字符串转换为ast语法树
const ast = parse(templateStr)

console.log(ast);