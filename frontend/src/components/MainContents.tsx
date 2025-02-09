import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { gql, useQuery } from "@apollo/client"
import { Button, Checkbox, Flex, Spin, Table } from "antd"
import { ColumnType } from "antd/es/table"
import { useMemo, useState } from "react"
import { GENRE_NAMES_MAP } from "../consts"
import { Book } from '../types'
import { AddBookModal } from './MainForms/AddBook'
import { DeleteBookModal } from './MainForms/DeleteBook'
import { EditBookModal } from './MainForms/EditBook'
import { ShowBookModal } from './MainForms/ShowBook'

/**
 * Расширение для типа колонок таблицы, добавляющее поле `nonEditable`.
 */
interface ExtendedColumnType extends ColumnType<any> {
	nonEditable?: boolean
}

/**
 * Колонки таблицы, не включающие в себе колонку с техническими данными.
 */
const tableColumns: ExtendedColumnType[] = [
	{
		title: "Название",
		dataIndex: "title",
		key: "title",
	},
	{
		title: "Год публикации",
		dataIndex: "year",
		key: "year",
	},
	{
		title: "Жанр",
		dataIndex: "genre",
		key: "genre",
	},
	{
		title: "Автор",
		dataIndex: "author",
		key: "author",
	},
	{
		title: "Просмотры",
		dataIndex: "views",
		key: "views",
		nonEditable: true,
	},
]

/**
 * Технические колонки для таблицы, отображаемые лишь в случае, если "отобразить технические данные" включены.
 */
const technicalTableColumns: ExtendedColumnType[] = [
	{
		title: "ID",
		dataIndex: "id",
		key: "id",
		nonEditable: true
	}
]

export const MainContents: React.FC = () => {
	const [showTechInfo, setShowTechInfo] = useState(false)

	const [isAddBookOpen, setIsAddBookOpen] = useState(false)
	const [bookToDelete, setBookToDelete] = useState<Book | null>(null)
	const [bookToEdit, setBookToEdit] = useState<Book | null>(null)
	const [bookToShow, setBookToShow] = useState<Book | null>(null)

	const { loading, error, data, refetch } = useQuery<{ books: Book[] }>(gql`
		query GetBooks {
			books {
				id
				title
				year
				genre
				author
				views
			}
		}
	`)

	const dataSource = useMemo(() => {
		if (loading || error || !data) {
			return []
		}

		return data.books.map((book: any) => {
			return {
				...book,

				// "Переводим" жанры с бэка на русский язык.
				genre: GENRE_NAMES_MAP[book.genre],
			}
		})
	}, [loading, error, data])

	const allTableColumns = useMemo(() => {
		const columns = tableColumns.map(column => ({ ...column }))

		// Добавляем техническую информацию, если пользователь хочет её видеть.
		if (showTechInfo) {
			columns.unshift(...technicalTableColumns)
		}

		// Добавляем колонку с действиями.
		columns.push({
			title: "Действия",
			key: "actions",
			render: (book: Book) => {
				return (
					<Flex gap={8} align="center">
						<Button type="primary" onClick={() => setBookToShow(book)}>Открыть</Button>
						<Button shape="circle" icon={<EditOutlined />} onClick={() => setBookToEdit(book)} />
						<Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => { setBookToDelete(book) }} />
					</Flex>
				)
			}
		})

		return columns
	}, [showTechInfo, data, bookToEdit])

	const onBooksUpdated = () => {
		console.log("Books updated!")

		refetch()
	}

	return (
		<>
			<div className="main-contents">
				{/* Загрузка. */}
				{loading && (
					<Spin />
				)}

				{/* Ошибка. */}
				{error && (
					<div className="error-dialog">
						<p>Произошла ошибка при загрузке данных.</p>
					</div>
				)}

				{/* Данные. */}
				{data && (
					<Table columns={allTableColumns} dataSource={dataSource} />
				)}

				{/* Кнопки управления. */}
				<Flex gap={12} align="center">
					<Button type="primary" onClick={() => setIsAddBookOpen(true)}>Добавить книгу</Button>

					<Checkbox onChange={
						(e) => setShowTechInfo(e.target.checked)
					}>Отобразить технические данные</Checkbox>
				</Flex>
			</div>

			{/* Модалки. */}
			<AddBookModal isOpen={isAddBookOpen} onClose={() => setIsAddBookOpen(false)} onBookAdded={onBooksUpdated} />
			<EditBookModal onClose={() => setBookToEdit(null)} onBookEdited={onBooksUpdated} book={bookToEdit!} />
			<DeleteBookModal onClose={() => setBookToDelete(null)} onBookDeleted={onBooksUpdated} book={bookToDelete!} />
			<ShowBookModal onClose={() => { setBookToShow(null) }} onBookEdited={onBooksUpdated} book={bookToShow} />
		</>
	)
}
