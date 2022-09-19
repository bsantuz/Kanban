import { Fragment } from "react"
import { useEffect, useState } from "react"
import "../Styles/Items.css"
import Kanban from "./Kanban"
import { selectColor } from "./Modal"


export default function Item(props){

    let _arrows = [
        <path d="M15.3333 6L9.33334 12L15.3333 18" stroke="black" strokeOpacity="1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>,
        <path d="M9.66669 6L15.6667 12L9.66669 18" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    ]

    let _arrowsMqr = [
        <Fragment>
            <path d="M15.5 16.5L12 13L8.5 16.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.5 10.5L12 7L8.5 10.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </Fragment>,
       <Fragment>
            <path d="M15.5 7L12 10.5L8.5 7" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.5 13L12 16.5L8.5 13" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
       </Fragment>
    ]

    const [arrows, setArrowMqr] = useState(_arrows)

    const changeArrowMqr = () =>{
     if(window.innerWidth < 769){
            setArrowMqr(_arrowsMqr)
            
        }else{
            setArrowMqr(_arrows)
        }
    }

    useEffect(()=>{
        window.onresize = changeArrowMqr;
        changeArrowMqr()
    },[])


    return(
       <div 
        className="items" 
        style={{backgroundColor:props.color}}
       >
         <div 
            id={"_menu_"+props.id} 
            className="menuitems" 
            >
            
            <div>
                <svg // svg menor que <
                    onClick={()=>{
                        Kanban.back(props.id)
                    }}
                    className="back"
                    width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {arrows[0]}
                </svg>

                <div>

                    <svg //up
                        onClick={()=>{
                            Kanban.up(props.id)
                        }}
                        width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.33334 15L12.3333 9L18.3333 15" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    <svg // down
                         onClick={()=>{
                            Kanban.down(props.id)
                        }}
                         width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                </div>
            </div>
            <div>

                <svg //svg de lixeira
                    className="trash"
                    onClick={()=>{
                        Kanban.deleteItem(props.id)
                    }}
                    width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.6667 11V20.4C19.6667 20.7314 19.3981 21 19.0667 21H6.26669C5.93532 21 5.66669 20.7314 5.66669 20.4V11" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.6667 17V11" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14.6667 17V11" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21.6667 7H16.6667M3.66669 7H8.66669M8.66669 7V3.6C8.66669 3.26863 8.93532 3 9.26669 3H16.0667C16.3981 3 16.6667 3.26863 16.6667 3.6V7M8.66669 7H16.6667" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                
                <svg //svg de maior que >
                className="next"
                onClick={()=>{
                    Kanban.next(props.id)
                }}
                 width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {arrows[1]}
                </svg>

            </div>
        </div>
        <div id="title" onClick={(e)=>{
            const list = Kanban.get()
            Kanban.indexChange(props.id)

            document.querySelector("#js-modal").style.display = "flex";
            document.querySelector("#title-modal").value = list[props.id][0]
            document.querySelector("#descript").value = list[props.id][1]
            let color = document.getElementById(list[props.id][2])
            selectColor(color, list[props.id][2])
        }}>
           <p id={props.id}>{props.children}</p> 
        </div>
       </div>
       
        
    )
}