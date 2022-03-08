<template>
    <div id="main-content">
        <form action="">
            <div id="todo-input-wrapper">
                <input type="text" placeholder="Add new todo" v-model="inputTask">
                <button type="submit" @click.prevent="handleTask()">{{ inputButtonLabel }}</button>
            </div>

            <table id="todo-wrapper" v-if="tasks.length">
                <tr>
                    <th>Task name</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                <tr v-for="(task, index) in tasks" :key="index">
                    <td>{{ task.todo_name }}</td>
                    <td class="todo-status" @click="changeStatus( task.todo_status, index )">{{ task.todo_status }}</td>
                    <td>
                        <button class="btn-edit-todo" @click.prevent="editTask( index, task.id )">Edit</button>
                        <button class="btn-remove-todo" @click.prevent="removeTask( task.id )">Remove</button>
                    </td>
                </tr>
            </table>

            <div v-else>
                <p>No todo found!</p>
            </div>
        </form>
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
        }
    },
    methods: {
        createTask() {
            // this.tasks.push({
            //     todo_name: this.inputTask,
            //     todo_status: 'to-do',
            // });

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
            });

            this.inputTask = '';
        },
        updateTask( index, id ) {
            // this.tasks[index].todo_name = this.inputTask;

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
            });
        },
        removeTask( id ) {
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
            });
        },
        editTask( index, id ) {
            let taskName = this.tasks[index].todo_name;
            this.inputTask = taskName;
            this.inputButtonLabel = 'Update Task';
            this.selectedTaskIndex = index;
            this.selectedTaskId = id;
            this.isEdit = true;
        },
        changeStatus( status, index ) {
            let currentStatusIndex = this.statuses.indexOf( status );

            if ( currentStatusIndex >= ( this.statuses.length - 1 ) ) {
                this.tasks[index].todo_status = this.statuses[0];
            } else {
                this.tasks[index].todo_status = this.statuses[++currentStatusIndex];
            }
        },
        handleTask() {
            if ( this.isEdit ) {
                this.updateTask( this.selectedTaskIndex, this.selectedTaskId );
            } else {
                this.createTask();
            }
        }
    },
    mounted() {
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
        .then(response => (this.tasks = response.data));
    }
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

    table#todo-wrapper {
        border: 1px solid #ccc;
        border-collapse: collapse;
        width: 100%;
        margin: 0 auto 40px;
    }

    table#todo-wrapper th, td {
        padding: 15px 10px;
        text-align: left;
        border-bottom: 1px solid #DDD;
    }

    table#todo-wrapper tr:hover {
        background-color: #D6EEEE;
    }

    .todo-status,
    .btn-edit-todo,
    .btn-remove-todo {
        cursor: pointer;
    }
</style>
