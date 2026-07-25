using Microsoft.EntityFrameworkCore;
using controle_gastos.Models;

namespace controle_gastos.Date;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}


public DbSet<Pessoa> Pessoas {get; set; }
public DbSet<Transacao> Transacoes {get; set;}

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Transacao>() //configura o relacionamento entre Pessoa e Transação e define o comportamento ao excluir registros.
        .HasOne(t => t.Pessoa)
        .WithMany(p => p.Transacoes)
        .HasForeignKey(t => t.PessoaId)
        .OnDelete(DeleteBehavior.Cascade);
}
}

//o EntityFramework consegue usar essa classe para gerar as tabeas do banco de dados

//modelBuilder é para configurar relacionamento Pessoa/Transação