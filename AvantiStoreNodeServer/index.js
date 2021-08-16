const express = require('express')
const path = require('path')

app = express()
app.set('views', path.join(__dirname, 'views'))
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/views/index.html');
})

//Definindo diretório de arquivos CSS
app.use(express.static(path.join(__dirname, 'public')))

app.listen(3000, err=>{
    if(err){
        console.log('The server is not running. Some error was verified.')
    }else{
        console.log('Server is online!Check: http://localhost:3000')
    }
})