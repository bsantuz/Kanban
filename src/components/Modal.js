import "../Styles/modal.css"
import Kanban from "./Kanban"

export let color = "#74F425"

export function selectColor (e, _color){
    document.querySelectorAll(".color").forEach((el)=>{
        el.style.border = "none"
    })
    if(e !== undefined){
        e.style.border = "2px solid rgba(0, 0, 0, 0.637)"
    }
    if(_color){color=_color}
}

function hiddenModal (){
    document.querySelector("#js-modal").style.display = "none";
    document.querySelector("#title-modal").value = ""
    document.querySelector("#descript").value = ""
    selectColor()
    color = "#74F425"
}

export default function modal(props){

    return(
        <div id="js-modal" style={{display:"none"}}>

            <div id="js-modal-background" onClick={hiddenModal}></div>

            <div id="window">

                <div id="js-modal-cancel" style={{display:"flex", justifyContent:"center", alignItems:"center"}} onClick={hiddenModal}>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.25827 17.7426L12.5009 12.5M17.7435 7.25735L12.5009 12.5M12.5009 12.5L7.25827 7.25735M12.5009 12.5L17.7435 17.7426" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                <label id="label_title" htmlFor="title-modal">Titulo:</label>
                <input id="title-modal" type="text" placeholder = "Digite um Titulo."/>

                <label htmlFor="descript">Descrição:</label>
                <textarea id="descript" cols="30" rows="5"></textarea>

                <label>cor:</label>
                <div style={{display:"flex"}}>
                    <div id={"#74F425"} className="color" style={{ backgroundColor:"#74F425" }} onClick ={(e)=>{
                        selectColor(e.target)
                        color = "#74F425"
                    }}></div>
                    <div id={"#F4BA25"} className="color" style={{ backgroundColor:"#F4BA25" }} onClick ={(e)=>{
                        selectColor(e.target)
                        color = "#F4BA25"
                    }}></div>
                    <div id={"#F45725"} className="color" style={{ backgroundColor:"#F45725" }} onClick ={(e)=>{
                        selectColor(e.target)
                        color = "#F45725"
                    }}></div>
                </div>

                <div style={{display:"flex", justifyContent:"end"}}>

                    <button //salve
                        onClick={()=>{
                            let title = document.querySelector("#title-modal").value
                            let descript = document.querySelector("#descript").value
                            if(title !== ""){
                                Kanban.set(title, descript, color)
                                hiddenModal()

                                document.querySelector("#label_title").style.color = "#000"
                            }else{
                                document.querySelector("#label_title").style.color = "#F45725"
                            }
                        }}>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.75 23.75V6.25C3.75 4.86929 4.86929 3.75 6.25 3.75H20.2145C20.8775 3.75 21.5134 4.01339 21.9823 4.48224L25.5177 8.01776C25.9866 8.48661 26.25 9.12249 26.25 9.78554V23.75C26.25 25.1307 25.1307 26.25 23.75 26.25H6.25C4.86929 26.25 3.75 25.1307 3.75 23.75Z" stroke="black" strokeWidth="1.5"/>
                            <path d="M10.75 11.25H19.25C19.6642 11.25 20 10.9142 20 10.5V4.5C20 4.08579 19.6642 3.75 19.25 3.75H10.75C10.3358 3.75 10 4.08579 10 4.5V10.5C10 10.9142 10.3358 11.25 10.75 11.25Z" stroke="black" strokeWidth="1.5"/>
                            <path d="M7.5 17V26.25H22.5V17C22.5 16.5858 22.1642 16.25 21.75 16.25H8.25C7.83579 16.25 7.5 16.5858 7.5 17Z" stroke="black" strokeWidth="1.5"/>
                        </svg>
                    </button>

                    <button //delete
                        onClick={()=>{
                            Kanban.deleteItem(props.id)
                            hiddenModal()
                        }}
                    >
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.75 13.75V25.5C23.75 25.9142 23.4142 26.25 23 26.25H7C6.58579 26.25 6.25 25.9142 6.25 25.5V13.75" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12.5 21.25V13.75" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17.5 21.25V13.75" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M26.25 8.75H20M3.75 8.75H10M10 8.75V4.5C10 4.08579 10.3358 3.75 10.75 3.75H19.25C19.6642 3.75 20 4.08579 20 4.5V8.75M10 8.75H20" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                </div>
            </div>
        </div>
    )
    
}