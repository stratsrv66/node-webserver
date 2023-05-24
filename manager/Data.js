const dataManager = require('../utils/dataManager');
const fileManager = require('../utils/fileManger');

function create(req, res) {

    const data = fileManager.urlToData(req.url);
    let action, name = ""
    for (let key in data) {
        switch (key) {
            case "action":
                action = data[key]
                break;
            case "name":
                name = data[key]
                break;
            default:
                break;
        }
    }

    switch (action) {
        case "create":
            dataManager.createData(name)
            break;
        case "delete":
            dataManager.deleteData(name)
            break;
        default:
            break;
    }

    return fileManager.returnWebPage(res, './public/index.html')
    
}

module.exports = {
    create
}
