import React, { useState } from "react"

function Cep() {
    const [cep, setCep] = useState('')
    const [address, setAddress] = useState(null)
    const [error, setError] = useState(null)

    const getAddress = async () =>{
        try {
            const response = await fetch(`https://ws.apicep.com/cep.json?code=${cep}`)
            const data = await response.json()
            
            if(data.erro){
                setError('CEP não encontrado')
                setAddress(null)
            }else {
                setAddress(data)
                setError(null)
            }
        } catch (error) {
            setError('Erro ao buscar os dados, tente novamente!')
            setAddress(null)
        }        
    }

    const handleInputChange = (event) =>{
        setCep(event.target.value)
    }

    return (
      <>
        <h1>Digite o CEP abaixo</h1>
        <input type="text" onChange={handleInputChange} />
        <button onClick={getAddress}>Enviar</button>
      </>
    )
  }
  
  export default Cep
