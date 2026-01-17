using Microsoft.AspNetCore.Mvc;

namespace felsenauto.Controllers
{
    public class BlogController : Controller
    {
        private readonly felsenauto.Data.ApplicationDbContext _context;

        public BlogController(felsenauto.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var blogs = _context.Blogs.OrderByDescending(b => b.CreatedDate).ToList();
            return View(blogs);
        }

        public IActionResult Details(int id)
        {
            var blog = _context.Blogs.FirstOrDefault(b => b.Id == id);
            if (blog == null)
            {
                return NotFound();
            }
            return View(blog);
        }
    }
}
