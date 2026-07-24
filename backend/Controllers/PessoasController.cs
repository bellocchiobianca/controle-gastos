using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using controle_gastos.Date;
using controle_gastos.Models;

namespace controle_gastos.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoasController : ControllerBase
{
    private readonly AppDbContext _context; //conecta com o banco de dados para fazer consultas e gravações

    public PessoasController(AppDbContext context)
    {
        _context = context;
    }

    // GET: Lista todas as pessoas cadastradas
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pessoa>>> GetPessoas()
    {
        return await _context.Pessoas.ToListAsync();
    }

    // POST: Cadastra uma nova pessoa
    [HttpPost]
    public async Task<ActionResult<Pessoa>> PostPessoa(Pessoa pessoa)
    {
        _context.Pessoas.Add(pessoa);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPessoas), new { id = pessoa.Id }, pessoa);
    }

    //DELETE: exclui a pessoa e todas as suas transações
    [HttpDelete("{id}")]
public async Task<IActionResult> DeletePessoa(int id)
{
    var pessoa = await _context.Pessoas.FindAsync(id);

    if (pessoa == null)
    {
        return NotFound();
    }

    var transacoes = _context.Transacoes
        .Where(t => t.PessoaId == id);

    _context.Transacoes.RemoveRange(transacoes);

    _context.Pessoas.Remove(pessoa);

    await _context.SaveChangesAsync();

    return NoContent();
}

    // GET: Consulta de totais
    [HttpGet("totais")]
    public async Task<IActionResult> GetTotais()
    {
        var pessoas = await _context.Pessoas
            .Include(p => p.Transacoes) 
            .ToListAsync();


        var resultado = pessoas.Select(p => new
        {
            Pessoa = p.Nome,

            TotalReceitas = p.Transacoes
                .Where(t => t.Tipo.ToLower() == "receita")
                .Sum(t => t.Valor),

            TotalDespesas = p.Transacoes
                .Where(t => t.Tipo.ToLower() == "despesa")
                .Sum(t => t.Valor),

            Saldo = p.Transacoes
                .Where(t => t.Tipo.ToLower() == "receita")
                .Sum(t => t.Valor)
                -
                p.Transacoes
                .Where(t => t.Tipo.ToLower() == "despesa")
                .Sum(t => t.Valor)
        });


        var totalGeral = new
        {
            TotalReceitas = resultado.Sum(x => x.TotalReceitas),

            TotalDespesas = resultado.Sum(x => x.TotalDespesas),

            Saldo = resultado.Sum(x => x.Saldo)
        };


        return Ok(new
        {
            Pessoas = resultado,
            TotalGeral = totalGeral
        });
}}