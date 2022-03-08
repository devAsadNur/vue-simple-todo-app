<template>
    <div id="main-content">
        <form action="">
            <div id="todo-input-wrapper">
                <input type="text" placeholder="Add new todo" v-model="inputTask" ref="todoInput">
                <button type="submit" @click.prevent="handleTask()">{{ inputButtonLabel }}</button>
            </div>
        </form>

        <div id="todo-wrapper">
            <table v-if="tasks.length">
                <tr>
                    <th>Task name</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                <tr v-for="(task, index) in tasks" :key="index">
                    <td>{{ task.todo_name }}</td>
                    <td class="todo-status" @click="changeStatus( task.id, task.todo_status )">{{ task.todo_status }}</td>
                    <td>
                        <button class="btn-edit-todo" @click.prevent="editTask( index, task.id )">Edit</button>
                        <button class="btn-remove-todo" @click.prevent="removeTask( task.id )">Remove</button>
                    </td>
                </tr>
            </table>

            <div v-if="isLoading" id="todo-loading">
                <img src="./assets/loading-buffering.gif" alt="Loading">
            </div>
        </div>


    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'app-content',
    data() {
        return {
            inputTask: '',
            inputButtonLabel : 'Add Task',
            isEdit: false,
            selectedTaskIndex: 0,
            selectedTaskId: 0,
            statuses: [ 'to-do', 'in-progress', 'finished'],
            tasks: [],
            isLoading: false,
        }
    },
    methods: {
        fetchAllTasks() {
            this.isLoading = true;
            axios({
                method: 'get',
                url: 'http://wepos-dev.test/wp-json/wedevs/v1/todos',
                proxy: {
                    protocol: window.location.protocol,
                    host: window.location.host,
                    port: window.location.port
                },
                auth: {
                    username: 'admin',
                    password: 'admin'
                }
            })
            .then(response => {
                this.tasks = response.data;
                this.isLoading = false;
            });
        },
        createTask() {
            this.isLoading = true;

            axios({
                method: 'post',
                url: 'http://wepos-dev.test/wp-json/wedevs/v1/todos',
                proxy: {
                    protocol: window.location.protocol,
                    host: window.location.host,
                    port: window.location.port
                },
                auth: {
                    username: 'admin',
                    password: 'admin'
                },
                data: {
                    'todo_name': this.inputTask,
                    'todo_status': 'to-do'
                }
            })
            .then(response => {
                this.fetchAllTasks();
            });

            this.inputTask = '';
        },
        updateTask( index, id ) {
            this.isLoading = true;

            axios({
                method: 'put',
                url: 'http://wepos-dev.test/wp-json/wedevs/v1/todos/' + id,
                proxy: {
                    protocol: window.location.protocol,
                    host: window.location.host,
                    port: window.location.port
                },
                auth: {
                    username: 'admin',
                    password: 'admin'
                },
                data: {
                    'todo_name': this.inputTask
                }
            })
            .then(response => {
                this.inputTask = '';
                this.inputButtonLabel = 'Add Task';
                this.isEdit = false;
                this.fetchAllTasks();
            });
        },
        removeTask( id ) {
            this.isLoading = true;

            axios({
                method: 'delete',
                url: 'http://wepos-dev.test/wp-json/wedevs/v1/todos/' + id,
                proxy: {
                    protocol: window.location.protocol,
                    host: window.location.host,
                    port: window.location.port
                },
                auth: {
                    username: 'admin',
                    password: 'admin'
                }
            })
            .then(response => {
                this.fetchAllTasks();
            });
        },
        editTask( index, id ) {
            let taskName = this.tasks[index].todo_name;
            this.inputTask = taskName;
            this.inputButtonLabel = 'Update Task';
            this.selectedTaskIndex = index;
            this.selectedTaskId = id;
            this.isEdit = true;
            this.$refs.todoInput.focus();
        },
        changeStatus( id, status ) {
            this.isLoading = true;
            let currentStatusIndex = this.statuses.indexOf( status );
            let newStatus = "";

            if ( currentStatusIndex >= ( this.statuses.length - 1 ) ) {
                newStatus = this.statuses[0];

            } else {
                newStatus = this.statuses[++currentStatusIndex];
            }

            axios({
                method: 'put',
                url: 'http://wepos-dev.test/wp-json/wedevs/v1/todos/' + id,
                proxy: {
                    protocol: window.location.protocol,
                    host: window.location.host,
                    port: window.location.port
                },
                auth: {
                    username: 'admin',
                    password: 'admin'
                },
                data: {
                    'todo_status': newStatus,
                }
            })
            .then(response => {
                this.fetchAllTasks();
            });
        },
        handleTask() {
            if ( this.isEdit ) {
                this.updateTask( this.selectedTaskIndex, this.selectedTaskId );
            } else {
                this.createTask();
            }
        },
    },
    mounted() {
        this.fetchAllTasks();
        this.$refs.todoInput.focus();
    },
    // updated() {
    //     this.fetchAllTasks();
    // },
}
</script>

<style scoped>
    #main-content {
        max-width: 500px;
        min-height: 400px;
        margin: 0 auto;
        text-align: left;
    }

    #todo-input-wrapper {
        margin: 0 auto 20px;
        display: flex;
        align-items: stretch;
    }

    #todo-input-wrapper input {
        width: 79%;
        margin-right: 1%;
        padding: 10px;
    }

    #todo-input-wrapper button {
        width: 20%;
        cursor: pointer;
    }

    #todo-wrapper {
        position: relative;
        min-height: 300px;
    }

    #todo-wrapper table {
        border: 1px solid #ccc;
        border-collapse: collapse;
        width: 100%;
        margin: 0 auto 40px;
    }

    #todo-wrapper table th,
    #todo-wrapper table td {
        padding: 15px 10px;
        text-align: left;
        border-bottom: 1px solid #DDD;
    }

    #todo-wrapper tabale tr:hover {
        background-color: #D6EEEE;
    }

    .todo-status,
    .btn-edit-todo,
    .btn-remove-todo {
        cursor: pointer;
    }

    #todo-loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #todo-loading img {
        width: 50px;
        height: 50px;
    }
</style>
