import React, {Component} from 'react'
import "../css/shoplist.css"
import "../css/main.css"
import HomeService from '../service/homeService.js'
let myScroll=null
export default class Me extends Component{
	constructor(routeProps){
		super()
		let {match, history, location} = routeProps; 
		this.state={
			id:location.state.id,
			dat:{},
			data:[],
			history
		}
	}
	render(){
		return( 
			<div class="page two">
				<div class="wrap">
					<div class="banner">
						<div class="detail1">
							<img class="detail1-img" src={this.state.dat.imageSrc} />
						</div>
						<div class="detail2">
							<img class="detail2-img" src={this.state.dat.image} />
							<p class="name">{this.state.dat.name}</p> 
						</div>   
					</div>
					<div class="main">
						<div class="content1">
							{
								this.state.data.map((item,index)=>{ 
									return(
										<div onClick={this.btttAction.bind(this,item.id)} key={index} class="item">
											<img class="item-img" src={item.image} />
											<div class="tit">{item.masterName}</div> 
											<div class="price">
												<span class="price1">￥{item.price}</span>
												<span class="num">已售{item.displaySalesCount}</span> 
											</div> 
										</div> 
									) 
								})
							}
						</div> 
					</div>
					<div class="foot1">貌似没有更多了</div>  
				</div>
			</div> 
		)
	}
	
	componentWillMount(){
		HomeService.getshopda(this.state.id)
		.then((res)=>{ 
				//console.log(res)
				this.setState({data:res}) 
			}  
		)
		
		HomeService.getshoplist(this.state.id)
		.then((res)=>{ 
				//console.log(res)
				this.setState({dat:res}) 
			}  
		)
	}
	btttAction(v){
		this.state.history.push({
				pathname: '/shop/'+v,  
				state: {
					id:v 
				}    
			});
	}
	componentDidMount(){
		myScroll= new IScroll('.two', {
	 	 	bounce: true,
			probeType: 3,
		});
		myScroll.on('scrollStart', function(){
			myScroll.refresh();
		})
	}
}
