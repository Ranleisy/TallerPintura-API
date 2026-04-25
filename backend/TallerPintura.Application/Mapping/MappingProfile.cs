using AutoMapper;
using TallerPintura.Application.DTOs;
using TallerPintura.Domain.Entities;

namespace TallerPintura.Application.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Estudiante
            CreateMap<Estudiante, EstudianteDto>();
            CreateMap<CreateEstudianteDto, Estudiante>()
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.Matricula, opt => opt.MapFrom(_ => $"EST-{DateTime.Now.Year}-{new Random().Next(1000, 9999)}"))
                .ForMember(dest => dest.FechaInscripcion, opt => opt.MapFrom(_ => DateTime.UtcNow));
            CreateMap<UpdateEstudianteDto, Estudiante>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

            // Obra
            CreateMap<Obra, ObraDto>()
                .ForMember(dest => dest.EstudianteNombre, opt => opt.MapFrom(src => src.Estudiante != null ? src.Estudiante.NombreCompleto : ""));
            CreateMap<CreateObraDto, Obra>()
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow));
            CreateMap<UpdateObraDto, Obra>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

            // Sesion
            CreateMap<Sesion, SesionDto>();
            CreateMap<CreateSesionDto, Sesion>()
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow));
            CreateMap<UpdateSesionDto, Sesion>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

            // Exposicion
            CreateMap<Exposicion, ExposicionDto>();
            CreateMap<CreateExposicionDto, Exposicion>()
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow));
            CreateMap<UpdateExposicionDto, Exposicion>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}