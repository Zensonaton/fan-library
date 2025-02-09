/**
 * Базовый URL для запросов к API.
 */
export const API_BASE_URL: string = "http://localhost:5178"

/**
 * URL к API запросам GraphQL.
 */
export const GRAPHQL_API_URL: string = API_BASE_URL + "/graphql"

/**
 * Названия для жанров книг, возвращаемые с API.
 *
 * API Возвращает названия жанров на английском языке, в UPPER CASE.
 */
export const GENRE_NAMES_MAP: Record<string, string> = {
	"BIOGRAPHY": "Биография",
	"HUMOR": "Юмор",
	"NOVEL": "Новелла",
	"DYSTOPIAN": "Дистопия",
	"DRAMA": "Драма",
	"DETECTIVE": "Детектив",
	"FANTASY": "Фэнтези",
	"ROMANCE": "Роман",
	"ADVENTURE": "Приключенческое",
	"PHILOSOPHY": "Философия",
	"SCIENCE": "Наука",
	"PSYCHOLOGY": "Психология",
}

