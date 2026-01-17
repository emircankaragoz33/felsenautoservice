using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace felsenauto.Controllers
{
    public class AdminController : Controller
    {
        private readonly felsenauto.Data.ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AdminController(felsenauto.Data.ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Login()
        {
            if (User.Identity!.IsAuthenticated)
            {
                return RedirectToAction("Index");
            }
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(string username, string password)
        {
            var adminUser = _configuration["AdminSettings:Username"];
            var adminPass = _configuration["AdminSettings:Password"];

            if (username == adminUser && password == adminPass)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, username),
                    new Claim(ClaimTypes.Role, "Admin")
                };

                var claimsIdentity = new ClaimsIdentity(claims, "CookieAuth");
                var authProperties = new AuthenticationProperties
                {
                    IsPersistent = true // Keep logged in
                };

                await HttpContext.SignInAsync("CookieAuth", new ClaimsPrincipal(claimsIdentity), authProperties);

                return RedirectToAction("Index");
            }

            ViewBag.Error = "Kullanıcı adı veya şifre hatalı.";
            return View();
        }

        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync("CookieAuth");
            return RedirectToAction("Login");
        }

        [Authorize]
        public IActionResult Index()
        {
            var blogs = _context.Blogs.OrderByDescending(b => b.CreatedDate).ToList();
            ViewBag.Appointments = _context.Appointments.OrderByDescending(a => a.AppointmentDate).Take(10).ToList();
            return View(blogs);
        }

        // --- BLOG MANAGEMENT ---

        [Authorize]
        public IActionResult CreateBlog()
        {
            return View();
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateBlog(felsenauto.Models.Blog blog)
        {
            if (ModelState.IsValid)
            {
                blog.CreatedDate = DateTime.Now;
                _context.Add(blog);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(blog);
        }

        [Authorize]
        public IActionResult EditBlog(int id)
        {
            var blog = _context.Blogs.Find(id);
            if (blog == null) return NotFound();
            return View(blog);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> EditBlog(felsenauto.Models.Blog blog)
        {
            if (ModelState.IsValid)
            {
                _context.Update(blog);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(blog);
        }

        [Authorize]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            var blog = _context.Blogs.Find(id);
            if (blog != null)
            {
                _context.Blogs.Remove(blog);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
