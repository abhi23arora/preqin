using System;
using Microsoft.EntityFrameworkCore;
using preqintechinterview.Models;

namespace preqintechinterview
{
	public class InvestorContext : DbContext
	{
        public DbSet<Investor> Investor { get; set; }

        public string DbPath { get; }

        public InvestorContext(DbContextOptions<InvestorContext> options) : base(options)
        {
            DbPath = "Data/data-preqin.db"; 
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlite($"Data Source={DbPath}");
            }
        }

    }
}

