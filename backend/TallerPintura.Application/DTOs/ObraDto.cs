namespace TallerPintura.Application.DTOs
{
    public class ObraDto
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public string Tecnica { get; set; }
        public string Dimensiones { get; set; }
        public string Estado { get; set; }
        public int EstudianteId { get; set; }
        public string EstudianteNombre { get; set; }
        public decimal? PrecioEstimado { get; set; }
        public string? ImagenUrl { get; set; }
    }

    public class CreateObraDto
    {
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public string Tecnica { get; set; }
        public string Dimensiones { get; set; }
        public int EstudianteId { get; set; }
        public decimal? PrecioEstimado { get; set; }
        public string? ImagenUrl { get; set; }
    }

    public class UpdateObraDto
    {
        public string? Titulo { get; set; }
        public string? Descripcion { get; set; }
        public string? Tecnica { get; set; }
        public string? Dimensiones { get; set; }
        public string? Estado { get; set; }
        public decimal? PrecioEstimado { get; set; }
        public string? ImagenUrl { get; set; }
    }
}