namespace TallerPintura.Application.DTOs
{
    public class ExposicionDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Lugar { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string Estado { get; set; }
        public bool EsPublica { get; set; }
        public string? ImagenBannerUrl { get; set; }
    }

    public class CreateExposicionDto
    {
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Lugar { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public bool EsPublica { get; set; } = true;
        public string? ImagenBannerUrl { get; set; }
    }

    public class UpdateExposicionDto
    {
        public string? Nombre { get; set; }
        public string? Descripcion { get; set; }
        public string? Lugar { get; set; }
        public DateTime? FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public string? Estado { get; set; }
        public bool? EsPublica { get; set; }
        public string? ImagenBannerUrl { get; set; }
    }
}