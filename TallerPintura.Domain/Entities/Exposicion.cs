namespace TallerPintura.Domain.Entities
{
    public class Exposicion
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsActive { get; set; } = true;

        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Lugar { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string Estado { get; set; } = "Planificada";
        public bool EsPublica { get; set; } = true;
        public string? ImagenBannerUrl { get; set; }

        // Relaciones
        public virtual ICollection<ExposicionObra> ExposicionObras { get; set; } = new List<ExposicionObra>();
    }
}