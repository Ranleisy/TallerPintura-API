using TallerPintura.Application.DTOs;

namespace TallerPintura.Application.Contracts
{
    public interface IObraService
    {
        Task<List<ObraDto>> GetAllAsync();
        Task<ObraDto> GetByIdAsync(int id);
        Task<ObraDto> CreateAsync(CreateObraDto dto);
        Task<ObraDto> UpdateAsync(int id, UpdateObraDto dto);
        Task<bool> DeleteAsync(int id);
        Task<List<ObraDto>> GetByEstudianteAsync(int estudianteId);
        Task<List<ObraDto>> GetByTecnicaAsync(string tecnica);
    }
}