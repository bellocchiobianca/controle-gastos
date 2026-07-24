using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using controle_gastos.Date;
using controle_gastos.Models;

namespace controle_gastos.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacoesController : ControllerBase
{
    private readonly AppDbContext _context;

    public TransacoesController(AppDbContext context)
    {
        _context = context;
    }


    // GET: Lista todas as transações
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Transacao>>> GetTransacoes()
    {
        return await _context.Transacoes.ToListAsync();
    }


    // POST: Cadastra uma nova transação
    [HttpPost]
    public async Task<ActionResult<Transacao>> PostTransacao(Transacao transacao)
    {
        // procura a pessoa informada
        var pessoa = await _context.Pessoas.FindAsync(transacao.PessoaId);

        // verifica se a pessoa existe
        if (pessoa == null)
        {
            return NotFound("Pessoa não encontrada.");
        }


        // bloqueia um menor de idade cadastrar uma receita
        if (pessoa.Idade < 18 && transacao.Tipo.ToLower() == "receita")
        {
            return BadRequest("Menores de idade não podem cadastrar receitas.");
        }


        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();


        return CreatedAtAction(nameof(GetTransacoes), new { id = transacao.Id }, transacao);
    }
}