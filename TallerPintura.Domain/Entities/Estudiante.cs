namespace TallerPintura.Domain.Entities
{
    public class Estudiante
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsActive { get; set; } = true;

        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Matricula { get; set; }
        public string NivelHabilidad { get; set; } = "Principiante";
        public DateTime FechaInscripcion { get; set; }
        public string? Biografia { get; set; }

        public string NombreCompleto => $"{Nombre} {Apellido}";

        // Relaciones
        public virtual ICollection<Obra> Obras { get; set; } = new List<Obra>();
        public virtual ICollection<SesionEstudiante> SesionEstudiantes { get; set; } = new List<SesionEstudiante>();
    }
}

