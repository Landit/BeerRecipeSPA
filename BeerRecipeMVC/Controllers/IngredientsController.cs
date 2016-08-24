using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using BeerRecipeApp.Models;
using BeerRecipeMVC.Models;

namespace BeerRecipeMVC.Controllers
{
    public class IngredientsController : ApiController
    {
        private BeerRecipeMVCContext db = new BeerRecipeMVCContext();

        // GET: api/Ingredients
        public IQueryable<Ingredient> GetIngredients()
        {
            return db.Ingredients;
        }

        // GET: api/Ingredients/5
        [ResponseType(typeof(Ingredient))]
        public async Task<IHttpActionResult> GetIngredient(int id)
        {
            Ingredient ingredient = await db.Ingredients.FindAsync(id);
            if (ingredient == null)
            {
                return NotFound();
            }

            return Ok(ingredient);
        }

        // GET: api/Ingredients/Hops
        [ResponseType(typeof(Ingredient))]
        public async Task<IHttpActionResult> GetRecipe(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return NotFound();
            }

            List<Ingredient> ingredientList = await db.Ingredients.Where(x => x.Name.Contains(name)).ToListAsync();
            if (ingredientList == null || ingredientList.Count <= 0)
            {
                return NotFound();
            }

            return Ok(ingredientList);
        }

        // PUT: api/Ingredients/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutIngredient(int id, Ingredient ingredient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ingredient.ID)
            {
                return BadRequest();
            }

            db.Entry(ingredient).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IngredientExists(id))
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

        // POST: api/Ingredients
        [ResponseType(typeof(Ingredient))]
        public async Task<IHttpActionResult> PostIngredient(Ingredient ingredient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Ingredients.Add(ingredient);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = ingredient.ID }, ingredient);
        }

        // DELETE: api/Ingredients/5
        [ResponseType(typeof(Ingredient))]
        public async Task<IHttpActionResult> DeleteIngredient(int id)
        {
            Ingredient ingredient = await db.Ingredients.FindAsync(id);
            if (ingredient == null)
            {
                return NotFound();
            }

            db.Ingredients.Remove(ingredient);
            await db.SaveChangesAsync();

            return Ok(ingredient);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool IngredientExists(int id)
        {
            return db.Ingredients.Count(e => e.ID == id) > 0;
        }
    }
}