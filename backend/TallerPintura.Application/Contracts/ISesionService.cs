using TallerPintura.Application.DTOs;

namespace TallerPintura.Application.Contracts
{
    public interface ISesionService
    {
        Task<List<SesionDto>> GetAllAsync();
        Task<SesionDto> GetByIdAsync(int id);
        Task<SesionDto> CreateAsync(CreateSesionDto dto);
        Task<SesionDto> UpdateAsync(int id, UpdateSesionDto dto);
        Task<bool> DeleteAsync(int id);
        Task<List<SesionDto>> GetProximasAsync();
        Task<bool> InscribirEstudianteAsync(int sesionId, int estudianteId);
    }
}