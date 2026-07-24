import { useState } from 'react'
import './App.css'
import Pessoas from './pages/pessoas'
import Transacoes from './pages/transacoes'
import Totais from './pages/totais'

type Tela = 'Pessoas' | 'Transações' | 'Totais'

function App() {
 const [tela, setTela] = useState<Tela>('Pessoas')

  
  return (
    <div><h1>CONTROLE DE GASTOS</h1>
    <nav className="menu">
      <button onClick={()=>setTela('Pessoas')}>Pessoas</button>
      <button onClick={()=>setTela('Transações')}>Transações</button>
      <button onClick={()=>setTela('Totais')}>Totais</button>
    </nav>
    <hr className = 'Linha'/>
    {tela==='Pessoas' && <Pessoas />} 
    {tela==='Transações'&&<Transacoes />}
    {tela==='Totais'&& <Totais />}
    </div> 
)}
export default App
