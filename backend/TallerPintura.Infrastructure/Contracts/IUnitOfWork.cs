using TallerPintura.Domain.Entities;

namespace TallerPintura.Infrastructure.Contracts
{
    public interface IUnitOfWork
    {
        IRepository<Estudiante> Estudiantes { get; }
        IRepository<Obra> Obras { get; }
        IRepository<Sesion> Sesiones { get; }
        IRepository<Exposicion> Exposiciones { get; }
        IRepository<SesionEstudiante> SesionEstudiantes { get; }
        IRepository<ExposicionObra> ExposicionObras { get; }

        Task CompleteAsync();
        Task BeginTransactionAsync();
        Task CommitTransactionAsync();
        Task RollbackTransactionAsync();
        void Dispose();
    }
}