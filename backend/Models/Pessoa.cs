namespace controle_gastos.Models;

public class Pessoa
{
    public int Id { get; set; }
    public string Nome {get; set; } = string.Empty;
    public int Idade {get; set; }

    public List<Transacao> Transacoes {get; set; } = new(); //informa ao entity que o relacionamento pessoa transações é de 1:N
}

//modelo da tabela Pessoas