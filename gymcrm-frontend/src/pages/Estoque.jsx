import { useEffect, useState } from 'react'
import { API_ESTOQUE_URL } from '../api.js'

function nivelClass(quantidade) {
  return quantidade <= 5 ? 'badge badge--alert' : 'badge badge--ok'
}

function Estoque() {
  const [itens, setItens] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    fetch(API_ESTOQUE_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao buscar estoque')
        return res.json()
      })
      .then((data) => setItens(data))
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false))
  }, [])

  return (
    <section className="screen">
      <div className="screen__head">
        <h1>Estoque</h1>
        <p>Produtos disponíveis na academia e níveis de reposição.</p>
      </div>

      {carregando && <p className="state-msg">Carregando estoque...</p>}
      {erro && (
        <p className="state-msg state-msg--error">
          Não foi possível carregar o estoque: {erro}
        </p>
      )}

      {!carregando && !erro && (
        <table className="table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {itens.map((item) => (
              <tr key={item.id}>
                <td>{item.produto}</td>
                <td>{item.quantidade}</td>
                <td>
                  <span className={nivelClass(item.quantidade)}>
                    {item.quantidade <= 5 ? 'Estoque baixo' : 'Em estoque'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default Estoque
