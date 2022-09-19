import "../Styles/ContainerList.css"
import Kanban from "./Kanban"

let _opacity = 0

export default function ContainerList(props){

    const hiddenButton = (el, op)=>{
        if(window.innerWidth > 769){
            let e = document.querySelector("#"+el).querySelector(".js-btn-NewItem")
            e.style.opacity = op
        }
    }

    if( window.innerWidth < 769){
        _opacity = 1
    } else{
        _opacity = 0
    }

    return(
        <section id={props.id}>
            <h2>{props.id}</h2>
            <div 
                onMouseOver={()=>{
                    hiddenButton(props.id, 1)
                    //define em qual lista do kanban ira interagir
                    //Sem isso não há interação com as listas
                    Kanban.setType(props.id)
                }} 
                onMouseOut={()=>{hiddenButton(props.id, 0)}} 
                className={"list"}>
                    {props.children}
                    <button 
                        className="js-btn-NewItem"
                        style={{ opacity: _opacity }} 
                        onClick={()=>{
                            hiddenButton(props.id)
                            document.querySelector("#js-modal").style.display = "flex";
                        }} >
                            new item
                    </button>
            </div>
        </section>
    )
}