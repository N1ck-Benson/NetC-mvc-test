using System.Diagnostics;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Nc.JuniorDeveloperExam.Models;
using Newtonsoft.Json;

namespace Nc.JuniorDeveloperExam.Controllers
{
    public class BlogController : Controller
    {
        // GET: /blog/blogpost/{id}
        public ActionResult BlogPost(int id)
        {

            // The WebClient class is using System.Net.    
            // It "provides common methods for sending data to and receiving data from a resource identified by a URI".
            // Could also do File.ReadAllText, using System.IO

            var webClient = new WebClient();
            var json = webClient.DownloadString(@"/Users/nickbenson/Documents/devLocal/NetConstruct/Nc.JuniorDeveloperExam/Nc.JuniorDeveloperExam/App_Data/Blog-Posts.json");
            JsonData jsonData = JsonConvert.DeserializeObject<JsonData>(json);

            ViewData["title"] = jsonData.BlogPosts[id - 1].Title;
            ViewData["date"] = jsonData.BlogPosts[id - 1].Date;
            ViewData["image"] = jsonData.BlogPosts[id - 1].Image;
            ViewData["htmlContent"] = jsonData.BlogPosts[id - 1].HtmlContent;

            BlogPost blogPost = jsonData.BlogPosts[id - 1];

            return View(blogPost);
        }
    }
}
