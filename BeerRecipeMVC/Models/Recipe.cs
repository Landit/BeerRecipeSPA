using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BeerRecipeApp.Models
{
    public class Recipe
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Ingredient> Ingredients { get; set; }
    }
}