import React from 'react'
import './App.css'
import Todo from './components/Todo'
import Tasklist from './components/Tasklist'
import AppHeader from './components/AppHeader'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories : [],
      isloaded : false,
      current_category: {},
      todos: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.createNewValue = this.createNewValue.bind(this);
    this.updateTaskStatus = this.updateTaskStatus.bind(this);
  }

  componentDidMount() {
    const cat_link = 'http://127.0.0.1:5000/todolist'
    fetch(cat_link).then(res => res.json()).then(text => {
        this.setState({
          
          categories: text.tasklist,
          isloaded: true
        })
      })
  }

  updateTask(list) {
    this.setState({current_category : list.item })
    const  getTask = 'http://localhost:5000/tasks?task_list='+list.item.id;
    // console.log(list.item)
    axios.get(getTask).then(res =>
        {     
          this.setState({todos : res.data.task})
        }
      ).catch(err=>alert(err));
  }

  updateText  = (e) =>{
    this.setState({[e.target.name]:e.target.value});
  }

  createNewValue(type, list){
    const PostTaskListUrl = 'http://localhost:5000/todolist';
    const PostTaskUrl = 'http://localhost:5000/tasks' 
    const getTaskList = 'http://localhost:5000/todolist';
    

      if(type === 'category'){
        axios.post(PostTaskListUrl,{category: this.state.categoryName}).then(res =>
          {
            
            axios.get(getTaskList).then(res=>{
              this.setState({ categories: res.data.tasklist});
             }).catch(err=>alert(err));
        }   
        ).catch(err=>alert(err));
      }else {
        const  getTask = 'http://localhost:5000/tasks?task_list='+list.id;
        axios.post(PostTaskUrl,{todo:this.state.newTask , list_id : list.id, completed: false}
          ).then(res => {
            axios.get(getTask).then(res=>{
              this.setState({ todos: res.data.task});
             }).catch(err=>alert(err));
            
          }).catch(err => alert(err));
        
      }
  
}

updateTaskStatus(id,list){
  const putTaskUrl = 'http://127.0.0.1:5000/tasks/' +id ;
  const taskURL = 'http://127.0.0.1:5000/tasks?task_list=' +list.id ; 
  axios.put(putTaskUrl).then(res=>{
    axios.get(taskURL).then(res=>{
      this.setState({todos : res.data.task})
    }).catch(err=>alert(err))
  }).catch(err=>alert(err))
};

deleteTask(id,list){
  const deleteTaskUrl = 'http://127.0.0.1:5000/tasks/' + id ;
  const taskURL = 'http://127.0.0.1:5000/tasks?task_list=' +   list.id ; 
  axios.delete(deleteTaskUrl).then(res=>
    {
      alert('task has been deleted sucessfully');
      axios.get(taskURL).then(res=>{
        this.setState({todos : res.data.task})
      }).catch(err=>alert(err))
    }
  ).catch(err=>alert(err))
  
}


  handleChange(id) {
    this.setState(prevState => {
      const updatedTodos = prevState.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
      return {
        todos: updatedTodos
      }
    })
  }
  render() {
    var isloaded = this.state.isloaded;

    if(!{isloaded}) {
      return (<div>Loading...</div>)
    } else {
      return (
        <>
          <AppHeader />
          <Tasklist items={this.state.categories}
                    updateTask = {this.updateTask}
                    updateText = {this.updateText}
                    current_category={this.state.current_category}
                    createNewValue = {this.createNewValue} />
          <Todo todos={this.state.todos}
                current_category={this.state.current_category}
                updateText = {this.updateText}
                updateTaskStatus = {this.updateTaskStatus}
                createNewValue = {this.createNewValue}
                deleteTask = {this.deleteTask}
                handleChange = {this.handleChange} />          
        </>
      );
    }
  }
}
export default App
