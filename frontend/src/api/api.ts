import { gql } from "@apollo/client"
import { apolloClient } from "../main"
import { Book } from "../types"

/**
 * Делает API-запрос, добавляя новую книгу.
 * @param book Новая книга.
 * @returns ID новой книги.
 */
export const createBook = async (book: Book): Promise<number> => {
	const response = await apolloClient.mutate({
		mutation: gql`
			mutation AddBook(
				$title: String!
				$year: String!
				$genre: Genre!,
				$author: String!
			) {
				newBook: createBook(
					title: $title,
					year: $year,
					genre: $genre,
					author: $author
				) {
					id
				}
			}
		`,
		variables: book,
	})

	return response.data.newBook as number
}

/**
 * Делает API-запрос, редактируя книгу.
 * @param book Книга, содержащая в себе новые изменения. Самое важное, чтобы ID книги совпадал с тем, что хранится на сервере.
 */
export const editBook = async (book: Book): Promise<boolean> => {
	const response = await apolloClient.mutate({
		mutation: gql`
			mutation EditBook(
				$id: String!
				$title: String
				$year: String
				$genre: Genre,
				$author: String
			) {
				editedBook: editBook(
					id: $id
					title: $title
					year: $year
					genre: $genre
					author: $author
				)
			}
		`,
		variables: book
	})

	return response.data.editedBook ?? false
}

/**
 * Делает API-запрос, удаляя книгу.
 * @param id ID книги, которую нужно удалить.
 */
export const deleteBook = async (id: string): Promise<void> => {
	await apolloClient.mutate({
		mutation: gql`
			mutation DeleteBook(
				$id: String!
			) {
				deletedBook: deleteBook(
					id: $id
				)
			}
		`,
		variables: {
			id,
		}
	})
}

/**
 * Делает API-запрос, добавляя просмотр на книгу.
 * @param id ID книги, к которой нужно добавить просмотр.
 * @returns Количество просмотров после добавления.
 */
export const addBookView = async (id: string): Promise<number> => {
	const response = await apolloClient.mutate({
		mutation: gql`
			mutation AddBookView(
				$id: String!
			) {
				newViews: addBookView(
					id: $id
				)
			}
		`,
		variables: {
			id,
		}
	})

	return response.data.newViews as number
}
