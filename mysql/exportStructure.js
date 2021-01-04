const mysql = require("mysql2")
const xlsx = require('node-xlsx')
const path = require('path')
const fse = require('fs-extra')

// 数据库配置
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "mysql",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// 数据库查询
function query (sql) {
  return new Promise(function (resolve, reject) {
    return pool.query(sql, (err, rows, fields) => {
      if (err) {
        return reject(err)
      }
      rows = JSON.parse(JSON.stringify(rows))
      return resolve(rows)
    })
  })
}

// 生成excel文件
function gennerateExcel (data = [], dir = './') {
  const buffer = xlsx.build([{ name: 'Sheet1', data: data }])
  const filename = `${Date.now()}.xlsx`
  let filePath = path.resolve(__dirname, dir)
  fse.ensureDirSync(filePath)
  filePath = `${filePath}/${filename}`
  fse.writeFileSync(filePath, buffer, 'binary')
}

async function exec () {
  const rows = await query('show tables')
  const tables = rows.map(table => table.Tables_in_mysql)
  // 需要导出的表结构字段
  const FIELDS = ['Field', 'Type', 'Null', 'Key', 'Default', 'Extra']
  // exlce数据
  const data = []
  for (const table of tables) {
    // 添加表名和表头
    data.push([table], FIELDS)
    const tableDesc = await query(`desc ${table}`)
    tableDesc.forEach(item => {
      data.push(FIELDS.map(field => item[field]))
    })
    // 添加两条空行 隔开每个表
    data.push([], [])
  }
  await gennerateExcel(data, './files')
  console.log('------end-------')
}

exec()
  .then(() => {
    process.exit(0)
  })
