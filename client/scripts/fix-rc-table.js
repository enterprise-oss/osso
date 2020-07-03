const path = require('path');
const fs = require('fs');

const fileList = ['BodyContext.js', 'ResizeContext.js', 'TableContext.js'];
const folder = path.resolve(__dirname, '../../node_modules/rc-table/es/context');

fileList.forEach(item => {
  const file = path.resolve(folder, item);
  const context = fs.readFileSync(file).toString();
  if (!/console/mg.test(context)) {
    fs.writeFileSync(file, `${context}console.log('${item}')`)
  }
})