const todoForm = document.querySelector(".todoForm");
const todosContainer = document.querySelector(".todos-container");
const removeBtn = document.querySelectorAll(".btn-remove");

const { todoInput, addBtn } = todoForm;

const state = {
    id: 1,
    todos: [],
    addTodo(todo) {
        this.todos.unshift(todo);
        this.id++;
    },
    removeTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    toggleTodo(id) {
        let todo = this.todos.find((todo) => todo.id === id);
        todo.done = !todo.done;
    },
    createTodo(content) {
        return { content: content, done: false, id: this.id };
    }
};

addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    state.addTodo(state.createTodo(todoInput.value));
    todoInput.value = "";
    renderTodo(state);
});

const removeTodoHandel = (id) => {
    state.removeTodo(id);
    renderTodo(state);
};

const toggleTodoHandel = (id) => {
    state.toggleTodo(id);
    renderTodo(state);
};

const renderTodo = (state) => {
    let todoTemplate = (todo) => `<div class="todo ${todo.done && "todo-done"}">
        <h2>${todo.content}</h2>
        <div>
            <button class="btn btn-toggle" onclick="toggleTodoHandel(${
                todo.id
            })">done</button>
            <button class="btn btn-remove" onclick="removeTodoHandel(${
                todo.id
            })">X</button>
        </div>
        </div>`;
    todosContainer.innerHTML = state.todos
        .map((todo) => {
            return todoTemplate(todo);
        })
        .join("");
};

renderTodo(state);
