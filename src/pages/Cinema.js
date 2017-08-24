import React, {Component} from 'react'
import $ from "jquery" 
import HomeService from '../service/homeService.js'
import "../css/main.css"
import "../css/cinema.css"   
let myScroll
export default class Card extends Component{
	constructor(){
		super() 
		this.state={
			cinemaAdList:[],
			is:false
		}
	}
	render(){
		let isshow={display: this.state.is?"block" : "none"}
		return ( 
			<div class="page">
				<div class="wrap">
				<ul class="qu-list">
					{
						this.state.cinemaAdList.map((item,index)=>{
							return(    
								<li key={index} class="item">
									<div onClick={this.show.bind(this)} class="title">{item[1].quname}</div>
									<div class="menu" style={isshow}> 
										{   
											item.map((it,inx)=>{  
												return (
													<div class="it" key={inx}>
														<div class="its">
															<div class="its-top">
																<span class="title1">{it.name}</span>
																<i class="icon-zuo">座</i>
																<i class="icon-tong">通</i>
																<i class="iconfont icon-arrow-right"></i>
															</div> 
															<span class="activity">优惠活动</span>
															<p class="address">{it.address}</p>
															<p class="distence">距离未知</p>
														</div>    
													</div>  
												)  
											})   
										}
									</div>
								</li> 
							)
						})
					}
				</ul>
				</div>
			</div>
		)
	}
	componentWillMount(){
		HomeService.getcinemaAdList()
		.then((res)=>{
			console.log(res)    
			this.setState({cinemaAdList:res}) 
			}  
		)
		
	}
	show(){
		this.setState({is:!this.state.is}) 
	}
	componentDidMount(){
		
		myScroll= new IScroll('.page', {
		 	 	bounce: true,
				probeType: 3
			}); 
		myScroll.on('scrollStart', function(){
			myScroll.refresh();
		})
	}
	componentWillUnmount(){
		myScroll=null
	}
}