using AutoMapper;
using TallerPintura.Application.Contracts;
using TallerPintura.Application.DTOs;
using TallerPintura.Domain.Entities;
using TallerPintura.Infrastructure.Contracts;

namespace TallerPintura.Application.Services
{
    public class ExposicionService : IExposicionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ExposicionService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<ExposicionDto>> GetAllAsync()
        {
            var exposiciones = await _unitOfWork.Exposiciones.GetAllAsync();
            return _mapper.Map<List<ExposicionDto>>(exposiciones);
        }

        public async Task<ExposicionDto> GetByIdAsync(int id)
        {
            var exposicion = await _unitOfWork.Exposiciones.GetByIdAsync(id);
            return _mapper.Map<ExposicionDto>(exposicion);
        }

        public async Task<ExposicionDto> CreateAsync(CreateExposicionDto dto)
        {
            var exposicion = _mapper.Map<Exposicion>(dto);
            await _unitOfWork.Exposiciones.AddAsync(exposicion);
            await _unitOfWork.CompleteAsync();
            return _mapper.Map<ExposicionDto>(exposicion);
        }

        public async Task<ExposicionDto> UpdateAsync(int id, UpdateExposicionDto dto)
        {
            var exposicion = await _unitOfWork.Exposiciones.GetByIdAsync(id);
            if (exposicion == null) return null;
            _mapper.Map(dto, exposicion);
            exposicion.UpdatedAt = DateTime.UtcNow;
            await _unitOfWork.Exposiciones.UpdateAsync(exposicion);
            await _unitOfWork.CompleteAsync();
            return _mapper.Map<ExposicionDto>(exposicion);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var result = await _unitOfWork.Exposiciones.DeleteAsync(id);
            if (!result) return false;
            await _unitOfWork.CompleteAsync();
            return true;
        }

        public async Task<List<ExposicionDto>> GetActivasAsync()
        {
            var exposiciones = await _unitOfWork.Exposiciones.FindAsync(e => e.Estado == "En Curso");
            return _mapper.Map<List<ExposicionDto>>(exposiciones);
        }

        public async Task<bool> AgregarObraAsync(int exposicionId, int obraId)
        {
            var exposicionObra = new ExposicionObra
            {
                ExposicionId = exposicionId,
                ObraId = obraId,
                CreatedAt = DateTime.UtcNow
            };
            await _unitOfWork.ExposicionObras.AddAsync(exposicionObra);
            await _unitOfWork.CompleteAsync();
            return true;
        }
    }
}