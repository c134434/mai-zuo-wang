import React,{Component} from "react"
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import "../../css/main.css" 

import store from '../../store'
let unsubscribe;
export default class AppHeader extends Component{ 
	constructor(){
		super()
		this.state={
			city:store.getState().city
		}
	}
	render(){ 
		return(
			<div class="Header">
			    <span onClick={this.modify.bind(this)} class="iconfont icon-menu"></span> 
			    <span onClick={this.modify.bind(this)}  class="title">{this.props.title}</span> 
			    <Link to="/city-list"  onClick={this.modifyOne.bind(this)}  class="city iconfont icon-arrow-down">{this.state.city}</Link>
			  	<Link to="/me" onClick={this.modifyTwo.bind(this)} class="iconfont icon-person"></Link>
			</div>     
		)
	}
	modify(){ 
		this.props.modifymenu()    
	}
	modifyOne(){ 
		this.props.modifymenuOne()
	}
	modifyTwo(){
		this.props.modifyTwo()  
	}
	componentWillMount(){
		unsubscribe = store.subscribe(()=>{
			//console.log('监听触发了');
			this.setState({city: store.getState().city});
		})
	}
	
	componentWillUnmount(){
		unsubscribe(); 
	}
}
