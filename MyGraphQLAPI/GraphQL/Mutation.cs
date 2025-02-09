using MyGraphQLAPI.DB;
using MyGraphQLAPI.Enums;
using MyGraphQLAPI.Models;

namespace MyGraphQLAPI.GraphQL;

public class Mutation
{
	public Book CreateBook(string title, string year, Genre genre, string author) => InMemoryDB.CreateBook(title, year, genre, author);

	public bool EditBook(string id, string? title, string? year, Genre? genre, string? author) => InMemoryDB.EditBook(id, title, year, genre, author, null);

	public int AddBookView(string id)
	{
		// Чисто технически, я мог просто использовать GetBook(...) += 1,
		// но я решил использовать EditBook(...), поскольку именно такой вариант
		// использовался бы с реальной БД, если БД не поддерживает query типа `+= 1`.

		int newViews = InMemoryDB.GetBook(id).Views + 1;

		InMemoryDB.EditBook(id, null, null, null, null, newViews);

		return newViews;
	}

	public bool DeleteBook(string id) => InMemoryDB.DeleteBook(id);
}
