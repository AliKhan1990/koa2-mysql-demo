let mysql = require('mysql')

const db_config = {
  dev: require('./../../config/mysqlDB_dev.json'),
  prod: require('./../../config/mysqlDB_prod.json')
}

let env = process.env.NODE_ENV || 'dev'

const DB_CONNECT_CONF = db_config[env]

class sqlCtrl {
  construsctor (type, sql_stm) {
    this.type = type
    this.sql_stm = sql_stm
  }
  async sqlControl (type, sql_stm) {
    const connection = mysql.createConnection(DB_CONNECT_CONF)
    console.log(`-------数据库连接！--------`)
    connection.connect()
    // 接收一个sql语句 以及所需的values
    // 这里接收第二参数values的原因是可以使用mysql的占位符 '?'
    // 比如 query(`select * from my_database where id = ?`, [1])
     console.log('1e21e21e12e2e-' + sql_stm)
    return new Promise(( resolve, reject ) => {
      connection.query(sql_stm, (err, rows) => {
        console.log(sql_stm)
        if (err) {
          reject(err)
        } else {
          resolve(rows)
          console.log(`--------------------------${type}----------------------------`)
          console.log(rows)
          console.log('------------------------------------------------------------\n\n')
        }
      })
    })
  }
}

module.exports = sqlCtrl
