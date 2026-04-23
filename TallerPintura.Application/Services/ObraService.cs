using AutoMapper;
using TallerPintura.Application.Contracts;
using TallerPintura.Application.DTOs;
using TallerPintura.Domain.Entities;
using TallerPintura.Infrastructure.Contracts;

namespace TallerPintura.Application.Services
{
    public class ObraService : IObraService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ObraService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<ObraDto>> GetAllAsync()
        {
            var obras = await _unitOfWork.Obras.GetAllAsync();
            return _mapper.Map<List<ObraDto>>(obras);
        }

        public async Task<ObraDto> GetByIdAsync(int id)
        {
            var obra = await _unitOfWork.Obras.GetByIdAsync(id);
            return _mapper.Map<ObraDto>(obra);
        }

        public async Task<ObraDto> CreateAsync(CreateObraDto dto)
        {
            var obra = _mapper.Map<Obra>(dto);
            await _unitOfWork.Obras.AddAsync(obra);
            await _unitOfWork.CompleteAsync();
            return _mapper.Map<ObraDto>(obra);
        }

        public async Task<ObraDto> UpdateAsync(int id, UpdateObraDto dto)
        {
            var obra = await _unitOfWork.Obras.GetByIdAsync(id);
            if (obra == null) return null;
            _mapper.Map(dto, obra);
            obra.UpdatedAt = DateTime.UtcNow;
            await _unitOfWork.Obras.UpdateAsync(obra);
            await _unitOfWork.CompleteAsync();
            return _mapper.Map<ObraDto>(obra);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var result = await _unitOfWork.Obras.DeleteAsync(id);
            if (!result) return false;
            await _unitOfWork.CompleteAsync();
            return true;
        }

        public async Task<List<ObraDto>> GetByEstudianteAsync(int estudianteId)
        {
            var obras = await _unitOfWork.Obras.FindAsync(o => o.EstudianteId == estudianteId);
            return _mapper.Map<List<ObraDto>>(obras);
        }

        public async Task<List<ObraDto>> GetByTecnicaAsync(string tecnica)
        {
            var obras = await _unitOfWork.Obras.FindAsync(o => o.Tecnica == tecnica);
            return _mapper.Map<List<ObraDto>>(obras);
        }
    }
}