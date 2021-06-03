﻿using System;
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

            // Relative paths in .NET are based from the binary file
            // from which the project is running, outputted here:
            // [directory of .csproj]/bin/debug
            var json = webClient.DownloadString(@"../Nc.JuniorDeveloperExam/App_Data/Blog-Posts.json");
            JsonData jsonData = JsonConvert.DeserializeObject<JsonData>(json);

            BlogPost blogPost = jsonData.BlogPosts[id - 1];

            return View(blogPost);
        }

        // POST: /blog/comment/id
        public ActionResult PostComment(int id, [Bind("Name, EmailAddress, Message")] Comment comment)
        {
            DateTime date = DateTime.Now;
            comment.Date = date;

            //deserialize the json
            var webClient = new WebClient();
            string json = webClient.DownloadString(@"../Nc.JuniorDeveloperExam/App_Data/Blog-Posts.json");
            JsonData jsonData = JsonConvert.DeserializeObject<JsonData>(json);

            //add the new comment
            BlogPost blogPost = jsonData.BlogPosts[id - 1];
            if(blogPost.GetType().GetProperty("Comments") == null)
            {
                blogPost.Comments = new Comment[] { comment };
            } else
            {
                // error: throwing 'index out of range' (which it is...)
                blogPost.Comments[blogPost.Comments.Length + 1] = comment;
            }

            //re-serialize back to json
            json = JsonConvert.SerializeObject(jsonData, Formatting.Indented);

            // write json back to Blog-Posts.json
            System.IO.File.WriteAllText(@"../Nc.JuniorDeveloperExam/App_Data/Blog-Posts.json", json);

            return Content("Comment posted successfully!");
        }
    }
}
