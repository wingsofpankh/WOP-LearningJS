const fs = require('fs');
const generate = () => {
  var properties = [];
  var initialPath = 'src/res/fonts';
  var replacePath = initialPath.replace(
    '/' + initialPath.split('/').slice(-1).pop(),
    '',
  );

  function readRecursive(dirPath) {
    var key = dirPath.split('/').slice(-1).pop();
    var val = [];
    fs.readdirSync(dirPath, {withFileTypes: true}).forEach((item) => {
      if (item.isDirectory()) {
        readRecursive(dirPath + '/' + item.name);
      } else {
        if (!item.name.startsWith('.DS_St')) {
          var key = item.name.replace('.ttf', '').replace('.otf', '');
          let property = `'${key}': '${key}'`;
          if (dirPath === initialPath) {
            properties.push(property);
          } else {
            val.push(property);
          }
        }
      }
    });
    if (val.length > 0) {
      const prop = `'${key}': {
    ${val.join(',\n    ')},
  }`;
      properties.push(prop);
    }
  }

  readRecursive(initialPath);

  const string =
    properties.length == 0
      ? ''
      : `const fonts = {
  ${properties.join(',\n  ')},
};

export default fonts;
`;
  fs.writeFileSync(replacePath + '/fonts.js', string, 'utf8');
};

generate();
