using Microsoft.EntityFrameworkCore;
using preqintechinterview;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddTransient<InvestorContext>();
//services cors
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.AddDbContext<InvestorContext>(options =>
    options.UseSqlite("Data Source=Data/data-preqin.db"));

var app = builder.Build();

app.UseCors("corsapp");

app.UseAuthorization();

app.MapControllers();

app.Run();

