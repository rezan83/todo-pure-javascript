
const state = {
    todos: [],
    title: "",
    content: "",
    appRunning: "y",
    toggleTodo: "n",
    wantRemoveTodo: "n",
    toggleTodoId: null,
    id: 1,
    removeId: null,
    addTodo(todo){
        this.todos.push(todo)
    },
    changeTodo(id){
        let toChangeTodo = this.todos.find(
            (todo) => todo.id === id
        );
        toChangeTodo.done = !toChangeTodo.done;
    },
    removeTodo(id){
        this.todos = this.todos.filter(
            (todo) => todo.id !== id
        );
    }
};

function Todo(state) {
    this.title = state.title;
    this.content = state.content;
    this.done = false;
    this.id = state.id;
    state.id++;
}

function runApp(state) {
    while (state.appRunning === "y") {
        state.title = prompt("title");
        state.content = prompt("content");
        state.addTodo(new Todo(state));

        state.toggleTodo = prompt("toggle a Todo: y/n");
        state.wantRemoveTodo = prompt("remove a Todo: y/n");
        if (state.wantRemoveTodo === "y") {
            state.removeId = parseInt(prompt("remove id"));
            state.removeTodo(state.removeId)
        }
        while (state.toggleTodo === "y") {
            state.toggleTodoId = parseInt(prompt("enter a todo id"));
            state.changeTodo(state.toggleTodoId )
            state.toggleTodo = prompt("toggle another Todo todo: y/n");
        }
        state.appRunning = prompt("add another todo: y/n");
    }
    console.log(state.todos);
}

runApp(state);
