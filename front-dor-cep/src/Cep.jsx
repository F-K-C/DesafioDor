import React, { useState } from "react"
//
function Cep() {
    const [cep, setCep] = useState('')
    const [address, setAddress] = useState(null)
    const [error, setError] = useState(null)

    const getAddress = async () => {
        try {
            const response = await fetch(`https://ws.apicep.com/cep.json?code=${cep}`)
            const data = await response.json()

            if (data.error) {
                setError('CEP não encontrado')
                setAddress(null)
            } else {
                setAddress(data)
                setError(null)
            }
        } catch (error) {
            setError('Erro ao buscar os dados, tente novamente!')
            setAddress(null)
        }
    }

    const handleInputChange = (event) => {
        setCep(event.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <><div className="container">
            <h1>Digite o CEP abaixo</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <input type="text" name='tracking' className="form-control" onChange={handleInputChange} />
                </div>
                <button type="submit" name='trackCEP' className="btn btn-primary" onClick={getAddress}>Enviar</button>
            </form>
        </div>

            {
                error ? (
                    <p>{error}</p>
                ) : address ? (
                    <div>
                        <p><strong>Rua: </strong> {address.address} </p>
                        <p><strong>Bairro: </strong> {address.district} </p>
                        <p><strong>Cidade: </strong> {address.city} </p>
                        <p><strong>Estado: </strong> {address.state} </p>
                        <p><strong>Cep: </strong> {address.code} </p>
                    </div>
                ) : null
            }
        </>
    )
}

export default Cep