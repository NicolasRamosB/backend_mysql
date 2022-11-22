const {v4: uuidv4} = require('uuid');
const knex = require('knex');
 
class Container {
  constructor(knexConfig, tableName) {
    this.knexConfig = knexConfig;
    this.knex = knex(knexConfig)
    this.tableName = tableName
  }

  async save(product) {
    product.code = uuidv4();
    
    return new Promise((resolve, reject) => {
      this.knex(this.tableName).insert(product)
      .then(() => {
        resolve(product);

      }).catch(err => {
        reject(err);

      })
    })
  }


  async getAll() {
    try{      
      const data = await this.knex(this.tableName).select('*');    
      if(data.length == 0) {
        return {
          success: false,
          message: 'Empty products list.'
        }

      };
      const newData = data.map(i => {
        return JSON.parse(JSON.stringify(i));
      });
      return newData

    }catch(err) {
      return {
        success: false,
        message: err.message
      }
      
    }
  }
}

module.exports = Container;
