using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Nc.JuniorDeveloperExam.Controllers
{
    public class BlogController : Controller
    {
        // GET: /blogpost
        public string Index()
        {
            return "Hi! Please go to /blogpost/view/1 to view a blogpost :)";
        }

        // GET: /blog/blogpost/{id}
        // First return the title and id on the id endpoint,
        // then pass the rest of the data through
        public ActionResult BlogPost(int id)
        {
            // id is correct but isn't being passed through to viewdata
            
            //string title = "BlogPost";
            ViewData["id"] = id;
            ViewData["title"] = "BlogPost";

            return View();
        }
        
    }
}
