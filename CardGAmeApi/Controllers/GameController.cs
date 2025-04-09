using Microsoft.AspNetCore.Mvc;
using CardGameCore.Mechanics;

namespace CardGameApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameController : ControllerBase
    {
        private Game _game;

        public GameController()
        {
 
            _game = new Game(2); 
        }

        [HttpGet("start")]
        public IActionResult StartGame()
        {
            _game.StartGame();
            return Ok("Game started");
        }

        [HttpGet("status")]
        public IActionResult GetStatus()
        {
            
            return Ok(new { Player1 = _game.Players[0].Score, Player2 = _game.Players[1].Score });
        }
    }
}
