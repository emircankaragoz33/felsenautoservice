using Microsoft.AspNetCore.Mvc;

namespace felsenauto.Controllers
{
    public class HakkimizdaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
