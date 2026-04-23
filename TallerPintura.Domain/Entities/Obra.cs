namespace TallerPintura.Domain.Entities
{
    public class Obra
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsActive { get; set; } = true;

        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public string Tecnica { get; set; }
        public string Dimensiones { get; set; }
        public string Estado { get; set; } = "En Proceso";
        public string? ImagenUrl { get; set; }
        public decimal? PrecioEstimado { get; set; }

        // FK
        public int EstudianteId { get; set; }
        public virtual Estudiante Estudiante { get; set; }

        // Relaciones
        public virtual ICollection<ExposicionObra> ExposicionObras { get; set; } = new List<ExposicionObra>();
    }
}