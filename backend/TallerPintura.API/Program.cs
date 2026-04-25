using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using TallerPintura.Application.Contracts;
using TallerPintura.Application.Mapping;
using TallerPintura.Application.Services;
using TallerPintura.Domain.Entities;
using TallerPintura.Infrastructure.Contracts;
using TallerPintura.Infrastructure.Repositories;
using TallerPintura.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Conexion a base de datos
builder.Services.AddDbContext<TallerPinturaDbContext>(o =>
    o.UseSqlServer(builder.Configuration.GetConnectionString("MainConnection")));

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

// Repositorios
builder.Services.AddScoped<IRepository<Estudiante>, GenericRepository<Estudiante>>();
builder.Services.AddScoped<IRepository<Obra>, GenericRepository<Obra>>();
builder.Services.AddScoped<IRepository<Sesion>, GenericRepository<Sesion>>();
builder.Services.AddScoped<IRepository<Exposicion>, GenericRepository<Exposicion>>();
builder.Services.AddScoped<IRepository<SesionEstudiante>, GenericRepository<SesionEstudiante>>();
builder.Services.AddScoped<IRepository<ExposicionObra>, GenericRepository<ExposicionObra>>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// Servicios
builder.Services.AddScoped<IEstudianteService, EstudianteService>();
builder.Services.AddScoped<IObraService, ObraService>();
builder.Services.AddScoped<ISesionService, SesionService>();
builder.Services.AddScoped<IExposicionService, ExposicionService>();

// AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Controllers
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowAllOrigins");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();