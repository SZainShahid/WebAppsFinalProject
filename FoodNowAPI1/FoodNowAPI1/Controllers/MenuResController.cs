using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using FoodNowAPI1.Models;

namespace FoodNowAPI1.Controllers
{
    public class MenuResController : ApiController
    {
        private MenuRestaurantEdit db = new MenuRestaurantEdit();

        // GET: api/MenuRes
        public IQueryable<MenuRe> GetMenuRes()
        {
            return db.MenuRes;
        }

        // GET: api/MenuRes/5
        [ResponseType(typeof(MenuRe))]
        public IHttpActionResult GetMenuRe(int id)
        {
            MenuRe menuRe = db.MenuRes.Find(id);
            if (menuRe == null)
            {
                return NotFound();
            }

            return Ok(menuRe);
        }

        // PUT: api/MenuRes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMenuRe(int id, MenuRe menuRe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != menuRe.menuID)
            {
                return BadRequest();
            }

            db.Entry(menuRe).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MenuReExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/MenuRes
        [ResponseType(typeof(MenuRe))]
        public IHttpActionResult PostMenuRe(MenuRe menuRe)
        {
            db.MenuRes.Add(menuRe);
            db.SaveChanges();
              
            return CreatedAtRoute("DefaultApi", new { id = menuRe.menuID }, menuRe);
        }

        // DELETE: api/MenuRes/5
        [ResponseType(typeof(MenuRe))]
        public IHttpActionResult DeleteMenuRe(int id)
        {
            MenuRe menuRe = db.MenuRes.Find(id);
            if (menuRe == null)
            {
                return NotFound();
            }

            db.MenuRes.Remove(menuRe);
            db.SaveChanges();

            return Ok(menuRe);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MenuReExists(int id)
        {
            return db.MenuRes.Count(e => e.menuID == id) > 0;
        }
    }
}