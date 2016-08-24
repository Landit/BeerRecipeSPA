namespace BeerRecipeMVC.Migrations
{
    using BeerRecipeApp.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<BeerRecipeMVC.Models.BeerRecipeMVCContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(BeerRecipeMVC.Models.BeerRecipeMVCContext context)
        {

            context.Recipes.AddOrUpdate(x => x.ID,
                new Recipe()
                {
                    ID = 1,
                    Name = "Vanilla Bean Stout"
                },
                new Recipe()
                {
                    ID = 2,
                    Name = "Double Rye IPA"
                },
                new Recipe()
                {
                    ID = 3,
                    Name = "Russian Imperial Stout"
                }
            );

            context.Ingredients.AddOrUpdate(x => x.ID,
                new Ingredient()
                {
                    ID = 1,
                    Name = "Hops",
                    Description = "asdf"
                },
                new Ingredient()
                {
                    ID = 2,
                    Name = "Barley",
                    Description = "asdf"
                },
                new Ingredient()
                {
                    ID = 3,
                    Name = "Malt",
                    Description = "asdf"
                }
            );
        }
    }
}
