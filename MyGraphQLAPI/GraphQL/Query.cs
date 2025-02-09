using MyGraphQLAPI.DB;
using MyGraphQLAPI.Models;

namespace MyGraphQLAPI.GraphQL;

public class Query
{
	/// <summary>
	/// Возвращает список из всех книг, находящихся в библиотеке.
	/// </summary>
	public List<Book> GetBooks()
	{
		return InMemoryDB.GetBooks();
	}
}
