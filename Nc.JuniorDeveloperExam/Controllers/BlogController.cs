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

            BlogPost blogPost = jsonData.BlogPosts[id - 1];

            return View(blogPost);
        }

        public ActionResult PostComment(int id, string name, string email, string message)
        {
            Debug.WriteLine(id, "id");
            // thinks the id is 1, whichever page you send post from
            // name, email address, message (add date in controller)
            return Content("Comment posted to id ");
        }
    }
}
