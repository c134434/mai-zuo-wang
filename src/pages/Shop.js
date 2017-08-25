import React, {Component} from 'react'
import HomeService from '../service/homeService.js'
import $ from "jquery"
import "../css/main.css"
import "../css/shop.css"
let bannerSwiper = null;
let myScroll=null
export default class Shop extends Component{
	constructor(routeProps){
		let {match, history, location} = routeProps;
		super()
		this.state={
			bannerListData:[],
			navData:[],
			goodsData:[],
			mainData:[],
			img1:"",
			img2:"",
			img3:"",
			history
		}
	}
	render(){ 
		return ( 
			<div class="page Shop">
				<div class="wrap">
					<div ref="banner" class="swiper-container1 home-banner">
						<div class="swiper-wrapper">
						    {
								this.state.bannerListData.map((item, index)=>{
									return ( 
										<a href={item.url} key={index} class="swiper-slide">
											<img class="banner-img" src={item.imageSrc} /> 
										</a> 
									) 
								})
							} 
						</div> 
						<div class="swiper-pagination"></div> 
					</div>
					<div class="shops">
						<ul class="shops-list">
							{
								this.state.navData.map((ite,ind)=>{ 
									return(
										<li onClick={this.btnMove.bind(this,ite.id,ite.title)} class="shop" key={ind}>
											<a class="sh"> 
												<img class="shop-img" src={ite.imageSrc} />
											</a>
											<span class="shop-name">{ite.name}</span>
										</li>
									)
								})
							}
						</ul>
					</div>
					<div class="active-contain">
						{
							this.state.goodsData.map((ite1,ind1)=>{
								return(
									<div key={ind1} class="active-left">  
										<img class="active-left-img" src={ite1.imageSrc}  /> 
									</div>
								) 
							})
						} 
					</div>
					<div class="price active">
						<div class="active-title">— 有品专区 —</div>
						<div class="active-contain">
							<div class="active-center">
								<div class="active-left">
									<div class="price-left-content">
										<img src={this.state.img2.imageSrc} />
									</div>
								</div>
								<div class="active-left">
									<div class="price-left-content">
										<div class="top">
											<img src={this.state.img1.imageSrc} />
										</div>
										<div class="bottom">
											<img src={this.state.img3.imageSrc} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="main">
						{
							this.state.mainData.map((ite2,ind2)=>{
								return(
									<div key={ind2} class="subject-center">
										<div class="data-growing-idx">
											<img class="data-growing-img" src={ite2.imageSrc} />
										</div>
										<div class="pic-list">
											<div class="subject-item">
												{
													ite2.products.map((ite3,ind3)=>{
														return (
															<div onClick={this.btnAction.bind(this,ite3.id)} class="control-list" key={ind3}>
																<img class="control-list-img" src={ite3.image}/>
																<p class="control-list-title">{ite3.name.substring(0,7)}</p>
																<p class="control-list-price">￥{ite3.price/100}.00</p> 
															</div>  
														) 
													})
												}
											</div> 
										</div> 
									</div>
								)
							})
						}
					</div>
				</div>
			</div> 
		)
	}
	componentWillMount(){
		HomeService.getshopDate() 
		.then((res)=>{
			//console.log(res)
			res[1].splice(0, 0, res[1][res[1].length-1]);
			//res[1].push(res[1][1]);    
			this.setState({bannerListData:res[1],navData:res[0],goodsData:res[2],img1:res[3][0],img2:res[3][1],img3:res[3][2],mainData:res[4]});
				bannerSwiper.update(); 
			}    
		)
	}
	btnMove(val,l){
		this.state.history.push({
				pathname: '/shop1/'+l+'/'+val,  
				state: {
					id: val,
					title:l 
				}  
			});
	}
	btnAction(v){
		this.state.history.push({
				pathname: '/shop/'+v,  
				state: {
					id:v 
				}    
			});
	}
	componentDidMount(){
		 bannerSwiper = new Swiper (this.refs.banner, {
		    loop: true,
		    autoplay : 500 ,
		    pagination: '.swiper-pagination' ,
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