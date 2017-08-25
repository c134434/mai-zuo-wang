import React, {Component} from 'react'  
import $ from "jquery"  
import "../css/movies.css"
import HomeService from '../service/homeService.js'
let myScroll=null;
let i=1
export default class Movies extends Component{
	constructor(routeProps){
		super()
		let {match, history, location} = routeProps;
		this.state={
			tabList:[{title:"正在热映"},
			{title:"即将热映"} 
			],
			history,
			moviceNow:[],
			moviceComing:[],  
			n:1,
			chooseIndex:location.state.chooseIndex ? location.state.chooseIndex :0
		}
	}
	render(){ 
		let data=this.state.chooseIndex===0? this.state.moviceNow :this.state.moviceComing
		return (   
			<div class="page">
				<div class="wrap">
				<div class="tabs" > 
					{
						this.state.tabList.map((item,index)=>{
							return <a onClick={this.tabAction.bind(this,index)} class="tab" key={index}>{item.title}</a>
						})
					} 
				</div>
				<div class="tab-main">
					<ul class="main-list">
						{
							data.map((item1,index1)=>{
								return(
									<li onClick={this.btnAction.bind(this,item1.id)} class="item" key={index1}>
										<div class="picure">
											<img class="img" src={item1.origin}/>
										</div>
										<div class="message"> 
											<div class="title">
												<p class="name">{item1.name}</p>
												<p class="grade iconfont">{item1.grade}</p>
											</div>
											<p class="intro">{item1.intro}</p>
											<div class="film-count">
												<span class="film">{item1.cinemaCount}家影院上映</span>
												<span class="count">{item1.watchCount}人购票</span>
											</div>  
										</div>  
									</li>
								) 
							})
						}
					</ul>
				</div>
				</div>
			</div> 
		)
	} 
	tabAction(index){
		this.setState({chooseIndex:index})
	}
	btnAction(val){
		this.state.history.push({
				pathname: '/film/'+val, 
				state: {
					id: val
				}
			});
	}
	componentWillMount(){
		HomeService.getcinemaDate()
		.then((res)=>{
			//console.log(res)
				this.setState({moviceNow:res}) 
			}    
		)
		
		HomeService.getcinemaList()
		.then((res)=>{
			//console.log(res)
				this.setState({moviceComing:res}) 
			}    
		)
	}
	componentDidMount(){
		var that =this
		$(".tab").eq(this.state.chooseIndex).addClass("active")
		$(".tab").on("click",function(){
			$(this).addClass("active").siblings().removeClass("active")
		}) 
		
		myScroll= new IScroll('.page', {
	 	 	bounce: true,
			probeType: 3,
		}); 

		myScroll.on('scrollEnd', function(){ 
				//判断松手滚动停止后,是否触发上拉加载更多
				var disY = myScroll.y - myScroll.maxScrollY;
				if(disY <= 150){                                                             
					//加载更多请求下一页数据,
					setTimeout(function(){
						endLoadMore();
					}, 200);
				}  
				
			})  
		//停止上拉加载更多的方法
		function endLoadMore(){
			i=i+1
			that.setState({n:i})
			HomeService.getcinemaDate(that.state.n)
			.then((res)=>{
				let ret=that.state.moviceNow.concat(res)
				that.setState({moviceNow:ret})  
				}    
			)
			
			HomeService.getcinemaList(that.state.n)
			.then((res)=>{
				let rer=that.state.moviceNow.concat(res)	
				that.setState({moviceComing:rer}) 
				}    
			)
		}
		myScroll.on('scrollStart', function(){
			myScroll.refresh();
		})
	}
	
	
}
