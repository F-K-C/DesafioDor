import React, { useState } from "react"
import './Styles/Cep.css'
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
        //fetch('') backend aqui
    }

    return (
        <><div className="container">
            <h1 className="texto">Digite o CEP abaixo</h1>

            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <input type="text" name='tracking' className="form-control" onChange={handleInputChange} />
                    <button type="submit" name='trackCEP' className="btn btn-primary" onClick={getAddress}>Enviar</button>
                </div>
            </form>
            {
                error ? (
                    <p>{error}</p>
                ) : address ? (
                    <div className="list-group">
                        <br></br>
                        <li className="list-group-item"><strong>Rua: </strong> {address.address}</li>
                        <li className="list-group-item"><strong>Bairro: </strong> {address.district}</li>
                        <li className="list-group-item"><strong>Cidade: </strong> {address.city}</li>
                        <li className="list-group-item"><strong>Estado: </strong> {address.state}</li>
                        <li className="list-group-item"><strong>Cep: </strong> {address.code}</li>
                    </div>
                ) : null
            }
        </div>
        </>
    )
}

export default Cep