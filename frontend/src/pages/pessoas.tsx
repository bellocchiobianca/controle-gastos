import { useEffect, useState } from 'react'
import { API } from '../api'

interface Pessoa{
    id:number;
    nome:string;
    idade:number;
}

function Pessoas(){

const [nome,setNome] = useState('')
const [idade,setIdade] = useState('')
const [listaPessoas,setListaPessoas] = useState<Pessoa[]>([])


async function carregarPessoas(){

    const resposta = await fetch(`${API}/Pessoas`)
    const dados = await resposta.json()

    setListaPessoas(dados)
}


useEffect(()=>{carregarPessoas()},[])

async function cadastrarPessoa(){

    if(nome===''){
        return alert("Obrigatório preencher nome")
    }

    await fetch(`${API}/Pessoas`,
    {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            nome,
            idade:Number(idade)
        })
    })


    setNome(''); setIdade('');
    carregarPessoas()
}

async function excluirPessoa(id:number){
    if(!confirm("Deseja excluir essa pessoa?"))
        return; await fetch (`${API}/Pessoas/${id}`,{
        method:"DELETE"});

        carregarPessoas();
}

return(
<div>
<p> <label>Nome:</label> <input value={nome} onChange={(e)=>setNome(e.target.value)}/></p>

<p><label>Idade:</label><input type="text" value={idade}
    onChange={(e)=>setIdade(e.target.value)}/></p>

<button onClick={cadastrarPessoa}>Cadastrar</button>


<h3>Pessoas cadastradas ({listaPessoas.length})</h3>
<ul>
{listaPessoas.map(pessoa=>(
<li key={pessoa.id}>
<strong>{pessoa.nome}</strong> - <span>{pessoa.idade} anos </span><button onClick={() => excluirPessoa(pessoa.id)}>[Excluir]</button>
</li>
))}</ul>

</div>
)

}

export default Pessoas