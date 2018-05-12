let sqlCtrl = require('./sql-tools/sqlCtrl')

// mysql, dbc, type, sql_stm

class BaseService {
    constructor(props) {
      this.model = props
    }
    async getList(offset = 0, limit = 10) {
      let sql = `SELECT * FROM ${ this.model.name } LIMIT ${ limit } OFFSET ${offset}`
      let ctrl = new sqlCtrl()
      let res = await ctrl.sqlControl('QUERY', sql)
      return res
    }

    async getById(offset = 0, limit = 10, t_fields) {
      let sql = `SELECT * FROM ${ this.model.name } WHERE ${t_fields} LIMIT ${ limit } OFFSET ${offset}`
      let ctrl = new sqlCtrl()
      let res = await ctrl.sqlControl('QUERYID', sql)
      return res
    }

    async add(originalParam) {
      // keys: [ 'id', 'date', 'title', 'news_id' ]
      let params = []
      Object.keys(this.model.keys).forEach(item => {
        let key = this.model.keys[item]
        if (originalParam[key]) {
          params.push(`'${originalParam[key]}'`)
        }
      })
      let sql = `INSERT INTO ${this.model.name}(${String(this.model.keys)}) VALUES(0,${String(params)})`
      let ctrl = new sqlCtrl()
      let res = await ctrl.sqlControl('INSERT', sql)
      return res
    }

    async addBatch(infos){
      const result = []
      for (let info of infos) {
        result.push(await this.add(info))
      }
      return {
        result: result
      } 
    }

    async update(originalParam, id) {
      let params = []
      Object.keys(this.model.keys).forEach(item => {
        let key = this.model.keys[item]
        if (originalParam[key]) {
          params.push(`${key}='${originalParam[key]}'`)
        }
      })
      console.log(params)
      let sql = `UPDATE ${this.model.name} SET ${params} WHERE id=${id}`
      let ctrl = new sqlCtrl()
      let res = await ctrl.sqlControl('UPDATE', sql)
      return res
    }

    async deleteById(id) {
      let sql = `DELETE FROM ${this.model.name} where id=${id}`
      let ctrl = new sqlCtrl()
      let res = await ctrl.sqlControl('DELETE', sql)
      return res
    }
}
module.exports = BaseService;