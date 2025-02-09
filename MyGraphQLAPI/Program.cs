using MyGraphQLAPI.DB;
using MyGraphQLAPI.GraphQL;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Disable CORS
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAll", builder =>
	{
		builder.AllowAnyOrigin()
			   .AllowAnyMethod()
			   .AllowAnyHeader();
	});
});

// Добавляем GraphQL-сервер, а так же подключаем к нему Query и Mutation.
builder.Services
	.AddGraphQLServer()
	.AddQueryType<Query>()
	.AddMutationType<Mutation>();

WebApplication app = builder.Build();

app.UseRouting();

app.UseCors("AllowAll");
app.UseExceptionHandler("/error");

app.MapGraphQL();

app.Map("/error", (HttpContext context) =>
{
	context.Response.StatusCode = 500;

	return Results.Problem("An unexpected error occurred.");
});

app.Run();
