using System.ComponentModel.DataAnnotations;

namespace felsenauto.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Ad Soyad gereklidir.")]
        public string CustomerName { get; set; }

        [Required(ErrorMessage = "E-posta gereklidir.")]
        [EmailAddress(ErrorMessage = "Geçerli bir e-posta adresi giriniz.")]
        public string CustomerEmail { get; set; }

        [Required(ErrorMessage = "Telefon numarası gereklidir.")]
        public string CustomerPhone { get; set; }

        public string ServiceType { get; set; }

        public string? CarModel { get; set; }

        [Required(ErrorMessage = "Tarih gereklidir.")]
        public DateTime AppointmentDate { get; set; }

        public string? Notes { get; set; }

        public string Status { get; set; } = "Beklemede"; // Beklemede, Onaylandı, İptal
    }
}
