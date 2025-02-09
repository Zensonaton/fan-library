import { App, Form, Modal } from "antd"
import { useEffect, useMemo, useState } from "react"
import { editBook } from "../../api/api"
import { GENRE_NAMES_MAP } from "../../consts"
import { Book } from "../../types"
import { InputField, SelectField } from "./Shared"

/**
 * Модальный компонент, использующий Modal для редактирования книги.
 */
export const EditBookModal: React.FC<{
	onClose: () => void
	onBookEdited: (book: Book) => void
	book: Book | null
}> = ({ onClose, onBookEdited, book }) => {
	const [form] = Form.useForm()

	const { message } = App.useApp()
	const [isLoading, setIsLoading] = useState(false)

	const genreOptions = useMemo(() => {
		return Object.entries(GENRE_NAMES_MAP).map(([key, value]) => ({
			value: key,
			label: value,
		}))
	}, [])

	const onSubmit = (book: Book) => {
		setIsLoading(true)

		editBook(book).then(
			() => onBookEdited(book)
		).catch((reason) => {
			console.error("Failed to edit a book:", reason)
			message.error("Не удалось отредактировать книгу: " + reason)
		}).finally(() => {
			setIsLoading(false)
			onClose()
		})
	}

	useEffect(() => {
		form.setFieldsValue({
			...book,
			genre: Object.keys(GENRE_NAMES_MAP).find(key => GENRE_NAMES_MAP[key] === book?.genre)
		})
	}, [book, form])

	return (
		<Modal title="Редактирование книги" open={book != null} loading={isLoading} onCancel={onClose} onOk={form.submit}>
			<Form form={form} layout="vertical" onFinish={onSubmit} initialValues={book ?? undefined}>
				<InputField
					name="id"
					type="hidden"
					style={{ display: "none" }}
				/>
				<InputField
					name="title"
					label="Название"
					placeholder="Название книги"
				/>
				<InputField
					name="year"
					label="Год публикации"
					placeholder="Год публикации книги"
					type="number"
					min={0}
				/>
				<SelectField
					name="genre"
					label="Жанр"
					placeholder="Жанр книги"
					options={genreOptions}
				/>
				<InputField
					name="author"
					label="Автор"
					placeholder="Имя и фамилия автора"
				/>
			</Form>
		</Modal>
	)
}
