namespace TallerPintura.Domain.Entities
{
    public class ExposicionObra
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsActive { get; set; } = true;

        public int ExposicionId { get; set; }
        public virtual Exposicion Exposicion { get; set; }

        public int ObraId { get; set; }
        public virtual Obra Obra { get; set; }

        public string? UbicacionEnSala { get; set; }
    }
}