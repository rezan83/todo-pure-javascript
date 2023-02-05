const state = {
    data: {
        movedId: null,
        countId: 1,
        editableTodo: null,
        showModal: false,
        newContent: "",
        todos: [
            { content: "Orange", done: false, id: -5 , periority: 1},
            { content: "Apple", done: true, id: -4 ,  periority: 1},
            { content: "Milk", done: false, id: -3 , periority: 1},
            { content: "Banana", done: true, id: -2 ,  periority: 1},
            { content: "Ananas", done: false, id: -1 , periority: 2},
            { content: "Bonbon", done: true, id: 0 ,  periority: 2}
        ]
    },
    addTodo() {
        this.data.todos.unshift({
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
    replace(replacedId) {
        let movedId = this.data.movedId;
        let moved = state.findTodo(movedId);
        let movedPeriority = moved.periority
        let replaced = state.findTodo(replacedId);
        let replacedPeriority = replaced.periority
        replaced.periority = movedPeriority
        moved.periority = replacedPeriority
        const replacedIndex = this.data.todos.findIndex(
            (tod) => tod.id === replacedId
        );
        const movedIndex = this.data.todos.findIndex(
            (tod) => tod.id === movedId
        );

        this.data.todos.splice(replacedIndex, 1, moved);
        this.data.todos.splice(movedIndex, 1, replaced);
    },
    init() {
        if (localStorage.getItem("stateData")) {
            this.data = JSON.parse(localStorage.getItem("stateData"));
        }
    }
};

const app = {
    todosContainerElement: document.querySelector(".todos-container"),
    urgentContainerElement: document.querySelector(".urgent-container"),
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
        state.data.movedId = movedId;
        event.dataTransfer.effectAllowed = "move";
    },

    dragoverHandl(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    },

    dropHandl(event, replacedId) {
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
    renderTodos(state) {
        this.todosContainerElement.innerHTML = state.data.todos
            .map((todo) => {
                if (todo.periority === 1) {
                    
                    return `<div draggable="true" ondrop="app.dropHandl(event,${
                        todo.id
                    })"ondragover="app.dragoverHandl(event)" ondragstart="app.dragstartHandl(event,${
                        todo.id
                    })" class="todo${todo.done ? " todo-done" : ""}"  >
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
                <button class="btn btn-grap">&#128770; &#128772;</button>
    
                </div>`;
                }
            })
            .join("");
            this.urgentContainerElement.innerHTML = state.data.todos
            .map((todo) => {
                if (todo.periority === 2) {
                    
                    return `<div draggable="true" ondrop="app.dropHandl(event,${
                        todo.id
                    })"ondragover="app.dragoverHandl(event)" ondragstart="app.dragstartHandl(event,${
                        todo.id
                    })" class="todo${todo.done ? " todo-done" : ""}"  >
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
                <button class="btn btn-grap">&#128770; &#128772;</button>
    
                </div>`;
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
