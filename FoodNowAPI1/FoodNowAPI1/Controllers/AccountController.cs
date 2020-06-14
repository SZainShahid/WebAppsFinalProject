using FoodNowAPI1.Migrations;
using FoodNowAPI1.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using System.Security.Claims;
using System.Web.Http;

namespace FoodNowAPI1.Controllers
{
    public class AccountController : ApiController
    {
        [Route("api/User/Register")]
        [HttpPost]  
        [AllowAnonymous]
        public IdentityResult Register(AccountModel model)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);
            var user = new ApplicationUser() { UserName = model.UserName, Email = model.Email };
            user.PhoneNumber = model.PhoneNumber;
            user.Address = model.Address;
            IdentityResult result = manager.Create(user, model.Password);
            manager.AddToRoles(user.Id, model.Roles);
            return result;
        }
        [HttpGet]
        [Route("api/GetUserClaims")]
        public AccountModel GetUserClaims()
        {
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;
            AccountModel model = new AccountModel()
            {
                UserName = identityClaims.FindFirst("Username").Value,
                Email = identityClaims.FindFirst("Email").Value,
                PhoneNumber = identityClaims.FindFirst("PhoneNumber").Value,
                Address = identityClaims.FindFirst("Address").Value,
                LoggedOn = identityClaims.FindFirst("LoggedOn").Value
            };
            return model;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("api/ForAdminRole")]
        public string ForAdminRole()
        {
            return "for admin role";
        }

        [HttpGet]
        [Authorize(Roles = "Vendor")]
        [Route("api/ForVendorRole")]
        public string ForVendorRole()
        {
            return "for vendor role";
        }

        [HttpGet]
        [Authorize(Roles = "Vendor, Customer")]
        [Route("api/ForVendorOrCustomer")]
        public string ForVendorOrCustomer()
        {
            return "for vendor/customer role";
        }
    }
}
