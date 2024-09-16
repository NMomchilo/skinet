using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : Controller
    {
        private readonly ILogger<BaseApiController> _logger;

        public BaseApiController(ILogger<BaseApiController> logger)
        {
            _logger = logger;
        }

        public ILogger<BaseApiController> Logger { get { return this._logger; } }
    }
}