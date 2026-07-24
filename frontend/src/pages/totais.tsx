import { useEffect, useState } from "react"
import {API} from '../api'

interface Pessoa {
    id:number;
    nome:string;
    idade:number;}

interface Transacao {
    id:number;
    descricao:string;
    valor:number;
    tipo:string;
    pessoaId:number;
}

function Totais() {
    const [listaPessoas, setListaPessoas]=useState<Pessoa[]>([])
    const [listaTransacoes, setListaTransacoes]=useState<Transacao[]>([])

async function carregarDados(){
    const respostaPessoas = await fetch(`${API}/Pessoas`)
    const dadosPessoas = await respostaPessoas.json()
    const respostaTransacoes = await fetch(`${API}/Transacoes`)
    const dadosTransacoes = await respostaTransacoes.json()

    setListaPessoas(dadosPessoas)
    setListaTransacoes(dadosTransacoes)
}
useEffect(()=>{carregarDados()},[])

const totalReceitas = listaTransacoes
    .filter(t => t.tipo.toLowerCase() === "receita")
    .reduce((total, t) => total + t.valor, 0)
const totalDespesas = listaTransacoes
    .filter(t => t.tipo.toLowerCase() === "despesa")
    .reduce((total, t) => total + t.valor, 0)
const totalSaldo = totalReceitas - totalDespesas
 
    /*Cria uma tabela com os totais por pessoa e o total geral*/
  return (
    <div>
        <table>
            <thead><tr>
                <th>Pessoa</th>
                <th>Receitas</th>
                <th>Despesas</th>
                <th>Saldo</th>
            </tr></thead>
            <tbody>
                {listaPessoas.map(pessoa => {

                const transacoesPessoa = listaTransacoes.filter(transacao => transacao.pessoaId === pessoa.id)

                const receitas = transacoesPessoa
                    .filter(t => t.tipo.toLowerCase() === "receita")
                    .reduce((total,t)=> total + t.valor,0)

                const despesas = transacoesPessoa
                    .filter(t => t.tipo.toLowerCase() === "despesa")
                    .reduce((total,t)=> total + t.valor,0)

                const saldo = receitas - despesas
                
                return(
                <tr key={(pessoa.id)}>
                    <td>{pessoa.nome} </td>
                    <td>R$ {receitas.toFixed(2)}</td>
                    <td>R$ {despesas.toFixed(2)}</td>
                    <td>R$ {saldo.toFixed(2)}</td>
                </tr>)})}
            </tbody>
            <tfoot>
                <tr>
                    <td>TOTAL GERAL</td>
                    <td>R$ {totalReceitas.toFixed(2)}</td>
                    <td>R$ {totalDespesas.toFixed(2)}</td>
                    <td>R$ {totalSaldo.toFixed(2)}</td>
                </tr>
            </tfoot>
        </table>
    </div> 
)}
export default Totais