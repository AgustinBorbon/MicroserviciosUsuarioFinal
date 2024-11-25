using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});
var app = builder.Build();
app.UseCors("AllowAllOrigins");
app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseRouting();

string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/package/{id}", async (Guid id) =>
{
    using var connection = new SqlConnection(connectionString);
    var package = await connection.QuerySingleOrDefaultAsync<Package>(
        "SELECT * FROM package WHERE Id = @Id", new { Id = id });

    return package is not null ? Results.Ok(package) : Results.NotFound();
});

app.MapPost("/api/persona", async ([FromBody] Persona persona) =>
{
    try
    {
        Console.WriteLine($"Datos recibidos: {System.Text.Json.JsonSerializer.Serialize(persona)}");

        using var connection = new SqlConnection(connectionString);
        var query = @"
            INSERT INTO persona (nombre, apellido, dni, telefono, email, calle, altura, nombre_localidad) 
            VALUES (@Nombre, @Apellido, @Dni, @Telefono, @Email, @Calle, @Altura, @Nombre_localidad); 
            SELECT CAST(SCOPE_IDENTITY() as int)";

        var id = await connection.ExecuteScalarAsync<int>(query, persona);
        return Results.Ok(id);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error al insertar persona: {ex.Message}");
        return Results.Problem("Error al insertar persona.");
    }
});




app.MapPost("/api/package_details", async (Paquete paquete) =>
{
    using var connection = new SqlConnection(connectionString);
    //paquete.id_package = Guid.NewGuid();
    var query = "INSERT INTO package_details (id_package, id_personaremitente, id_personadestinatario) VALUES (@id_package, @id_personaremitente, @id_personadestinatario);" +
                "SELECT CAST(SCOPE_IDENTITY() as int)";
    var id = await connection.ExecuteScalarAsync<int>(query, paquete);
    return Results.Ok(paquete.id_package); // Retorna el ID generado.
});


app.MapPost("/api/package", async (Package package) =>
{
    using var connection = new SqlConnection(connectionString);

    package.id = Guid.NewGuid();

    var query = "INSERT INTO package (id, width, height, depth, weight, status, rejection_reason, price) " +
                "VALUES (@id, @width, @height, @depth, @weight, @status, @rejection_reason, @price);";

    await connection.ExecuteAsync(query, package);

    return Results.Ok(package.id); // Retorna el ID del paquete.
});


app.Run();

public class Paquete
{
    public Guid id_package { get; set; }
    public int id_personaremitente { get; set; }
    public int id_personadestinatario { get; set; }

}

public class Package
{
    public Guid id { get; set; }
    public float width { get; set; }
    public float height { get; set; }
    public float depth { get; set; }
    public float weight { get; set; }
    public string status { get; set; }
    public string rejection_reason { get; set; }
    public float price { get; set; }
}
public class Persona
{
    public int Id { get; set; }
    public string nombre { get; set; }
    public string apellido { get; set; }
    public int dni { get; set; }
    public int telefono {  get; set; }
    public string email { get; set; }
    public string calle { get; set; }
    public int altura { get; set; }
    public string nombre_localidad { get; set; }
}
//public class Localidad
//{
//    public int Id { get; set; }
//    public string nombre { get; set; }
//    public int provincia_id {  get; set; }
//}
//public class Provincia
//{
//    public int Id { get; set; }
//    public string nombre { get; set; }
//}