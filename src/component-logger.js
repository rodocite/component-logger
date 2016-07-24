const elasticsearch = require('elasticsearch')

class ComponentLogger {
  constructor(host) {
    this.connection = ((host = 'localhost:9200') => {
        return new elasticsearch.Client({
          host: host
        })
      })(host)
  }

  sendProps(componentName, props) {
    this.connection.create({
      index: 'component_logger',
      type: 'props',
      body: {
        "name": componentName,
        "props": props,
        "created": Date.now()
      }
    })
  }
}

module.exports = host => {
  return new ComponentLogger(host)
}