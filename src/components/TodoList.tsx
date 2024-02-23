import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import {
	addTodo,
	deleteTodo,
	deleteAll,
	editTodo,
} from "../redux/features/todoSlice";
import { useAppSelector } from "../redux/store";
import { toggleTodoCompleted } from "../redux/features/todoSlice";

import scss from "./TodoList.module.scss";

interface Todo {
	id: number;
	name: string;
	age: number;
	url: string;
	completed: boolean;
}

const TodoComponent: FC = () => {
	const dispatch = useDispatch();
	const todos = useAppSelector((state) => state.todoReducer.data) as Todo[];
	const [newTodoName, setNewTodoName] = useState<string>("");
	const [newTodoAge, setNewTodoAge] = useState<number>(0);
	const [newTodoUrl, setNewTodoUrl] = useState<string>("");
	const [newInputTodo, setNewInputTodo] = useState<string>("");
	const [newTodoAgeInput, setTodoAgeInput] = useState<number>(0);
	const [newTodoUrlInput, setTodoUrlInput] = useState<string>("");
	const [editTodoId, setEditTodoId] = useState<number | boolean>(false);
	const [isResult, setIsResult] = useState<boolean>(true);

	const editTodoItem = (
		id: number,
		updatedValues: { name: string; age: number; url: string }
	) => {
		dispatch(
			editTodo({
				id,
				...updatedValues,
			})
		);
		setEditTodoId(0); // Reset the editTodoId after editing
	};

	

	const addTodoItem = () => {
		dispatch(
			addTodo({
				name: newTodoName,
				age: newTodoAge,
				url: newTodoUrl,
			})
		);

		setNewTodoName("");
		setNewTodoAge(0);
		setNewTodoUrl("");
	};

	const removeTodoItem = (id: number) => {
		dispatch(deleteTodo(id));
	};

	const removeAllTodos = () => {
		dispatch(deleteAll());
	};
	function result(id: number) {
		setEditTodoId(id);
	}
	const handleToggleCompleted = (id: number) => {
		dispatch(toggleTodoCompleted(id));
	};

	return (
		<>
			<div className={scss.inputTodo}>
				<input
					type="text"
					placeholder="Todo Name"
					value={newTodoName}
					onChange={(e) => setNewTodoName(e.target.value)}
					required
				/>
				<input
					type="number"
					placeholder="Todo Age"
					value={newTodoAge}
					onChange={(e) => setNewTodoAge(parseInt(e.target.value, 10) || 0)}
					required
				/>
				<input
					type="url"
					placeholder="Todo URL"
					value={newTodoUrl}
					onChange={(e) => setNewTodoUrl(e.target.value)}
					required
				/>
				<button onClick={addTodoItem}>Add Todo</button>
				<button onClick={removeAllTodos}>Delete All</button>
			</div>

			{todos.map((todo) => (
				<div className={scss.todo} key={todo.id}>
					{editTodoId === todo.id ? (
						<>
							<input
								type="text"
								placeholder="Updated Name"
								value={isResult ? todo.name : newInputTodo}
								onChange={(e) => {
									setIsResult(false);
									setNewInputTodo(e.target.value);
								}}
							/>
							<input
								type="number"
								placeholder="Updated Age"
								value={isResult ? todo.age : newTodoAgeInput}
								onChange={(e) => {
									setIsResult(false);
									setTodoAgeInput(parseInt(e.target.value, 10) || 0);
								}}
							/>
							<input
								type="url"
								placeholder="Updated URL"
								value={isResult ? todo.url : newTodoUrlInput}
								onChange={(e) => {
									setIsResult(false);
									setTodoUrlInput(e.target.value);
								}}
							/>
							<button
								onClick={() =>
									editTodoItem(todo.id, {
										name: newInputTodo,
										age: newTodoAgeInput,
										url: newTodoUrlInput,
									})
								}>
								Save
							</button>
							<button onClick={() => setEditTodoId(false)}>Cancel</button>
						</>
					) : (
						<>
							<input
								className="checkbox"
								type="checkbox"
								id={`completed-${todo.id}`}
								checked={todo.completed}
								onChange={() => handleToggleCompleted(todo.id)}
							/>
							<label
								style={{
									textDecoration: todo.completed ? "line-through" : "none",
								}}>
								{todo.name}, {todo.age}
							</label>
							<img src={todo.url} alt="" />
							<button onClick={() => removeTodoItem(todo.id)}>Delete</button>
							<button
								onClick={() => {
									result(todo.id);
									setIsResult(true);
								}}>
								Edit
							</button>
						</>
					)}
				</div>
			))}
		</>
	);
};

export default TodoComponent;
