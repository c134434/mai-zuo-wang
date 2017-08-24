import React,{Component} from "react"
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import "../../css/main.css" 
import menu from "../../service/silderBarInfo.js"
export default class Slide extends Component{ 
	constructor(routeProps){
		let {match, history, location} = routeProps; 
		super()
		this.state={
			history 
		}
	}
	render(){ 
		let sliderBarStyle = { 
			transform: this.props.show?"none" : "translateX(-100%)"
		}
		let coverStyle = {
			background: this.props.show?"rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
			display: this.props.show?"block" : "none"
		}
		let data=this.props.pathname==="/shop"?menu.shopSilderBarData : menu.homeSilderBarData
		return( 
				<div>
				<div class="cover" style={coverStyle} onClick={this.hide.bind(this)}></div>
					<nav class="Slide" style={sliderBarStyle}>
						{
							data.map((item,index)=>{ 
								return <a key={index} onClick={this.goPage.bind(this, item)}>{item.title}<span class="iconfont icon-arrow-right"></span></a>
							})
						}
					</nav>
				</div> 
		)
	}
	goPage(item){
		this.props.hideHandle(item.header)
		this.state.history.push({
				pathname:item.path , 
				state: {
					chooseIndex: ""  
				}
			});
	}
	hide(){
		this.props.hideHandle();
	}  
}
