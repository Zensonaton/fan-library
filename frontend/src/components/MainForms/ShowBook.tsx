import { Modal } from "antd"
import React, { useEffect } from "react"
import { Book } from "../../types"
import { addBookView } from "../../api/api"

/**
 * Модальный компонент, использующий Modal для отображения содержимого книги.
 */
export const ShowBookModal: React.FC<{
	onClose: () => void
	onBookEdited: (book: Book) => void
	book: Book | null
}> = ({ onClose, onBookEdited, book }) => {
	useEffect(() => {
		if (book == null) return

		addBookView(book.id).then((views) => {
			onBookEdited({
				...book,
				views: views
			} as Book)
		})
	}, [book?.id])

	return (
		<Modal title={book?.title} onCancel={onClose} open={book != null}>
			Название: {book?.title}<br />
			Год публикации: {book?.year}<br />
			Жанр: {book?.genre}<br />
			Автор: {book?.author}<br />
			Просмотры: {book?.views}
		</Modal>
	)
}
