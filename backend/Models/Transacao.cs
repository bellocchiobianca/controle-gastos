//modelo da tabela de transações. Cada objeto aqui será uma receita ou despesa vinculada a uma pessoa.

namespace controle_gastos.Models;

public class Transacao
{
    public int Id { get; set; }

    public string Descricao { get; set; } = string.Empty;

    public decimal Valor { get; set; } //o uso do decimal é mais adequado para valores financeiros, pois o double utiliza base binária e poderia dificultar na representação de frações simples, como erros de arredondamentos

    public string Tipo { get; set; } = string.Empty;

    public int PessoaId { get; set; } //chave estrangeira que guarda o id da pessoa que fez a transação

    public Pessoa? Pessoa { get; set; } //mantenho o ? para informar ao compilador que a propriedade pode estar nula até que o Entity Framework carregue os dados da pessoa do banco.
}