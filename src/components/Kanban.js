let listsKanban = {
    todo:[],
    doing:[],
    done:[],
}
let typeKanban
let indexKanban
let _refreshGUI

// eslint-disable-next-line import/no-anonymous-default-export
export default{ 
    setType(_type){typeKanban = _type},

    getType(){return typeKanban},

    indexChange(_index){indexKanban = _index},

    set(title, description, color ){

        const change =  [title, description, color]

        this.case(
            ()=>{ indexKanban === undefined ? listsKanban.todo.push(change) : listsKanban.todo[indexKanban]=change },
            ()=>{ indexKanban === undefined ? listsKanban.doing.push(change) : listsKanban.doing[indexKanban]=change },
            ()=>{ indexKanban === undefined ? listsKanban.done.push(change) : listsKanban.done[indexKanban]=change }
        )
        
        indexKanban = undefined
        _refreshGUI(listsKanban)
    },

    get(){

       return this.case(
            ()=>{return listsKanban.todo},
            ()=>{return listsKanban.doing},
            ()=>{return listsKanban.done}
        )

    },

    deleteItem(_index = indexKanban){
        this.case(
            ()=>{
                listsKanban.todo[_index] = null
                let arrtemp = listsKanban.todo.filter((i)=> i)
                listsKanban.todo = arrtemp
            },
            ()=>{
                listsKanban.doing[_index] = null
                let arrtemp = listsKanban.doing.filter((i)=> i)
                listsKanban.doing = arrtemp
            },
            ()=>{
                listsKanban.done[_index] = null
                let arrtemp = listsKanban.done.filter((i)=> i)
                listsKanban.done = arrtemp
            }
        )
        _refreshGUI(listsKanban)
    },

    next(_index){
        this.case(
            ()=>{
                let arrtemp = listsKanban.todo[_index]
                listsKanban.doing.push(arrtemp)
                this.deleteItem(_index)

            },
            ()=>{
                let arrtemp = listsKanban.doing[_index]
                listsKanban.done.push(arrtemp)
                this.deleteItem(_index)
            },
            ()=>{}
        )
    },

    back(_index){
        this.case(
            ()=>{},
            ()=>{
                let arrtemp = listsKanban.doing[_index]
                listsKanban.todo.push(arrtemp)
                this.deleteItem(_index)

            },
            ()=>{
                let arrtemp = listsKanban.done[_index]
                listsKanban.doing.push(arrtemp)
                this.deleteItem(_index)
            }
        )
    },

    up(_index){
        this.case(
            ()=>{
                if(_index - 1 > -1){
                    let temp = listsKanban.todo[_index -1]
                    listsKanban.todo[_index -1] = listsKanban.todo[_index]
                    listsKanban.todo[_index] = temp
                }
            },
            ()=>{
                if(_index - 1 > -1){
                    let temp = listsKanban.doing[_index -1]
                    listsKanban.doing[_index -1] = listsKanban.doing[_index]
                    listsKanban.doing[_index] = temp
                }
            },
            ()=>{
                if(_index - 1 > -1){
                    let temp = listsKanban.done[_index -1]
                    listsKanban.done[_index -1] = listsKanban.done[_index]
                    listsKanban.done[_index] = temp
                }
            }
        )
        _refreshGUI(listsKanban)
    },

    down(_index){
        this.case(
            ()=>{
                if(_index + 1 < listsKanban.todo.length){
                    let temp = listsKanban.todo[_index +1]
                    listsKanban.todo[_index +1] = listsKanban.todo[_index]
                    listsKanban.todo[_index] = temp
                }
            },
            ()=>{
                if(_index + 1 < listsKanban.doing.length){
                    let temp = listsKanban.doing[_index +1]
                    listsKanban.doing[_index +1] = listsKanban.doing[_index]
                    listsKanban.doing[_index] = temp
                }
            },
            ()=>{
                if(_index + 1 < listsKanban.done.length){
                    let temp = listsKanban.done[_index +1]
                    listsKanban.done[_index +1] = listsKanban.done[_index]
                    listsKanban.done[_index] = temp
                }
            }
        )
        _refreshGUI(listsKanban)
    },

    eraser(){
        listsKanban = { 
            todo:[],
            doing:[],
            done:[]
        }
        localStorage.clear()
        _refreshGUI(listsKanban)
    },

    salve(){
        localStorage.setItem("mylistsKanban", JSON.stringify(listsKanban))
    },

    resgate(){
        if (localStorage.length > 0) {
            listsKanban = JSON.parse(localStorage.getItem("mylistsKanban"))
        }
        _refreshGUI(listsKanban)
    },

    case(todo, doing, done){

        switch (typeKanban) {
            case "ToDo":
                return todo()
                
            case "Doing":
                return doing()

            case "Done":
                return done()
        
            default:
                console.error("erro: type não existente.")
        }
    },

    refreshGUI(callback){
        _refreshGUI = (e) => {
            callback(e)
            this.salve()
        }
    }
}