using AutoMapper;
using TallerPintura.Application.Contracts;
using TallerPintura.Application.DTOs;
using TallerPintura.Domain.Entities;
using TallerPintura.Infrastructure.Contracts;

namespace TallerPintura.Application.Services
{
    public class SesionService : ISesionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public SesionService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<SesionDto>> GetAllAsync()
        {
            var sesiones = await _unitOfWork.Sesiones.GetAllAsync();
            return _mapper.Map<List<SesionDto>>(sesiones);
        }

        public async Task<SesionDto> GetByIdAsync(int id)
        {
            var sesion = await _unitOfWork.Sesiones.GetByIdAsync(id);
            return _mapper.Map<SesionDto>(sesion);
        }

        public async Task<SesionDto> CreateAsync(CreateSesionDto dto)
        {
            var sesion = _mapper.Map<Sesion>(dto);
            await _unitOfWork.Sesiones.AddAsync(sesion);
            await _unitOfWork.CompleteAsync();
            return _mapper.Map<SesionDto>(sesion);
        }

        public async Task<SesionDto> UpdateAsync(int id, UpdateSesionDto dto)
        {
            var sesion = await _unitOfWork.Sesiones.GetByIdAsync(id);
            if (sesion == null) return null;
            _mapper.Map(dto, sesion);
            sesion.UpdatedAt = DateTime.UtcNow;
            await _unitOfWork.Sesiones.UpdateAsync(sesion);
            await _unitOfWork.CompleteAsync();
            return _mapper.Map<SesionDto>(sesion);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var result = await _unitOfWork.Sesiones.DeleteAsync(id);
            if (!result) return false;
            await _unitOfWork.CompleteAsync();
            return true;
        }

        public async Task<List<SesionDto>> GetProximasAsync()
        {
            var sesiones = await _unitOfWork.Sesiones.FindAsync(s => s.Fecha >= DateTime.Now);
            return _mapper.Map<List<SesionDto>>(sesiones);
        }

        public async Task<bool> InscribirEstudianteAsync(int sesionId, int estudianteId)
        {
            var sesionEstudiante = new SesionEstudiante
            {
                SesionId = sesionId,
                EstudianteId = estudianteId,
                CreatedAt = DateTime.UtcNow
            };
            await _unitOfWork.SesionEstudiantes.AddAsync(sesionEstudiante);
            await _unitOfWork.CompleteAsync();
            return true;
        }
    }
}