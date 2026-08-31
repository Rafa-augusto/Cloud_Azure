import { useState } from 'react'
import Alunos from './pages/Alunos.jsx'
import Estoque from './pages/Estoque.jsx'

const TABS = [
  { id: 'alunos', label: 'Alunos' },
  { id: 'estoque', label: 'Estoque' },
]

function App() {
  const [tab, setTab] = useState('alunos')

  return (
    <div className="app">
      <header className="app-header">
        <span className="app-header__mark">GYMCRM</span>
        <nav className="app-nav">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`app-nav__item ${tab === t.id ? 'is-active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="app-main">
        {tab === 'alunos' && <Alunos />}
        {tab === 'estoque' && <Estoque />}
      </main>
    </div>
  )
}

export default App
