import React, {useState, useEffect} from "react"; // import of useEffect and useState

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tasks, setTasks] = useState([]);
  
	const [newTask, setNewTask] = useState("");

	const [user, setUser] = useState("rebecabergottini");
	const removeTask = (index) => {
	  
	console.log(index);
	 let newTasks = [...tasks]
	 newTasks.splice(index, 1)
	 setTasks(newTasks)
	 console.log(newTasks)
  }
	function addTask(e){
	  
	  if(e.code=="Enter" && newTask!=""){
		  
		  setTasks([...tasks, newTask])
		  setNewTask("")
	  }
	}

	function createUser() {
	fetch ('https://assets.breatheco.de/apis/fake/todos/user/' + user, {
		method: "POST",
		body: JSON.stringify([]),
		headers: {
		  "Content-Type": "application/json"
		}
	  })
  
	.then((response)=>response.json())
	.then((data)=>console.log(data))
	  
	}
	function getToDoList() {
	  fetch('https://assets.breatheco.de/apis/fake/todos/user/' + user, {
  		method: 'GET',
  		headers: {
		  'Content-type': 'application/json'
  	},
	
	})
	.then((response)=>response.json())
	.then((data)=>console.log(data))
	  
	}
  
	function updateToDoList () {
	  fetch('https://assets.breatheco.de/apis/fake/todos/user/' + user, {
		method: 'PUT',
		headers: {
		  'Content-type': 'application/json'
		},
		  body: {label: Datos, done: false}
		})
	.then ((response) => response.json ())
	.then ((data) => console.log (data))
	}
	 
	
	useEffect(() => {
		createUser()
		getToDoList();
  
	}, [])
	
	return (
		<div className="text-left w-50 mx-auto mt-5">
			<h1 className="text-center fw-light text-purple-500 fs-1 mb-2">todos</h1>
			<ul className="list-group list-group">
				<li className="list-group-item px-5">
				<input className="w-100 border border-0 fs-5" type="text" name="todos" id="todos" placeholder="What needs to be done?" onKeyDown={e=>addTask(e)}
            	onChange={(e) => setNewTask(e.target.value)}
            	value={newTask}/>
				</li>
			{tasks.map((task, index) => (
          		<li key={index} className="list-group-item fs-5 text-left px-5 d-flex justify-content-between">
            	{task}
            	<button onClick={()=>removeTask(index)}className="btn-close fs-6 mt-1"></button>
          		</li>
        		))}
				<li className="list-group-item text-left fs-6 fw-light text-black-50">{tasks.length} item left</li>
			</ul>
		</div>
	);
};
	
export default Home;
