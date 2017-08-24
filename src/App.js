import React,{Component} from "react"
import {BrowserRouter as Router, Link, Route,HashRouter} from 'react-router-dom'
import "./css/main.css" 

import AppHeader from "./views/commone/AppHeader.js"
import Slide from "./views/commone/Slide.js"

import Home from './pages/Home.js'
import Movies from './pages/Movies.js'
import Cinema from './pages/Cinema.js'
import Shop from './pages/Shop.js'
import Me from './pages/Me.js'
import Card from './pages/Card.js'
import City from './pages/City.js'
import Film from './pages/film.js'
import ShopList from './pages/shoplist.js'
import ShopDetail from './pages/shopdetail.js'
export default class App extends Component{
	constructor(){
		super()
		this.state={
			headerTitle:"卖座电影",
			showBar:true
		}
	}
	render(){
		return(
			<Router>
				<div class="root">
					<AppHeader modifyTwo={this.modifyMe.bind(this)} modifymenu={this.modifyShow.bind(this)} modifymenuOne={this.modifyShowOne.bind(this)} title={this.state.headerTitle} />  
					<Route path="/" render={({history, location})=>{
						return <Slide history={history} 
									      show={this.state.showBar}
									      pathname={location.pathname}
									      hideHandle={this.menuHandle.bind(this)} /> 
					}}/>
					<Route path="/" exact component={Home}/> 
					<Route path="/movies" component={Movies}/>
					<Route path="/cinema" component={Cinema}/>
					<Route path="/shop" component={Shop}/>
					<Route path="/me" component={Me}/>
					<Route path="/card" component={Card}/>
					<Route path="/city-list" component={City}/>
					<Route path="/film/:id" component={Film}/>
					<Route path="/shop/:l/:id" component={ShopList}/>
					<Route path="/shop/:id" component={ShopDetail}/>
				</div>   
			</Router>
		) 
	}
	modifyShow(){
		this.setState({showBar:!this.state.showBar})    
	}
	modifyMe(){
		this.setState({showBar:false})
		this.setState({headerTitle:"登录"}) 
	}
	modifyShowOne(){  
		this.setState({showBar:false})
		this.setState({headerTitle:"选择城市"})  
	}
	menuHandle(headerTitle){
		this.setState({showBar:!this.state.showBar})
		if(headerTitle){
			this.setState({headerTitle:headerTitle})
		} 
	}
}

