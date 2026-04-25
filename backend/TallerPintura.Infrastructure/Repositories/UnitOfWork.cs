using TallerPintura.Domain.Entities;
using TallerPintura.Infrastructure.Contracts;
using TallerPintura.Persistence;

namespace TallerPintura.Infrastructure.Repositories
{
    public class UnitOfWork : IDisposable, IUnitOfWork
    {
        private readonly TallerPinturaDbContext _context;

        public IRepository<Estudiante> Estudiantes { get; }
        public IRepository<Obra> Obras { get; }
        public IRepository<Sesion> Sesiones { get; }
        public IRepository<Exposicion> Exposiciones { get; }
        public IRepository<SesionEstudiante> SesionEstudiantes { get; }
        public IRepository<ExposicionObra> ExposicionObras { get; }

        public UnitOfWork(
            TallerPinturaDbContext context,
            IRepository<Estudiante> estudiantes,
            IRepository<Obra> obras,
            IRepository<Sesion> sesiones,
            IRepository<Exposicion> exposiciones,
            IRepository<SesionEstudiante> sesionEstudiantes,
            IRepository<ExposicionObra> exposicionObras)
        {
            _context = context;
            Estudiantes = estudiantes;
            Obras = obras;
            Sesiones = sesiones;
            Exposiciones = exposiciones;
            SesionEstudiantes = sesionEstudiantes;
            ExposicionObras = exposicionObras;
        }

        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task BeginTransactionAsync()
        {
            await _context.Database.BeginTransactionAsync();
        }

        public async Task CommitTransactionAsync()
        {
            await _context.Database.CommitTransactionAsync();
        }

        public async Task RollbackTransactionAsync()
        {
            await _context.Database.RollbackTransactionAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}