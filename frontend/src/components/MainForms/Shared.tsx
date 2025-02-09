import { Form, Input, Select } from "antd"

/**
 * Форма для ввода текста, которая уже обёрнута в `Form.Item` для удобства.
 */
export const InputField: React.FC<{
	name: string
	label?: string
	placeholder?: string
	type?: 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week',
	value?: any
	min?: number
	style?: React.CSSProperties
	required?: boolean
}> = ({
	name,
	label = "",
	placeholder = "",
	type = "text",
	value,
	min,
	style,
	required = false,
}) => {
		return (
			<Form.Item name={name} label={label} rules={[{ required: required ?? false }]} initialValue={value} style={style}>
				<Input placeholder={placeholder} type={type} min={min} />
			</Form.Item>
		)
	}

/**
 * Форма для выбора значения из выпадающего списка, которая уже обёрнута в `Form.Item` для удобства.
 */
export const SelectField: React.FC<{
	name: string
	label?: string
	placeholder?: string
	options?: { value: string, label: string, disabled?: boolean }[]
	value?: any
	required?: boolean
}> = ({
	name,
	label = "",
	placeholder = "",
	options,
	value,
	required = false,
}) => {
		return (
			<Form.Item name={name} label={label} rules={[{ required: required ? true : false }]} initialValue={value}>
				<Select placeholder={placeholder} options={options} />
			</Form.Item>
		)
	}
