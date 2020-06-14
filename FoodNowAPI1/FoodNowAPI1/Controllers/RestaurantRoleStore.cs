using FoodNowAPI1.Models;

namespace FoodNowAPI1.Controllers
{
    internal class RestaurantRoleStore<T>
    {
        private ApplicationDbContext applicationDbContext;

        public RestaurantRoleStore(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
    }
}