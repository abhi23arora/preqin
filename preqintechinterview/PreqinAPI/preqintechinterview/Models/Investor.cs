using System;
namespace preqintechinterview.Models
{
	public class Investor
	{
        public int ID { get; set; }
		public string? Investor_Name { get; set; }
		public string? Investor_Type { get; set; }
		public string? Investor_Country { get; set; }
        public string? Investor_Date_Added { get; set; }
        public string? Investor_Last_Updated { get; set; }
        public string? Commitment_Asset_Class { get; set; }
        public int Commitment_Amount { get; set; }
        public string? Commitment_Currency { get; set; }
    }
}

