using Microsoft.AspNetCore.Mvc;

namespace felsenauto.Controllers
{
    public class IletisimController : Controller
    {
        private readonly felsenauto.Data.ApplicationDbContext _context;

        public IletisimController(felsenauto.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateAppointment(felsenauto.Models.Appointment appointment)
        {
            // Set default status if needed or handled by default value
            appointment.Status = "Beklemede";

            if (ModelState.IsValid)
            {
                _context.Add(appointment);
                await _context.SaveChangesAsync();
                TempData["SuccessMessage"] = "Randevu talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.";
                return RedirectToAction(nameof(Index));
            }
            
            // If validation failed, redirect back to index but ideally we should show errors
            // Since the form is not partial, we can return the view with the model or just error message
            // For now simpler approach: show error toast or similar via TempData
            TempData["ErrorMessage"] = "Randevu oluşturulurken bir hata oluştu. Lütfen tüm alanları kontrol ediniz.";
            return RedirectToAction(nameof(Index));
        }
    }
}
