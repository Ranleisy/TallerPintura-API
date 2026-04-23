using TallerPintura.Application.DTOs;

namespace TallerPintura.Application.Contracts
{
    public interface IExposicionService
    {
        Task<List<ExposicionDto>> GetAllAsync();
        Task<ExposicionDto> GetByIdAsync(int id);
        Task<ExposicionDto> CreateAsync(CreateExposicionDto dto);
        Task<ExposicionDto> UpdateAsync(int id, UpdateExposicionDto dto);
        Task<bool> DeleteAsync(int id);
        Task<List<ExposicionDto>> GetActivasAsync();
        Task<bool> AgregarObraAsync(int exposicionId, int obraId);
    }
}