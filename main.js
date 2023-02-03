const todoForm = document.querySelector(".todoForm");
const todosContainer = document.querySelector(".todos-container");
const todoEditModal = document.querySelector(".todo-edit-modal");
const todoEdit = document.getElementById("todo-edit");

const { todoInput, addBtn } = todoForm;

const state = {
    countId: 1,
    editTodo: null,
    todos: [
        // { content: "Orange", done: false, id: -1 },
        // { content: "Apple", done: true, id: 0 },
    ],
    addTodo(todo) {
        this.todos.unshift(todo);
        this.countId++;
    },
    removeTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    toggleTodo(id) {
        let todo = this.findTodo(id);
        todo.done = !todo.done;
    },
    // editTodo(id) {
    //     let todo = this.findTodo(id);
    //     console.log(todo);
    // },
    findTodo(id) {
        return this.todos.find((todo) => todo.id === id);
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

const closeEditModal = () => {
    state.editTodo.content = todoEdit.value
    todoEditModal.style.display = "none";
    renderTodo(state);
};

const editTodoHandel = (id) => {
    state.editTodo = state.findTodo(id);
    todoEdit.value = state.editTodo.content
    todoEditModal.style.display = "grid";
    renderTodo(state);
};

const renderTodo = (state) => {
    let todoTemplate = (todo) => `<div class="todo ${todo.done && "todo-done"}">
        <h2>${todo.content}</h2>
        <div>
            <button class="btn btn-toggle" onclick="toggleTodoHandel(${
                todo.id
            })">&#10004;</button>
            <button class="btn btn-edit" onclick="editTodoHandel(${
                todo.id
            })">&#9998;</button>
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
