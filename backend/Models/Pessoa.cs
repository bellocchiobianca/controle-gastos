namespace controle_gastos.Models;

public class Pessoa
{
    public int Id { get; set; }
    public string Nome {get; set; } = string.Empty;
    public int Idade {get; set; }

    public List<Transacao> Transacoes {get; set; } = new(); //Estabelece um relacionamento 1:N , onde uma pessoa pode ter uma lista de transações.
}
//modelo da tabela Pessoas