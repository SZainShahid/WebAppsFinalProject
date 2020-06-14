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
    public class menusController : ApiController   
    {
        private DBMenuModel db = new DBMenuModel();

        // GET: api/menus
        public IQueryable<menu> Getmenus()
        {
            return db.menus;
        }

        // PUT: api/menus/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putmenu(int id, menu menu)
        {

            if (id != menu.menuID)
            {
                return BadRequest();
            }

            db.Entry(menu).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!menuExists(id))
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

        // POST: api/menus
        [ResponseType(typeof(menu))]
        public IHttpActionResult Postmenu(menu menu)
        {
            db.menus.Add(menu);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = menu.menuID }, menu);
        }

        // DELETE: api/menus/5
        [ResponseType(typeof(menu))]
        public IHttpActionResult Deletemenu(int id)
        {
            menu menu = db.menus.Find(id);
            if (menu == null)
            {
                return NotFound();
            }

            db.menus.Remove(menu);
            db.SaveChanges();

            return Ok(menu);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool menuExists(int id)
        {
            return db.menus.Count(e => e.menuID == id) > 0;
        }
    }
}
