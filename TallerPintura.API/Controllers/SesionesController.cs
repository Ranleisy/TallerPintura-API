using Microsoft.AspNetCore.Mvc;
using TallerPintura.Application.Contracts;
using TallerPintura.Application.DTOs;

namespace TallerPintura.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SesionesController : ControllerBase
    {
        private readonly ISesionService _service;

        public SesionesController(ISesionService service)
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

        [HttpGet("proximas")]
        public async Task<IActionResult> GetProximas()
        {
            var result = await _service.GetProximasAsync();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSesionDto dto)
        {
            var result = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateSesionDto dto)
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

        [HttpPost("{sesionId}/inscribir/{estudianteId}")]
        public async Task<IActionResult> Inscribir(int sesionId, int estudianteId)
        {
            var result = await _service.InscribirEstudianteAsync(sesionId, estudianteId);
            return Ok(result);
        }
    }
}