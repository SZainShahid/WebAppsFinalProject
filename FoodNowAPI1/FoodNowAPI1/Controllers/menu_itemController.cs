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
    public class menu_itemController : ApiController
    {
        private DBMenuModel db = new DBMenuModel();

        // GET: api/menu_item
        public IQueryable<menu_items> Getmenu_items()
        {
            return db.menu_items;
        }

        // GET: api/menu_item/5

        // PUT: api/menu_item/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putmenu_items(int id, menu_items menu_items)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != menu_items.menuID)
            {
                return BadRequest();
            }

            db.Entry(menu_items).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!menu_itemsExists(id))
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

        // POST: api/menu_item
        [ResponseType(typeof(menu_items))]
        public IHttpActionResult Postmenu_items(menu_items menu_items)
        {

            db.menu_items.Add(menu_items);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = menu_items.menuID }, menu_items);
        }

        // DELETE: api/menu_item/5
        [ResponseType(typeof(menu_items))]
        public IHttpActionResult Deletemenu_items(int id)
        {
            menu_items menu_items = db.menu_items.Find(id);
            if (menu_items == null)
            {
                return NotFound();
            }

            db.menu_items.Remove(menu_items);
            db.SaveChanges();

            return Ok(menu_items);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool menu_itemsExists(int id)
        {
            return db.menu_items.Count(e => e.menuID == id) > 0;
        }
    }
}