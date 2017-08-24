import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import HomeService from '../service/homeService.js'
import "../css/main.css"
import "../css/city.css" 
import $ from "jquery" 
import store from '../store' 
let myScroll
export default class City extends Component{
	constructor(){
		super()
		this.state={
			cityHint:[
			"A","B","C","D","E","F",
			"G","H","J","K","L","M",
			"N","P","Q","R","S","T",
			"W","X","Y","Z"
			],
			cityData:[]
		}
	}
	render(){
		return (
			<ReactCSSTransitionGroup
		      transitionName="example"
		      transitionAppear={true}
		      transitionAppearTimeout={500}
		      transitionEnter={false}
		      transitionLeave={false}>
		      	<div class="City">
		      		<div class="wrap">
					<div class="gprs-city">
						<div class="city-index-title">GPS定位你所在城市</div>
						<div class="city-index-detail">
							<ul class="list-unstyled">
								<li class="city-item-detail">深圳</li>
							</ul> 
						</div>
					</div>
					<div class="hot-city">
						<div class="city-index-title">热门城市</div>
						<div class="city-index-detail">   
							<ul class="list-unstyled"> 
								<li onClick={this.cityAction.bind(this,"北京")} class="city-item-detail1">北京</li>
								<li onClick={this.cityAction.bind(this,"上海")} class="city-item-detail1">上海</li>
								<li onClick={this.cityAction.bind(this,"广州")} class="city-item-detail1">广州</li>
								<li onClick={this.cityAction.bind(this,"深圳")} class="city-item-detail1">深圳</li> 
							</ul>  
						</div> 
					</div>
					<div class="index-city">
						<div class="city-hint">
							<div class="city-index-title">按字母排序</div>
							<div class="city-index-detail">
								<ul class="list-unstyled">
									{
										this.state.cityHint.map((item,index)=>{ 
											return <li onClick={this.btnMove.bind(this,index)} key={index} class="city-item-detail2">{item}</li>
										})
									}
									
								</ul>
							</div>
						</div>
						<div class="index-city-list"> 
							{
								this.state.cityData.map((ite,ind)=>{
									return(
										<div key={ind} class="index-city-plate">
											<div class="city-index-title">{ite[0].pinyin}</div>
											<div class="city-index-detail">
												<ul class="list-unstyled">
													{
														ite.map((ite1,ind1)=>{
															return <li onClick={this.cityAction.bind(this,ite1.name)} class="tite" key={ind1}>{ite1.name}</li>
														}) 
													}
												</ul>
											</div>
										</div>   
									)
								})
							}
						</div>
					</div>
					</div>
				</div> 
		    </ReactCSSTransitionGroup> 
		)
	}
	componentWillMount(){
		HomeService.getcityDate()
		.then((res)=>{
			console.log(res) 
			this.setState({cityData:res}) 
			}  
	)  
	}
	btnMove(val){ 
		var h=$('.index-city-list .index-city-plate').eq(val).offset().top-40
		myScroll.scrollTo(0,-h,300)  
		myScroll.refresh();  
	}
	cityAction(v){
		console.log(v)
		store.dispatch({
			//事件名字
			type: 'changename',
			//参数
			val: v 
		});
	}
	componentDidMount(){ 
		myScroll= new IScroll('.City', {
		 	 	bounce: true,
				probeType: 3
			}); 
		myScroll.on('scrollStart', function(){
			//myScroll.refresh();
		})
		
		myScroll.on('scrollEnd', function(){
			var disY = myScroll.y - myScroll.maxScrollY;
			console.log(disY) 
		})
	}
	
	componentWillUnmount(){ 
		myScroll=null
	}
} 