using Microsoft.EntityFrameworkCore;
using Models.DatabaseObjects;

namespace Models
{
	public class DonationDbContext : DbContext
	{
		public DonationDbContext(DbContextOptions<DonationDbContext> options) : base(options)
		{
		}

		public DbSet<Candidate> Candidates { get; set; }
	}
}
