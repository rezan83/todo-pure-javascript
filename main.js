const state = {
    data: {
        movedId: null,
        countId: 1,
        editableTodo: null,
        showModal: false,
        newContent: "",
        todos: [
            { content: "Orange", done: false, id: -5, periority: 1 },
            { content: "Apple", done: true, id: -4, periority: 1 },
            { content: "Milk", done: false, id: -3, periority: 1 },
            { content: "Banana", done: true, id: -2, periority: 1 },
            { content: "Energy Drink", done: false, id: -1, periority: 2 },
            { content: "Mars", done: false, id: -6, periority: 2 },
            { content: "Bonbon", done: true, id: -7, periority: 2 },
            { content: "Charger", done: false, id: -8, periority: 3 },
            { content: "Battery", done: false, id: -9, periority: 3 },
            { content: "Cabel", done: true, id: -10, periority: 3 },
        ]
    },
    addTodo() {
        this.data.todos.push({
            content: this.data.newContent,
            done: false,
            periority: 1,
            id: this.data.countId
        });
        this.data.countId++;
    },
    removeTodo(id) {
        this.data.todos = this.data.todos.filter((todo) => todo.id !== id);
    },
    toggleTodoIsDone(id) {
        let todo = this.findTodo(id);
        todo.done = !todo.done;
    },
    findTodo(id) {
        return this.data.todos.find((todo) => todo.id === parseInt(id));
    },
    periorityArea(periorityNumber) {
        let moved = state.findTodo(this.data.movedId);
        moved.periority = periorityNumber;
    },
    replace(replacedId) {
        
        let moved = state.findTodo(this.data.movedId);
        if (moved) {
            let replaced = state.findTodo(replacedId);
            const replacedIndex = this.data.todos.findIndex(
                (todo) => todo.id === replacedId
            );
            const movedIndex = this.data.todos.findIndex(
                (todo) => todo.id === this.data.movedId
            );

            // delete the moved todo
            this.data.todos.splice(movedIndex, 1);
            // place the moved todo
            if (moved.periority < replaced.periority) {
                this.data.todos.splice(replacedIndex - 1, 0, moved);
            } else {
                this.data.todos.splice(replacedIndex, 0, moved);
            }
        }
    },
    init() {
        if (localStorage.getItem("stateData")) {
            this.data = JSON.parse(localStorage.getItem("stateData"));
        }
        this.data.todos.sort((todo1, todo2 )=> todo1.periority-todo2.periority)
    }
};

const app = {
    todosContainerElement: document.querySelector(".todos-container"),
    urgentContainerElement: document.querySelector(".urgent-container"),
    normalContainerElement: document.querySelector(".normal-container"),
    todoEditModalContainerElement: document.querySelector(
        ".todo-edit-modal--container"
    ),
    todoInputElement: document.getElementById("todoInput"),
    todoFormElement: document.querySelector(".todoForm"),

    save() {
        localStorage.setItem("stateData", JSON.stringify(state.data));
    },
    removeTodoHandel(id) {
        state.removeTodo(id);
        this.renderTodos(state);
    },
    toggleTodoIsDoneHandel(id) {
        state.toggleTodoIsDone(id);
        this.renderTodos(state);
    },
    changeInputHandel(event) {
        state.data.newContent = event.target.value;
    },
    addHandel(event) {
        event.preventDefault();
        state.data.newContent && state.addTodo();
        state.data.newContent = "";
        this.render(state);
    },
    openEditModal(id) {
        state.data.showModal = true;
        state.data.editableTodo = state.findTodo(id);
        this.renderModal(state.data.editableTodo.content);
    },
    closeEditModal() {
        state.data.showModal = false;
        this.renderModal();
    },
    editTodoHandel(event) {
        state.data.editableTodo.content = event.target.value;
        this.renderTodos(state);
    },
    dragstartHandl(event, movedId) {
        state.data.movedId = parseInt(movedId);
        event.dataTransfer.effectAllowed = "move";
    },

    dragoverHandl(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    },

    dropHandl(event, periorityNumber) {
        event.preventDefault();
        state.periorityArea(periorityNumber);
        this.renderTodos(state);
    },

    dragoverTodoHandl(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    },

    dropTodoHandl(event, replacedId) {
        event.preventDefault();
        state.replace(parseInt(replacedId));
        this.renderTodos(state);
    },
    renderModal(content = null) {
        this.todoEditModalContainerElement.innerHTML = `<div class="todo-edit-modal ${
            state.data.showModal && "todo-edit-modal--show"
        }">
        
            <div class="todo">
                    <label for="todo-edit">Edit Todo:</label>
                    <input id="todo-edit" class="input-content" name="todo-edit"
                        onchange="app.editTodoHandel(event)"
                        value="${content}"
                    />
                    <div>
                        <button class="btn btn-close" onclick="app.closeEditModal()">done</button>
                    </div>
                </div>
            </div>`;
    },
    renderForm(state) {
        this.todoFormElement.innerHTML = `<div class="input-group">
                <label for="todoInput">Add Todo:</label>
                <input type="text" id="todoInput" class="input-content" name="todoInput"
                    value="${state.data.newContent}" 
                    onchange="app.changeInputHandel(event)"
                />
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
    renderTodo(todo) {
        let periorityClass =
            todo.periority === 1
                ? "low"
                : todo.periority === 2
                ? "normal"
                : "urgent";
        return `<div draggable="true" ondrop="app.dropTodoHandl(event,${
            todo.id
        })"ondragover="app.dragoverTodoHandl(event)" ondragstart="app.dragstartHandl(event,${
            todo.id
        })" class="todo${todo.done ? " todo-done" : ""} ${periorityClass}"  >
            <h3>${todo.content}</h3>
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
            <button class="btn btn-grap">&#128770; &#128772;</button>

            </div>`;
    },
    renderTodos(state) {
        this.todosContainerElement.innerHTML = state.data.todos
            .map((todo) => {
                if (todo.periority === 1) {
                    return this.renderTodo(todo);
                }
            })
            .join("");
        this.normalContainerElement.innerHTML = state.data.todos
            .map((todo) => {
                if (todo.periority === 2) {
                    return this.renderTodo(todo);
                }
            })
            .join("");
        this.urgentContainerElement.innerHTML = state.data.todos
            .map((todo) => {
                if (todo.periority === 3) {
                    return this.renderTodo(todo);
                }
            })
            .join("");
    },

    render(state) {
        this.renderForm(state);
        this.renderTodos(state);
    }
};

state.init();
app.render(state);
