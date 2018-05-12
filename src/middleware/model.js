const fs = require('fs')

let models = {};
const path = __dirname + '/../model/';
function buildModels() {
  const files = fs.readdirSync(path)
  files.forEach((file) => {
    const modelProperty = require(path + file)
    const modelName = file.substr(0, file.length - 3)
    models[modelName] = modelProperty
  })
}

function getModel(name) {
  let model = models[name];
  if (model) {
    return model
  } else {
    throw `you do not define a model [${name}]`
  }
}

buildModels()

console.log('------models inited: ', Object.keys(models))

module.exports = getModel;
