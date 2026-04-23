using Microsoft.AspNetCore.Mvc;
using TallerPintura.Application.Contracts;
using TallerPintura.Application.DTOs;

namespace TallerPintura.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExposicionesController : ControllerBase
    {
        private readonly IExposicionService _service;

        public ExposicionesController(IExposicionService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpGet("activas")]
        public async Task<IActionResult> GetActivas()
        {
            var result = await _service.GetActivasAsync();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateExposicionDto dto)
        {
            var result = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateExposicionDto dto)
        {
            var result = await _service.UpdateAsync(id, dto);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpPost("{exposicionId}/obras/{obraId}")]
        public async Task<IActionResult> AgregarObra(int exposicionId, int obraId)
        {
            var result = await _service.AgregarObraAsync(exposicionId, obraId);
            return Ok(result);
        }
    }
}