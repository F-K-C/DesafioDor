const express = require('express')
const app = express()
const PORT = 3001

app.listen(PORT, () => console.log(`Ouvindo na porta:${PORT}`))

app.get('/', (req, res) =>{
    res.send('OK')
})