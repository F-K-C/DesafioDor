const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001;

app.use(cors())
app.use(express.json());

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

app.get('/', (req, res) =>{
    res.send('OK')
})

// Endpoint para buscar o endereço pelo CEP
app.post('/buscar-endereco', async (req, res) => {
    const { cep } = req.body;
  
    try {
      const response = await fetch(`https://ws.apicep.com/cep.json?code=${cep}`);
      const data = await response.json();
  
      if (data.error) {
        res.status(404).json({ error: 'CEP não encontrado' });
      } else {
        res.json({
          address: data.address,
          district: data.district,
          city: data.city,
          state: data.state,
          code: data.code
        });
      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error.message);
      res.status(500).json({ error: 'Erro ao buscar endereço' });
    }
  });
  
app.listen(PORT, () => {
    console.log(`Ouvindo na porta:${PORT}`)
})