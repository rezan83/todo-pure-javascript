const state = {
    countId: 1,
    editableTodo: null,
    showModal:false,
    newContent: "",
    todos: [
        { content: "Orange", done: false, id: -1 },
        { content: "Apple", done: true, id: 0 }
    ],
    addTodo() {
        this.todos.unshift({
            content: this.newContent,
            done: false,
            id: this.countId
        });
        this.countId++;
    },
    removeTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    toggleTodoIsDone(id) {
        let todo = this.findTodo(id);
        todo.done = !todo.done;
    },
    findTodo(id) {
        return this.todos.find((todo) => todo.id === id);
    }

};

const app = {
    todosContainerElement: document.querySelector(".todos-container"),
    todoEditModalContainerElement: document.querySelector(
        ".todo-edit-modal--container"
    ),
    todoInputElement: document.getElementById("todoInput"),
    todoFormElement: document.querySelector(".todoForm"),

    removeTodoHandel(id) {
        state.removeTodo(id);
        this.renderTodos(state);
    },
    toggleTodoIsDoneHandel(id) {
        state.toggleTodoIsDone(id);
        this.renderTodos(state);
    },
    changeInputHandel(event) {
        state.newContent = event.target.value;
    },
    addHandel(event) {
        event.preventDefault();
        state.newContent && state.addTodo();
        state.newContent = "";
        this.render(state);
    },
    openEditModal(id) {
        state.showModal = true;
        state.editableTodo = state.findTodo(id);
        this.renderModal(state.editableTodo.content);
    },
    closeEditModal() {
        state.showModal = false;
        this.renderModal();
    },
    editTodoHandel(event) {
        state.editableTodo.content = event.target.value;
        this.renderTodos(state);
    },
    renderModal(content = null) {
        this.todoEditModalContainerElement.innerHTML = `<div class="todo-edit-modal ${
            state.showModal && "todo-edit-modal--show"
        }">
    
        <div class="todo">
                <label for="todo-edit">Edit Todo:</label>
                <input id="todo-edit" class="input-content" name="todo-edit" onchange="app.editTodoHandel(event)" value="${content}"/>
                <div>
                    <button class="btn btn-close" onclick="app.closeEditModal()">done</button>
                </div>
            </div>
        </div>`;
    },
    renderForm(state) {
        this.todoFormElement.innerHTML = `<div class="input-group">
        <label for="todoInput">Add Todo:</label>
        <input type="text" id="todoInput" class="input-content" name="todoInput" value="${state.newContent}" onchange="app.changeInputHandel(event)"/>
        </div>
            <button
                id="addBtn"
                name="addBtn"
                onclick="app.addHandel(event)"
                class="btn btn-add"
            >
                +
            </button>`;
    },
    renderTodos(state) {
        this.todosContainerElement.innerHTML = state.todos
            .map((todo) => {
                return `<div class="todo ${todo.done && "todo-done"}">
            <h2>${todo.content}</h2>
            <div class="btn-group">
              
                <button class="btn btn-toggle" onclick="app.toggleTodoIsDoneHandel(${
                    todo.id
                })">&#10004;</button>
                <button class="btn btn-edit" onclick="app.openEditModal(${
                    todo.id
                })">&#9998;</button>
                <button class="btn btn-remove" onclick="app.removeTodoHandel(${
                    todo.id
                })">&#x1F5D1;</button>
            </div>
            </div>`;
            })
            .join("");
    },
    render(state) {
        this.renderForm(state);
        this.renderTodos(state);
    }
};

app.render(state);
