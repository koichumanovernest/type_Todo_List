import { createSlice, createAction } from "@reduxjs/toolkit";

interface CreateSliceType {
  id: number;
  name: string;
  age: number;
  url: string;
  completed: boolean;
}

const initialState: { data: CreateSliceType[] } = {
  data: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newData: CreateSliceType = {
        id: Date.now(),
        name: action.payload.name,
        age: action.payload.age,
        url: action.payload.url,
        completed: false,
      };
      state.data = [...state.data, newData];
    },
    deleteTodo: (state, action) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, name, age, url } = action.payload;
      const index = state.data.findIndex((todo) => todo.id === id);

      if (index !== -1) {
        state.data[index] = { id, name, age, url, completed: state.data[index].completed };
      }
    },
    deleteAll: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(toggleTodoCompleted, (state, action) => {
      const todo = state.data.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    });
  },
});

export const { addTodo, deleteTodo, editTodo, deleteAll } = todoSlice.actions;
export const toggleTodoCompleted = createAction<number>("toggleTodoCompleted");
export const todoReducer = todoSlice.reducer;
