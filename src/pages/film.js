import React, {Component} from 'react'
import HomeService from '../service/homeService.js'  
import "../css/main.css"
import "../css/filmcinema.css" 
export default class Film extends Component{ 
	constructor(routeProps){
		super()
		let {match, history, location} = routeProps; 
		this.state={
			id:location.state.id,
			filmData:{}
		}
	}
	render(){ 
		return (
			<div class="page film">
				<div class="banner">
					<img class="banner-img" src={this.state.filmData.origin} />
				</div>
				<div class="main">
					<div class="film-word1">影片简介</div>
					<div class="film-word2">
						<span>导       演：</span>
						<span>{this.state.filmData.director}</span>
					</div>
					<div class="film-word2">
						<span>主       演：</span>
						<span>{this.state.filmData.name1} | {this.state.filmData.name2} | {this.state.filmData.name3} | {this.state.filmData.name4} | {this.state.filmData.name5}</span>
					</div>
					<div class="film-word2">
						<span>地区语言：</span>
						<span>{this.state.filmData.nation}({this.state.filmData.language})</span>
					</div>
					<div class="film-word2">
						<span>类       型：</span>
						<span>{this.state.filmData.category}</span> 
					</div>
					<div class="film-word2">
						<span>上映日期：</span> 
						<span>{this.state.filmData.month}月{this.state.filmData.day}日上映</span>
					</div>
					<div class="film-word3">{this.state.filmData.synopsis}</div> 
				</div>
				<div class="foot">
					<button class="cpn-primary-button ">立即购票</button>
				</div>
			</div>
		)
	} 
	componentWillMount(){
		HomeService.getfilmDate(this.state.id)
		.then((res)=>{
				console.log(res)
				this.setState({filmData:res}) 
			}  
		)
	}
		
} 