<template>
    <div id="main-content">
        <form action="">
            <div id="todo-input-wrapper">
                <input type="text" placeholder="Add new todo" v-model="inputTask">
                <button type="submit" @click.prevent="handleTask">{{ inputButtonLabel }}</button>
            </div>

            <table id="todo-wrapper" v-if="tasks.length">
                <tr>
                    <th>Task name</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                <tr v-for="(task, index) in tasks" :key="index">
                    <td>{{ task.name }}</td>
                    <td class="todo-status" @click="changeStatus( task.status, index )">{{ task.status }}</td>
                    <td>
                        <button class="btn-edit-todo" @click.prevent="editTask( index )">Edit</button>
                        <button class="btn-remove-todo" @click.prevent="removeTask( index )">Remove</button>
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
export default {
    name: 'app-content',
    data() {
        return {
            inputTask: '',
            inputButtonLabel : 'Add Task',
            isEdit: false,
            selectedTaskIndex: 0,
            statuses: [ 'to-do', 'in-progress', 'finished'],
            tasks: [
                // {
                //     name: 'Learn Vue',
                //     status: 'finished',
                // },
                // {
                //     name: 'Build a todo app',
                //     status: 'in-progress',
                // },
                // {
                //     name: 'Deploy to Github Pages',
                //     status: 'to-do',
                // }
            ],
        }
    },
    methods: {
        createTask() {
            this.tasks.push({
                name: this.inputTask,
                status: 'to-do',
            });

            this.inputTask = '';
        },
        updateTask( index ) {
            this.tasks[index].name = this.inputTask;
        },
        removeTask( index ) {
            this.tasks.splice( index, 1 );
        },
        editTask( index ) {
            let taskName = this.tasks[index].name;
            this.inputTask = taskName;
            this.inputButtonLabel = 'Update Task';
            this.isEdit = true;
            this.selectedTaskIndex = index;
        },
        changeStatus( status, index ) {
            let currentStatusIndex = this.statuses.indexOf( status );

            if ( currentStatusIndex >= ( this.statuses.length - 1 ) ) {
                this.tasks[index].status = this.statuses[0];
            } else {
                this.tasks[index].status = this.statuses[++currentStatusIndex];
            }
        },
        handleTask() {
            if ( this.isEdit ) {
                this.updateTask( this.selectedTaskIndex );
            } else {
                this.createTask();
            }
        }
    },
}
</script>

<style>
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
    }

    #todo-input-wrapper button {
        width: 20%;
    }

    table#todo-wrapper {
        border: 1px solid #ccc;
        border-collapse: collapse;
        width: 100%;
    }

    table#todo-wrapper th, td {
        padding: 8px;
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
