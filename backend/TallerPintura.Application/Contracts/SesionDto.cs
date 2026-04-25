namespace TallerPintura.Application.DTOs
{
    public class SesionDto
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public string Tema { get; set; }
        public DateTime Fecha { get; set; }
        public int DuracionMinutos { get; set; }
        public string Modalidad { get; set; }
        public int MaxEstudiantes { get; set; }
        public string? Materiales { get; set; }
    }

    public class CreateSesionDto
    {
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public string Tema { get; set; }
        public DateTime Fecha { get; set; }
        public int DuracionMinutos { get; set; } = 120;
        public string Modalidad { get; set; } = "Presencial";
        public int MaxEstudiantes { get; set; } = 15;
        public string? Materiales { get; set; }
    }

    public class UpdateSesionDto
    {
        public string? Titulo { get; set; }
        public string? Descripcion { get; set; }
        public string? Tema { get; set; }
        public DateTime? Fecha { get; set; }
        public int? DuracionMinutos { get; set; }
        public string? Modalidad { get; set; }
        public int? MaxEstudiantes { get; set; }
        public string? Materiales { get; set; }
    }
}