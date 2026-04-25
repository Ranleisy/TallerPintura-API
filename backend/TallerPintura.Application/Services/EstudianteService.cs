    using AutoMapper;
using TallerPintura.Application.Contracts;
using TallerPintura.Application.DTOs;
using TallerPintura.Domain.Entities;
using TallerPintura.Infrastructure.Contracts;

namespace TallerPintura.Application.Services
{
    public class EstudianteService : IEstudianteService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public EstudianteService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<EstudianteDto>> GetAllAsync()
        {
            var estudiantes = await _unitOfWork.Estudiantes.GetAllAsync();
            return _mapper.Map<List<EstudianteDto>>(estudiantes);
        }

        public async Task<EstudianteDto> GetByIdAsync(int id)
        {
            var estudiante = await _unitOfWork.Estudiantes.GetByIdAsync(id);
            return _mapper.Map<EstudianteDto>(estudiante);
        }

        public async Task<EstudianteDto> CreateAsync(CreateEstudianteDto dto)
        {
            var estudiante = _mapper.Map<Estudiante>(dto);
            await _unitOfWork.Estudiantes.AddAsync(estudiante);
            await _unitOfWork.CompleteAsync();
            return _mapper.Map<EstudianteDto>(estudiante);
        }

        public async Task<EstudianteDto> UpdateAsync(int id, UpdateEstudianteDto dto)
        {
            var estudiante = await _unitOfWork.Estudiantes.GetByIdAsync(id);
            if (estudiante == null) return null;
            _mapper.Map(dto, estudiante);
            estudiante.UpdatedAt = DateTime.UtcNow;
            await _unitOfWork.Estudiantes.UpdateAsync(estudiante);
            await _unitOfWork.CompleteAsync();
            return _mapper.Map<EstudianteDto>(estudiante);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var result = await _unitOfWork.Estudiantes.DeleteAsync(id);
            if (!result) return false;
            await _unitOfWork.CompleteAsync();
            return true;
        }

        public async Task<List<EstudianteDto>> GetByNivelAsync(string nivel)
        {
            var estudiantes = await _unitOfWork.Estudiantes.FindAsync(e => e.NivelHabilidad == nivel);
            return _mapper.Map<List<EstudianteDto>>(estudiantes);
        }
    }
}