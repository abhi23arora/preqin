using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using preqintechinterview.Models;

namespace preqintechinterview.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InvestorController : Controller
    {

        private InvestorContext _context;
        public InvestorController(InvestorContext investorContext)
        {
            _context = investorContext;
        }

        [HttpGet]
        public IEnumerable<Investor> Get()
        {
            var result = _context.Investor.ToList();

            return result;
        }

        [HttpGet]
        [Route("{ID:int}")]
        public IEnumerable<Investor> GetByID(int ID)
        {
            var investorName = (from investorDetail in _context.Investor
                               where investorDetail.ID == ID
                               select investorDetail.Investor_Name).Single();

            var result = from investorDetail in _context.Investor
                         where investorDetail.Investor_Name == investorName
                         select investorDetail;

            return result;

        }
    }
}

