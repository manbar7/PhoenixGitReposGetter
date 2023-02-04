using Fnx_Git_Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Fnx_Git_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GitSearchController : ControllerBase
    {
        private readonly ILogger<GitSearchController> _logger;
        private readonly IConfiguration _configuration;
        static readonly HttpClient client = new HttpClient();
        // public string apiUrl = "https://api.github.com/search/repositories?q=";
        public string apiUrlFromConfig;
        public string GitAuthorization;
        public string GitApiVersion;



        public GitSearchController(ILogger<GitSearchController> logger, IConfiguration configuration)
        {
            _configuration = configuration;
            _logger = logger;

            // loading api settings
             apiUrlFromConfig = _configuration.GetValue<string>("ApiConfig:apiUrl");
             GitAuthorization = _configuration.GetValue<string>("ApiConfig:GitAuthorization");
             GitApiVersion = _configuration.GetValue<string>("ApiConfig:GitHub-Api-Version");

            if (client.DefaultRequestHeaders.Authorization == null)
            {
                client.DefaultRequestHeaders.Add("Accept", "application/json");
                client.DefaultRequestHeaders.Add("User-Agent", "request");
                client.DefaultRequestHeaders.Add("Authorization", GitAuthorization);
                client.DefaultRequestHeaders.Add("X-GitHub-Api-Version", GitApiVersion);
            } else
            {
                client.DefaultRequestHeaders.Add("Accept", "application/json");
                client.DefaultRequestHeaders.Add("User-Agent", "request");
            }



        }



        [HttpPost(Name = "GetGitResults")]
        public async Task<IEnumerable<object>> GetResults([FromBody] string searchValue)
        {
           
            var newResponse = await client.GetAsync(apiUrlFromConfig + searchValue  );
            string responseBody = await newResponse.Content.ReadAsStringAsync();

            //var gitResponse = new GitResponse
            //{
            //    total_count = 0,
            //    incomplete_results = true,
            //    items = null
            //};
            var contentresponse = newResponse.Content;
            return new object[] { JsonConvert.SerializeObject(responseBody) };

        }
    }
}