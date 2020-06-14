using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FoodNowAPI1.Migrations
{
    public class AccountModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }

        public string LoggedOn { get; set; }

        public string[] Roles { get; set; }
    }
}