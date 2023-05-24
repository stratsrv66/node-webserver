const fs = require('fs')

function returnWebPage(res, path) {
    fs.readFile(path, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.end(result);
        }
    });
}


const returnJson = (res, path) => {
    fs.readFile(path, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            const json = JSON.parse(result)
            res.end(JSON.stringify(json))
        }
    })
}

const returnImage = (res, path) => {
    fs.readFile(path, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.end(result)
        }
    })
}

const returnCss = (res, path) => {
    fs.readFile(path, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.end(result)
        }
    })
}

const returnJs = (res, path) => {
    fs.readFile(path, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.end(result)
        }
    })
}

const returnAsset = (res, path) => {
    fs.readFile(path, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.end(result)
        }
    })
}

const return404 = (res) => {
    res.end('404')
}

const urlToData = (url) => {
    datas = []
    data = url.split('?')[1]
    data.split('&').forEach(element => {
        args = element.split('=')
        datas[args[0]] = args[1]
    });
    return datas
}

module.exports = {
    returnWebPage,
    returnJson,
    returnImage,
    returnCss,
    returnJs,
    returnAsset,
    return404,
    urlToData
}