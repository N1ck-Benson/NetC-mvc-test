namespace Nc.JuniorDeveloperExam.Models
{
    using System;
    using Newtonsoft.Json;
    using System.Collections.Generic;

    public partial class JsonData
    {
        [JsonProperty("blogPosts")]
        public BlogPost[] BlogPosts { get; set; }
    }

    public partial class BlogPost
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("date")]
        public DateTimeOffset Date { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("image")]
        public string Image { get; set; }

        [JsonProperty("htmlContent")]
        public string HtmlContent { get; set; }

        [JsonProperty("comments", NullValueHandling = NullValueHandling.Ignore)]
        public List<Comment> Comments { get; set; }
    }

    public partial class Comment
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("date")]
        public DateTimeOffset Date { get; set; }

        [JsonProperty("emailAddress")]
        public string EmailAddress { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }
    }
}
