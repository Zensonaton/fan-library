using MyGraphQLAPI.Enums;

namespace MyGraphQLAPI.Models;

/// <summary>
/// Репрезентация отдельного объекта книги.
/// </summary>
public class Book
{
	/// <summary>
	/// ID, используемый для идентификации книги.
	/// </summary>
	public string ID { get; set; } = Guid.NewGuid().ToString();

	/// <summary>
	/// Название.
	/// </summary>
	public required string Title { get; set; }

	/// <summary>
	/// Год публикации.
	/// </summary>
	public required string Year { get; set; }

	/// <summary>
	/// Жанр.
	/// </summary>
	public required Genre Genre { get; set; }

	/// <summary>
	/// Автор.
	/// </summary>
	public required string Author { get; set; }

	/// <summary>
	/// Количество просмотров у книги.
	/// </summary>
	public int Views { get; set; } = 0;
}

