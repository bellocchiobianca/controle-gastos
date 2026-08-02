import { useEffect, useState } from 'react'
import {API} from '../api'


interface Pessoa{
    id:number;
    nome: string;
    idade:number;
}

interface Transacao{
    id: number;
    descricao: string;
    valor: number;
    tipo: string;
    pessoaId: number
}

function Transacoes() {
 const [descricao, setDescricao] = useState('')
 const [valor, setValor] = useState('')
 const [pessoaId, setPessoaId] = useState(0)
 const [tipo, setTipo] = useState('Despesa')

 const [listaPessoas, setListaPessoas] = useState<Pessoa[]>([])
 const [listaTransacoes, setListaTransacoes] = useState<Transacao[]>([])

async function carregarPessoas(){
    const resposta = await fetch(`${API}/Pessoas`)
    const dados = await resposta.json()

    setListaPessoas(dados)
 }

 async function carregarTransacoes(){
    const resposta = await fetch(`${API}/Transacoes`)
    const dados = await resposta.json()

    setListaTransacoes(dados)
 }

 useEffect(()=>{
    carregarPessoas()
    carregarTransacoes()
},[])

 async function cadastrarTransacoes(){
    if (descricao === ''){return alert ("Obrigatório o preenchimento")}
    if (Number(valor) <=0){return alert("O valor não pode ser menor ou igual a zero")}//evita o cadastro de valores negativos
    if (pessoaId ===0) {return alert ("Obrigatório selecionar pessoa responsável pela despesa")}
    
  //da erro quando tenta lançar uma receita para menor de idade
    const resposta = await fetch(`${API}/Transacoes`, {
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        descricao,
        valor:Number(valor),
        tipo,
        pessoaId
    })
})

if(!resposta.ok){
    const erro = await resposta.text()
    return alert(erro)//se a API retornar erro (menor de idade tentando cadastrar receita), exibe a mensagem enviada pelo backend
}
        setDescricao('');setValor('');setPessoaId(0);setTipo('Despesa')
    
    carregarTransacoes()}

 
  
  return (
    <div>
        {/*Formulário */}
        <p><label>Descrição da Transação: </label>
        <input 
        value={descricao}
        onChange={(e)=>setDescricao(e.target.value)}/></p>

        <p><label>Valor R$:</label>
        <input type="number"  
        value={valor}
        onChange={(e)=>setValor(e.target.value)}/></p>

        <label>Pessoa que efetuou a transação: </label>
        <select value={pessoaId} onChange={(e)=>setPessoaId(Number(e.target.value))}>
            <option value={0}>Selecione</option>
            {listaPessoas.map(pessoa=>(<option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>))}
        </select> {/* A seleção é feita por uma lista de pessoas cadastradas para evitar erros de digitação e garantir que a transação seja vinculada a uma pessoa existente. */}

        <label>Tipo de Transação: </label>
        <select value={tipo} onChange={(e)=>setTipo(e.target.value)}><option value="Despesa">Despesa</option><option value="Receita">Receita</option></select>
        
        <button onClick={cadastrarTransacoes}>Cadastrar</button>
        <br></br>
        
        {/* Listagem*/}
        <h3>Transações Realizadas ({listaTransacoes.length})</h3>
        <ul>
    {listaTransacoes.map(transacao => {const pessoa = listaPessoas.find(
        pessoa => pessoa.id === transacao.pessoaId
    )//procura na lista de pssoas aquela cujo ID corresponde ao PessoaID da transação, para exibir o nome em vez do número
    return (
        <li key={transacao.id}>
            {transacao.descricao} - R$ {transacao.valor} - {transacao.tipo} - {pessoa?.nome}</li>
    )
})}</ul>
    </div> 
    )}
    

export default Transacoes