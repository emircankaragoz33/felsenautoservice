using Microsoft.AspNetCore.Mvc;

namespace felsenauto.Controllers
{
    public class HizmetlerimizController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
