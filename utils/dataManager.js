const fs = require('fs')
const path = require('path');

function createData(name) {
  const directoryPath = path.join(__dirname, '../data');
  const filePath = path.join(directoryPath, `${name}.json`);

  if (fs.existsSync(filePath)) {
    return 'File already exists';
  }

  // Create the directory if it doesn't exist
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  fs.writeFile(filePath, '', (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`File ${filePath} has been created successfully.`);
  });
}

function deleteData(name) {
  const filePath = path.join(__dirname, `../data/${name}.json`);

  if (!fs.existsSync(filePath)) {
    return 'File does not exist';
  }

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`File ${filePath} has been deleted successfully.`);
  });
}



function readData(name){
    path = `../data/${name}.json`

    if (!fs.existsSync(path)) {
        return 'File does not exist'
    }

    fs.readFile(path, (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        return result
    })
}

function editFile(filePath, property, data) {
  fs.readFile(filePath, 'utf8', (err, fileContent) => {
    if (err) {
      console.error(err);
      return;
    }

    try {
      const jsonContent = JSON.parse(fileContent);
      const properties = property.split('.');
      let currentObject = jsonContent;

      // Traverse the nested object to locate the property
      for (let i = 0; i < properties.length - 1; i++) {
        const currentProperty = properties[i];
        if (!currentObject.hasOwnProperty(currentProperty)) {
          console.error(`Property "${property}" not found creating it.`);
          return;
        }
        currentObject = currentObject[currentProperty];
      }

      // Update the property value
      const lastProperty = properties[properties.length - 1];
      currentObject[lastProperty] = data;

      // Write the updated JSON back to the file
      const updatedJson = JSON.stringify(jsonContent, null, 2);
      fs.writeFile(filePath, updatedJson, 'utf8', (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`File "${filePath}" has been successfully updated.`);
        }
      });
    } catch (error) {
      console.error(`Error parsing JSON file: ${error.message}`);
    }
  });
}


module.exports = {
    createData,
    deleteData,
    readData,
    editFile
}
