import { useEffect, useState } from 'react'
import { API_ALUNOS_URL } from '../api.js'

function statusClass(status) {
  return status === 'Inadimplente' ? 'badge badge--alert' : 'badge badge--ok'
}

function Alunos() {
  const [alunos, setAlunos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    fetch(API_ALUNOS_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao buscar alunos')
        return res.json()
      })
      .then((data) => setAlunos(data))
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false))
  }, [])

  return (
    <section className="screen">
      <div className="screen__head">
        <h1>Alunos</h1>
        <p>Matrículas ativas e status de pagamento da academia.</p>
      </div>

      {carregando && <p className="state-msg">Carregando alunos...</p>}
      {erro && (
        <p className="state-msg state-msg--error">
          Não foi possível carregar os alunos: {erro}
        </p>
      )}

      {!carregando && !erro && (
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Plano</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.nome}</td>
                <td>{aluno.plano}</td>
                <td>
                  <span className={statusClass(aluno.status)}>{aluno.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default Alunos
