using Microsoft.AspNetCore.Mvc;

namespace CardGameApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameController : ControllerBase
    {
        [HttpGet("status")]
        public IActionResult GetStatus()
        {
            return Ok(new { message = "Game was laucnhed" });
        }
    }
}