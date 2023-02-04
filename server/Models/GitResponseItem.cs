using Fnx_Git_Api.Models;

namespace Fnx_Git_Api
{
    public class GitResponseItem
    {
        public int id { get; set; }

        public string node_id { get; set; }

        public string url { get; set; }
        public string name { get; set; }
        public string full_name { get; set; }

        public owner? owner { get; set; }

        public string color { get; set; }
        public bool _default { get; set; }

        public string description { get; set; }

        public int score { get; set; }










    }
}
