using MyGraphQLAPI.Enums;
using MyGraphQLAPI.Models;

namespace MyGraphQLAPI.DB;

/// <summary>
/// Класс, хранящий информацию в памяти, который является заглушкой для реальной БД.
/// </summary>
class InMemoryDB
{
	private static List<Book> _bookRecords = [
			new Book { Title = "The Only Band In The World", Year = "2024", Genre = Genre.Biography, Author = "Ryan Bird" },
			new Book { Title = "The World According to Cunk", Year = "2024", Genre = Genre.Humor, Author = "Philomena Cunk" },
			new Book { Title = "War and Peace", Year = "1869", Genre = Genre.Novel, Author = "Leo Tolstoy" },
			new Book { Title = "1984", Year = "1949", Genre = Genre.Dystopian, Author = "George Orwell" },
			new Book { Title = "The Master and Margarita", Year = "1967", Genre = Genre.Novel, Author = "Mikhail Bulgakov" },
			new Book { Title = "To Kill a Mockingbird", Year = "1960", Genre = Genre.Drama, Author = "Harper Lee" },
			new Book { Title = "The Adventures of Sherlock Holmes", Year = "1892", Genre = Genre.Detective, Author = "Arthur Conan Doyle" },
			new Book { Title = "Harry Potter and the Philosopher's Stone", Year = "1997", Genre = Genre.Fantasy, Author = "J.K. Rowling" }
		];

	/// <summary>
	/// Возвращает список из всех известных книг.
	/// </summary>
	///
	/// <returns>Список из всех книг.</returns>
	public static List<Book> GetBooks()
	{
		return _bookRecords;
	}

	/// <summary>
	/// Создаёт новую книгу и добавляет её в список книг, которую можно потом получить через метод GetBook.
	/// </summary>
	///
	/// <param name="title">Год книги.</param>
	/// <param name="year">Год публикации книги.</param>
	/// <param name="genre">Жанр книги.</param>
	/// <param name="author">Автор книги.</param>
	///
	/// <returns>Созданный объект Book.</returns>
	public static Book CreateBook(string title, string year, Genre genre, string author)
	{
		title = title.Trim();
		year = year.Trim();
		author = author.Trim();

		int yearInt;

		if (!int.TryParse(year, out yearInt)) throw new ArgumentException("Year must be a number.");
		if (yearInt < 0) throw new ArgumentException("Year must be a positive number.");

		Book book = new Book
		{
			Title = title,
			Year = year,
			Genre = genre,
			Author = author
		};

		_bookRecords.Add(book);

		return book;
	}

	/// <summary>
	/// Возвращает Book по её ID. Возвращает исключение ArgumentNullException, если книга с таким ID не найдена.
	/// </summary>
	///
	/// <param name="id">ID книги, которую необходимо найти.</param>
	///
	/// <returns>Книгу по переданному ID.</returns>
	public static Book GetBook(string id)
	{
		return _bookRecords.Where(book => book.ID == id).First();
	}

	/// <summary>
	/// Модифицирует книгу по её ID. Возвращает исключение ArgumentNullException, если книга с таким ID не найдена.
	/// </summary>
	///
	/// <param name="id">ID книги, которую нужно модифицировать.</param>
	/// <param name="title">Новое название книги.</param>
	/// <param name="year">Новый год публикации книги.</param>
	/// <param name="genre">Новый жанр книги.</param>
	/// <param name="author">Новый автор книги.</param>
	/// <param name="views">Количество просмотров у книги.</param>
	///
	/// <returns>true, если книга была успешно модифицирована (т.е., поля отличались, ...).</returns>
	public static bool EditBook(string id, string? title, string? year, Genre? genre, string? author, int? views)
	{
		Book book = GetBook(id);

		title = title?.Trim();
		year = year?.Trim();
		author = author?.Trim();

		if (year != null)
		{
			int yearInt;

			if (!int.TryParse(year, out yearInt)) throw new ArgumentException("Year must be a number.");
			if (yearInt < 0) throw new ArgumentException("Year must be a positive number.");
		}

		// Я знаю и понимаю, что это грязный код.
		// Не уверен, что было бы лучше.
		bool isModified = false;

		if (title != null && title != book.Title)
		{
			book.Title = title;
			isModified = true;
		}
		if (year != null && year != book.Year)
		{
			book.Year = year;
			isModified = true;
		}
		if (genre != null && genre != book.Genre)
		{
			book.Genre = (Genre)genre;
			isModified = true;
		}
		if (author != null && author != book.Author)
		{
			book.Author = author;
			isModified = true;
		}
		if (views != null && views != book.Views)
		{
			book.Views = (int)views;
			isModified = true;
		}

		return isModified;
	}

	/// <summary>
	/// Удаляет книгу по её ID. Возвращает исключение ArgumentNullException, если книга с таким ID не найдена.
	/// </summary>
	///
	/// <param name="id">ID книги, которую нужно удалить.</param>
	///
	/// <returns>true, если книга была успешно удалена.</returns>
	public static bool DeleteBook(string id)
	{
		Book book = GetBook(id);

		return _bookRecords.Remove(book);

		// Я понимаю, что здесь получается дублирование поиска книги:
		//  1. В GetBook (.Where) проходится по всем книгам, чтобы найти её.
		//  2. В .Remove, C# наверняка повторно пробегается по всем книгам, чтобы удалить её.
	}
}
