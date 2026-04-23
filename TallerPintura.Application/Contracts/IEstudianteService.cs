using TallerPintura.Application.DTOs;

namespace TallerPintura.Application.Contracts
{
    public interface IEstudianteService
    {
        Task<List<EstudianteDto>> GetAllAsync();
        Task<EstudianteDto> GetByIdAsync(int id);
        Task<EstudianteDto> CreateAsync(CreateEstudianteDto dto);
        Task<EstudianteDto> UpdateAsync(int id, UpdateEstudianteDto dto);
        Task<bool> DeleteAsync(int id);
        Task<List<EstudianteDto>> GetByNivelAsync(string nivel);
    }
}