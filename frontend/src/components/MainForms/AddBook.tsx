import { App, Button, Drawer, Flex, Form } from "antd"
import React, { useMemo, useState } from "react"
import { createBook } from "../../api/api"
import { GENRE_NAMES_MAP } from "../../consts"
import { Book } from "../../types"
import { InputField, SelectField } from "./Shared"

/**
 * Модальный компонент, использующий Drawer для добавления книги.
 */
export const AddBookModal: React.FC<{
	isOpen: boolean
	onClose: () => void
	onBookAdded: (book: Book) => void
}> = ({ isOpen, onClose, onBookAdded }) => {
	const [form] = Form.useForm()

	const { message } = App.useApp()
	const [isLoading, setIsLoading] = useState(false)

	const genreOptions = useMemo(() => {
		return Object.entries(GENRE_NAMES_MAP).map(([key, value]) => ({
			value: key,
			label: value,
		}))
	}, [])

	const onCancel = () => {
		form.resetFields()
		onClose()
	}

	const onSubmit = (book: Book) => {
		setIsLoading(true)

		createBook(book).then(
			() => onBookAdded(book)
		).catch((reason) => {
			console.error("Failed to create a new book:", reason)
			message.error("Не удалось добавить новую книгу: " + reason)
		}).finally(() => {
			setIsLoading(false)
			onCancel()
		})
	}

	return (
		<Drawer title="Новая книга" onClose={onClose} open={isOpen}>
			<Form form={form} layout="vertical" onFinish={onSubmit}>
				<InputField
					name="title"
					label="Название"
					placeholder="Название книги"
					required
				/>
				<InputField
					name="year"
					label="Год публикации"
					placeholder="Год публикации книги"
					type="number"
					min={0}
					required
				/>
				<SelectField
					name="genre"
					label="Жанр"
					placeholder="Жанр книги"
					options={genreOptions}
					required
				/>
				<InputField
					name="author"
					label="Автор"
					placeholder="Имя и фамилия автора"
					required
				/>

				<Flex gap={8}>
					<Form.Item>
						<Button onClick={onCancel}>
							Отмена
						</Button>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" loading={isLoading}>
							Сохранить
						</Button>
					</Form.Item>
				</Flex>
			</Form>
		</Drawer>
	)
}
