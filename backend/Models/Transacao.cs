//modelo da tabela de transações. Cada objeto aqui será uma receita ou despesa vinculada a uma pessoa.

namespace controle_gastos.Models;

public class Transacao
{
    public int Id { get; set; }

    public string Descricao { get; set; } = string.Empty;

    public decimal Valor { get; set; }

    public string Tipo { get; set; } = string.Empty;

    public int PessoaId { get; set; } //chave estrangeira que guarda o id da pessoa que fez a transação

    public Pessoa? Pessoa { get; set; } //permite acessar os dados completos da pessoa associada a transação quando necessario
}