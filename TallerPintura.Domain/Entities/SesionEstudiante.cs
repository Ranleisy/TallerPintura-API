namespace TallerPintura.Domain.Entities
{
    public class SesionEstudiante
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsActive { get; set; } = true;

        public int SesionId { get; set; }
        public virtual Sesion Sesion { get; set; }

        public int EstudianteId { get; set; }
        public virtual Estudiante Estudiante { get; set; }

        public bool Asistio { get; set; } = false;
        public string? Notas { get; set; }
    }
}