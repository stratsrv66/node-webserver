const fileManager = require('../utils/fileManger');

function index(req, res) {

    return fileManager.returnWebPage(res, './public/index.html')
    
}

module.exports = {
    index
}