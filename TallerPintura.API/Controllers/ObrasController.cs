using Microsoft.AspNetCore.Mvc;
using TallerPintura.Application.Contracts;
using TallerPintura.Application.DTOs;

namespace TallerPintura.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ObrasController : ControllerBase
    {
        private readonly IObraService _service;

        public ObrasController(IObraService service)
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

        [HttpGet("estudiante/{estudianteId}")]
        public async Task<IActionResult> GetByEstudiante(int estudianteId)
        {
            var result = await _service.GetByEstudianteAsync(estudianteId);
            return Ok(result);
        }

        [HttpGet("tecnica/{tecnica}")]
        public async Task<IActionResult> GetByTecnica(string tecnica)
        {
            var result = await _service.GetByTecnicaAsync(tecnica);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateObraDto dto)
        {
            var result = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateObraDto dto)
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
    }
}