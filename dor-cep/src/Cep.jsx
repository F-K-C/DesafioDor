
function Cep() {

    const getAddress = async () =>{
        try {
            const response = await fetch('https://ws.apicep.com/cep.json?code=XXX')
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }        
    }

    const handleInputChange = (event) =>{
        console.log(event.target.value)
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
