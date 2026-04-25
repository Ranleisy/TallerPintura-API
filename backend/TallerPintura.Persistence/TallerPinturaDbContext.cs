using Microsoft.EntityFrameworkCore;
using TallerPintura.Domain.Entities;

namespace TallerPintura.Persistence
{
    public class TallerPinturaDbContext : DbContext
    {
        public TallerPinturaDbContext(DbContextOptions<TallerPinturaDbContext> options) : base(options)
        {
        }

        public DbSet<Estudiante> Estudiantes { get; set; }
        public DbSet<Obra> Obras { get; set; }
        public DbSet<Sesion> Sesiones { get; set; }
        public DbSet<Exposicion> Exposiciones { get; set; }
        public DbSet<SesionEstudiante> SesionEstudiantes { get; set; }
        public DbSet<ExposicionObra> ExposicionObras { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes()
                .SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            modelBuilder.Entity<Estudiante>()
                .HasIndex(e => e.Email)
                .IsUnique();

            modelBuilder.Entity<Estudiante>()
                .HasIndex(e => e.Matricula)
                .IsUnique();
        }
    }
}