namespace TallerPintura.Application.DTOs
{
    public class EstudianteDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public string Matricula { get; set; }
        public string NivelHabilidad { get; set; }
        public DateTime FechaInscripcion { get; set; }
        public string NombreCompleto => $"{Nombre} {Apellido}";
    }

    public class CreateEstudianteDto
    {
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string NivelHabilidad { get; set; } = "Principiante";
        public string? Biografia { get; set; }
    }

    public class UpdateEstudianteDto
    {
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public string? Email { get; set; }
        public string? Telefono { get; set; }
        public string? NivelHabilidad { get; set; }
        public string? Biografia { get; set; }
    }
}