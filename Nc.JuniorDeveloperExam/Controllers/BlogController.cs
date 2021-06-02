using System;
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
            // Could have used System.IO but couldn't make it work for some reason..

            var webClient = new WebClient();

            // make this a relative path!
            var json = webClient.DownloadString(@"/Users/nickbenson/Documents/devLocal/NetConstruct/Nc.JuniorDeveloperExam/Nc.JuniorDeveloperExam/App_Data/Blog-Posts.json");
            JsonData jsonData = JsonConvert.DeserializeObject<JsonData>(json);

            BlogPost blogPost = jsonData.BlogPosts[id - 1];

            return View(blogPost);
        }

        public ActionResult PostComment(int id, [Bind("Name, EmailAddress, Message")] Comment comment)
        {
            DateTime date = DateTime.Now;
            comment.Date = date;

            //deserialize the json
            var webClient = new WebClient();
            // make this a relative path!
            string json = webClient.DownloadString(@"/Users/nickbenson/Documents/devLocal/NetConstruct/Nc.JuniorDeveloperExam/Nc.JuniorDeveloperExam/App_Data/Blog-Posts.json");
            JsonData jsonData = JsonConvert.DeserializeObject<JsonData>(json);

            //add the new comment
            BlogPost blogPost = jsonData.BlogPosts[id - 1];
            if(blogPost.GetType().GetProperty("comments") == null)
            {
                blogPost.Comments = new Comment[] { comment };
            } else
            {
                blogPost.Comments[blogPost.Comments.Length + 1] = comment;
            }

            //re-serialize back to json
            json = JsonConvert.SerializeObject(jsonData, Formatting.Indented);

            // write json back to Blog-Posts.json
            System.IO.File.WriteAllText(@"/Users/nickbenson/Documents/devLocal/NetConstruct/Nc.JuniorDeveloperExam/Nc.JuniorDeveloperExam/App_Data/Blog-Posts.json", json);

            return Content("Comment posted successfully!");
        }
    }
}
