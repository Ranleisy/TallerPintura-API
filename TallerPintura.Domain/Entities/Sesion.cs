namespace TallerPintura.Domain.Entities
{
    public class Sesion
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsActive { get; set; } = true;

        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public string Tema { get; set; }
        public DateTime Fecha { get; set; }
        public int DuracionMinutos { get; set; }
        public string Modalidad { get; set; } = "Presencial";
        public int MaxEstudiantes { get; set; } = 15;
        public string? Materiales { get; set; }

        // Relaciones
        public virtual ICollection<SesionEstudiante> SesionEstudiantes { get; set; } = new List<SesionEstudiante>();
    }
}