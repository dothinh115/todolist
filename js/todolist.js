export class Todo {
    arrTodo = [];
    //Thêm việc
    addTodo (todo) {
        //hàm lấy random id 
        let randomId = maxNumber => {
            let getRandomId = number => {
                let randomId = Math.floor(Math.random() * number);
                return randomId;
            }
            //lấy số random
            let id = getRandomId(maxNumber);
            //tìm xem trong mảng có trùng hay ko, nếu trùng thì tiếp tục gọi hàm lấy số random
            while (this.arrTodo.find(item => item.id == id) !== undefined) {
                id = getRandomId(maxNumber);
            }
            return id;
        }
        let getTime = new Date();
        let time = getTime.getTime();
        this.arrTodo.push({
            id: randomId(999999),
            value: todo,
            done: false,
            time
        });
    }
    //Lấy dữ liệu từ local storage
    getLocalStorage () {
        if(localStorage.getItem("todoList")) {
            this.arrTodo = JSON.parse(localStorage.getItem("todoList"));
        }
    }
    //Lưu dữ liệu vào local storage
    addLocalStorage () {
        let arrLocal = JSON.stringify(this.arrTodo);
        localStorage.setItem("todoList", arrLocal);
    }
    //Xóa task
    delTask (id) {
        this.arrTodo = this.arrTodo.filter(item => item.id != id);
    } 
    //check task
    doneToggle (id) {
        let find = this.arrTodo.find(item => item.id == id);
        find.done = !find.done;
    }

    //Đổi thứ tự
    goUp (id) {
        let result = this.arrTodo.findIndex(item => item.id == id);
        let after = this.arrTodo[result];
        let before = this.arrTodo[result -1];
        this.arrTodo[result] = before;
        this.arrTodo[result - 1] = after;
    }

    //render task
    renderTask (doneYet) {
        return this.arrTodo.filter(item => item.done === doneYet).reduce((html, item, index) => {
            html += `
                <li>${item.value} <span><i class="fa-solid fa-trash" onclick="delTask('${item.id}')"></i> <i class="fa-solid fa-${doneYet ? 'xmark-circle' : 'check-circle'}" onclick="doneTask('${item.id}')"></i> ${index != 0 ? `<i class="fa-solid fa-arrow-up" onclick="goUp('${item.id}')"></i>` : ''}</span></li>
            `;
            return html;
        }, "");
    }
    //check all task
    checkAllTasks (bool) {
        this.arrTodo.map(item => item.done = bool);
    }

    //sort by name
    sortByName (reverse) {
        this.arrTodo = this.arrTodo.sort((b, a) => {
            if (b.value < a.value) {
                return reverse ? 1 : -1;
            }
            else {
                return reverse ? -1 : 1;
            }
        });
    }

    //sort by time
    sortByTime () {
        this.arrTodo = this.arrTodo.sort((b, a) => {
            return b.time - a.time;
        })
    }
}