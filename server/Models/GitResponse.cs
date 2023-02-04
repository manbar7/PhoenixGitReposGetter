namespace Fnx_Git_Api.Models
{
    public class GitResponse
    {
        public int total_count { get; set; }
        public bool incomplete_results { get; set; }
        public string []? items { get; set; }
    }
}
