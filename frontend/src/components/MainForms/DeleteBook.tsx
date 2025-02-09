import { App, Modal } from "antd"
import { Book } from "../../types"
import { useState } from "react"
import { deleteBook } from "../../api/api"

/**
 * Модальный компонент, использующий Modal для удаления книги.
 */
export const DeleteBookModal: React.FC<{
	onClose: () => void
	onBookDeleted: (book: Book) => void
	book: Book | null
}> = ({ onClose, onBookDeleted, book }) => {
	const { message } = App.useApp()
	const [isLoading, setIsLoading] = useState(false)

	const onSubmit = (book: Book) => {
		setIsLoading(true)

		deleteBook(book.id).then(
			() => onBookDeleted(book)
		).catch((reason) => {
			console.error("Failed to edit a book:", reason)
			message.error("Не удалось удалить книгу: " + reason)
		}).finally(() => {
			setIsLoading(false)
			onClose()
		})
	}

	return (
		<Modal title="Удаление книги" onCancel={onClose} open={book != null} onOk={() => onSubmit(book!)} loading={isLoading}>
			Вы уверены, что хотите удалить книгу «{book?.title}»? Данное действие нельзя отменить!
		</Modal>
	)
}
