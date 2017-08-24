import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import "../css/main.css"
import "../css/home.css"
let  bannerSwiper=null; 
let myScroll=null; 
import HomeService from '../service/homeService.js'
export default class Home extends Component{
	constructor(routeProps){  
		super()
		let {match, history, location} = routeProps;
		this.state={
			bannerList:[], 
			moviesList:[],
			moviceComing:[],
			history 
		}
	}
	render(){
		return (
			<div class="page">
			<div class="wrap">  
					<div ref="banner" class="swiper-container home-banner">
					    <div class="swiper-wrapper">
					    {
							this.state.bannerList.map((item, index)=>{
								return (
									<div key={index} class="swiper-slide">
										<img src={item.imageUrl}/>
									</div>
								)
							})
						} 
					    </div> 
					</div>
					<div class="main-one"> 
						<ul class="movies-list">
							{
								this.state.moviesList.map((item,index)=>{ 
									return(  
										<li onClick={this.btnAction.bind(this,item.id)} class="item" key={index}>
											<img class="img1" src={item.origin}/>
											<div class="row"> 
												<span class="name">{item.name}</span>
												<span class="grade">{item.grade}</span>
												<p class="title2">{item.cinemaCount}家影院上映{item.watchCount}人购票</p>
											</div>  
										</li>  
									) 
								})
							}
						</ul>
						<div class="btn-more"> 
							<div onClick={this.btnMove.bind(this)} class="btn">
								更多热映电影
							</div>
						</div>
					</div> 
					<div class="main-two">
						<div class="line">
							<div class="line-left"></div>
							<div class="line-right"></div>
							<div  class="upcoming">
								即将上映
							</div>
						</div>
						<ul class="cinema-list">
							{
								this.state.moviceComing.map((item,index)=>{
									return(
										<li onClick={this.btnAction.bind(this,item.id)} class="item1" key={index}>
											<img class="img2" src={item.origin}/>
											<div class="roy">
												<p class="name1">{item.name}</p>
												<p class="clock">{item.month}月{item.day}日上映</p>
											</div>     
										</li>
									) 
								})
							}
						</ul>
						<div class="more-coming">
							<div onClick={this.btnCome.bind(this)} class="btn-coming"> 
								更多即将上映电影
							</div>
						</div>
					</div> 
				</div>
			</div>
		) 
	}
	componentWillMount(){
		HomeService.getbannerDate()
		.then((res)=>{  
			this.setState({bannerList:res})
			console.log(res)
			 bannerSwiper.update();
			 bannerSwiper.slideTo(1, 0); 
			}   
		)
		HomeService.getMoviesDate()
		.then((res)=>{
			//console.log(res)
			this.setState({moviesList:res}) 
		}  
		)
		
		HomeService.getmoviceComingDate()
		.then((res)=>{
			//console.log(res)
				this.setState({moviceComing:res}) 
			}  
		)
	}
	btnAction(val){
		this.state.history.push({
				pathname: '/film/'+val, 
				state: {
					id: val
				}
			});
	} 
	
	btnMove(){
		this.state.history.push({
				pathname: '/movies', 
				state: {
					chooseIndex: " " 
				}
			});
	}
	btnCome(){
		this.state.history.push({
				pathname: '/movies', 
				state: {
					chooseIndex: "1"
				}
			});
	}
	componentDidMount() {
		 bannerSwiper = new Swiper (this.refs.banner, {
		    loop: true,
		    autoplay : 500,
		    autoplayDisableOnInteraction : false
		  }) 
		  
		 myScroll= new IScroll('.page', {
		 	 	bounce: true,
				probeType: 3
			}); 
		myScroll.on('scrollStart', function(){
			myScroll.refresh();
		})
 }  

}