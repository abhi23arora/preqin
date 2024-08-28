//using Xunit;
//using Moq;
//using Microsoft.EntityFrameworkCore;
//using preqintechinterview.Controllers;
//using preqintechinterview.Models; 
//using System.Collections.Generic;
//using System.Linq;
//using preqintechinterview;

//public class InvestorControllerTests
//{
//    private Mock<InvestorContext> _mockContext;
//    private Mock<DbSet<Investor>> _mockInvestorDbSet;

//    public InvestorControllerTests()
//    {
//        // Setup mock DbSet for Investors
//        var mockInvestors = new List<Investor>
//        {
//            new Investor { ID = 1000, Investor_Name = "Ioo Gryffindor fund", Investor_Type = "fund manager", Investor_Country = "Singapore", Investor_Date_Added = "06/07/00",
//                 Investor_Last_Updated = "21/02/24", Commitment_Asset_Class = "Infrastructure", Commitment_Amount = 15000000, Commitment_Currency="GBP" },
//            new Investor { ID = 1009, Investor_Name = "Ioo Gryffindor fund", Investor_Type = "fund manager", Investor_Country = "Singapore", Investor_Date_Added = "06/07/00",
//                 Investor_Last_Updated = "21/02/24", Commitment_Asset_Class = "Hedge Funds", Commitment_Amount = 31000000, Commitment_Currency="GBP" }
//        }.AsQueryable();

//        _mockInvestorDbSet = new Mock<DbSet<Investor>>();
//        _mockInvestorDbSet.As<IQueryable<Investor>>().Setup(m => m.Provider).Returns(mockInvestors.Provider);
//        _mockInvestorDbSet.As<IQueryable<Investor>>().Setup(m => m.Expression).Returns(mockInvestors.Expression);
//        _mockInvestorDbSet.As<IQueryable<Investor>>().Setup(m => m.ElementType).Returns(mockInvestors.ElementType);
//        _mockInvestorDbSet.As<IQueryable<Investor>>().Setup(m => m.GetEnumerator()).Returns(mockInvestors.GetEnumerator());

//        // Setup mock context
//        _mockContext = new Mock<InvestorContext>();
//        _mockContext.Setup(c => c.Investor).Returns(_mockInvestorDbSet.Object);
//    }

//    [Fact]
//    public void Get_ShouldReturnListOfInvestors()
//    {
//        // Arrange
//        var controller = new InvestorController(_mockContext.Object);

//        // Act
//        var result = controller.Get();

//        // Assert
//        Assert.NotNull(result);
//        Assert.Equal(2, result.Count());
//        Assert.Contains(result, i => i.Investor_Name == "Ioo Gryffindor fund");
//    }

//    [Fact]
//    public void GetByID_ShouldReturnInvestor_WhenIDExists()
//    {
//        // Arrange
//        var controller = new InvestorController(_mockContext.Object);

//        // Act
//        var result = controller.GetByID(1);

//        // Assert
//        Assert.NotNull(result);
//        Assert.Single(result);
//        Assert.Equal("Ioo Gryffindor fund", result.First().Investor_Name);
//    }
//}

using Microsoft.EntityFrameworkCore;
using preqintechinterview;
using preqintechinterview.Controllers;
using preqintechinterview.Models;
using Xunit;

public class InvestorControllerTests : IDisposable
{
    private InvestorContext _context;

    public InvestorControllerTests()
    {
        var options = new DbContextOptionsBuilder<InvestorContext>()
            .UseInMemoryDatabase(databaseName: "InvestorTestDb")
            .Options;
        _context = new InvestorContext(options);

        _context.Investor.AddRange(new List<Investor>
        {
            new Investor { ID = 1000, Investor_Name = "Ioo Gryffindor fund", Investor_Type = "fund manager", Investor_Country = "Singapore", Investor_Date_Added = "06/07/00",
                 Investor_Last_Updated = "21/02/24", Commitment_Asset_Class = "Infrastructure", Commitment_Amount = 15000000, Commitment_Currency="GBP" },
            new Investor { ID = 1009, Investor_Name = "Ioo Gryffindor fund", Investor_Type = "fund manager", Investor_Country = "Singapore", Investor_Date_Added = "06/07/00",
                 Investor_Last_Updated = "21/02/24", Commitment_Asset_Class = "Hedge Funds", Commitment_Amount = 31000000, Commitment_Currency="GBP" }
        });

        _context.SaveChanges();
    }

    [Fact]
    public void Test_ReturnListOfInvestors()
    {
        var controller = new InvestorController(_context);
        var result = controller.Get();
        Assert.NotNull(result);
        Assert.Equal(2, result.Count());
    }

    [Fact]
    public void Test_ReturnParticularInvestorByID()
    {
        var controller = new InvestorController(_context);

        var result = controller.GetByID(1000);

        Assert.NotNull(result);
        Assert.Equal("Ioo Gryffindor fund", result.First().Investor_Name);
    }

    // to dispose off the in memory db we created in the context
    public void Dispose()
    {
        _context.Database.EnsureDeleted();
        _context.Dispose();
    }
}

