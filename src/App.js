import './Styles/App.css';
import Modal from './components/Modal';
import ContainerList from './components/ContainerList';
import Item from './components/Item'
import React from 'react';
import Kanban from './components/Kanban';


function App() {
  const [todo, setTodo] = React.useState()
  const [doing, setDoing] = React.useState()
  const [done, setDone] = React.useState()


  const showList = (obj)=>{

    const constructorLoop = (arr) =>{
      let arrTemp =[]
    
      arr.forEach((e, i)=>{
          arrTemp.push(<Item id={i} key={i} color={e[2]}> { e[0] } </Item>)
      })
      return arrTemp
    }

    setTodo(constructorLoop(obj.todo))
    setDoing(constructorLoop(obj.doing))
    setDone(constructorLoop(obj.done))
  }

  React.useEffect(()=>{
    Kanban.refreshGUI(showList)
    Kanban.resgate()
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <h1>KANBAN</h1>
      </header>
      <main>
        <ContainerList id ={"ToDo"}>
          {todo}
        </ContainerList>
        <ContainerList id ={"Doing"}>
          {doing}
        </ContainerList>
        <ContainerList id ={"Done"}>
          {done}
        </ContainerList>
      </main>
      <footer>
      <div style={{display:"flex", justifyContent:"end", marginRight:"5px"}}>

        <button onClick={Kanban.eraser}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.75 13.75V25.5C23.75 25.9142 23.4142 26.25 23 26.25H7C6.58579 26.25 6.25 25.9142 6.25 25.5V13.75" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.5 21.25V13.75" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5 21.25V13.75" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M26.25 8.75H20M3.75 8.75H10M10 8.75V4.5C10 4.08579 10.3358 3.75 10.75 3.75H19.25C19.6642 3.75 20 4.08579 20 4.5V8.75M10 8.75H20" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>

        </div>
        <div><a href='https://brunosantuz.com/' target='_blank' rel="noreferrer">by Bruno Santuz 2022</a></div>
      </footer>
      <Modal></Modal>
    </div>
  );
}

export default App;
