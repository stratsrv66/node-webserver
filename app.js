const http = require('http')
const fs = require('fs')
const fileManager = require('./utils/fileManger')


fs.readFile('./config/server.json', (err, result) => {
    if (err) {
        console.log(err)
        return;
    }
        const serverConfig = JSON.parse(result)
        port = serverConfig.server.port
       startServer(port)
})

const returnRoute = (req, res) => {
    fs.readFile('./config/routes.json', (err, result) => {
        if (err) {
            console.log(err)
            return;
        }

        if (req.url.startsWith('/assets')) {

            fileManager.returnAsset(res, `.${req.url}`)
            return;
            
        }

        const routes = JSON.parse(result)
        routes.routes.forEach(route => {
            url = req.url.split('?')[0]

            if (url === route.path && req.method === route.method) {
                const fileAndFunction = route.function.split('@')
                const file = fileAndFunction[0]
                const functionToCall = fileAndFunction[1]
                
                callFunctionFromFile(`./manager/${file}`, functionToCall, req, res)
            }
        })
    })
}

const startServer = (port) => {
    const server = http.createServer((req, res) => {

        returnRoute(req, res)
    
    })
    
    
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    })
    
    
}    

function callFunctionFromFile(fileName, functionName, req, res) {
    // Charger dynamiquement le module à partir du nom de fichier
    const module = require(fileName);
    if (!module) {
        console.error('Le module spécifié n\'existe pas.');
        return null;
    }
    // Vérifier si la fonction spécifiée existe dans le module
    if (typeof module[functionName] === 'function') {
      // Appeler la fonction spécifiée avec des arguments supplémentaires si nécessaire
      const result = module[functionName](req, res);
  
      // Faire quelque chose avec le résultat si nécessaire
      return result;
    } else {
      console.error('La fonction spécifiée n\'existe pas dans le module.');
    }
  }

