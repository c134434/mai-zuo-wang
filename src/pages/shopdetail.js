import React, {Component} from 'react'
import HomeService from '../service/homeService.js' 
import $ from "jquery" 
import "../css/main.css"
import "../css/shopdetail.css"
let bannerSwiper = null;
export default class ShopDetail extends Component{
	constructor(routeProps){
		super()
		let {match, history, location} = routeProps;
		this.state={
			id:location.state.id,
			history,
			objData:{},
			bannerdata:[], 
			price:'',
			sale:'',
			item:[],
			modefyindex:0, 
			p:''
		}
	}
	render(){
		let ite=this.state.item?this.state.item.map((item1,index1)=>{
											return <span onClick={this.modify.bind(this,index1)}  key={index1}>{item1}</span>
								})  :''
		
		return(
			<div class="detail">
				<div class="main">
					<div class="wrap">
						<div ref="banner" class="swiper-container home-banner1">
								<div class="swiper-wrapper">
								    {
										this.state.bannerdata.map((item, index)=>{ 
											return ( 
												<div  key={index} class="swiper-slide">
													<img class="banner-img" src={item} /> 
												</div> 
											) 
										})
									} 
								</div> 
							<div class="swiper-pagination"></div> 
						</div>
						<div class="item-info">
							<div class="name">{this.state.objData.masterName}</div>
							<div class="subname">{this.state.objData.slaveName}</div>
							<div class="price">￥{this.state.price}</div>
							<div class="tips">
								<div class="express-fee">快递：{this.state.sale} 元</div>
								<div class="sold-amount">销量:{this.state.objData.displaySalesCount}</div>
								<div class="location">全国</div>  
							</div> 
						</div>
						<div onClick={this.bttAction.bind(this)} class="sku-pick">
							选择 规格 数量 
							<i class="iconfont icon-arrow-right "></i>
						</div> 
						<div class="desc desc-show">
							<div class="desc-wrap" id="desc-w">
								
							</div> 
						</div>
						<div class="empty-bottom"></div>
					</div>
				</div>
				<div class="sku-box">
					<div class="box-body">
						<div class="box-sku-info">
							<div class="box-sku-head clearfix">
								<div class="sku-pic">
									<img class="sku-pic-img" src={this.state.bannerdata[0]} />
								</div>
								<div class="sku-context">
									<div class="price">￥{this.state.price}</div> 
									<div class="name">选择 规格 数量</div> 
								</div>
								<div onClick={this.bttnAction.bind(this)} >
									<i>X</i>
								</div>  
							</div>
						</div>
						<div class="sku-select">
							<div class="box-sku-list">
								<div class="option-name">款式</div>
								<div class="option-list">
									{ite}
								</div>
							</div>
						</div>
						<div class="box-count">
							<div class="count-title">选择数量</div>
							<div class="count-body">
								<div class="count-type">
									<span class="icon disable left">-</span>
									<span class="center">1</span>
									<span class="count-no-border icon right">+</span>
								</div>
							</div>  
						</div> 
					</div>  
				</div>
				<div class="item-bottom"> 
					<div class="item-footer-left item-footer-button">
						<div class="item-footer-home item-footer-icon">
							<i class="iconfont icon-home "></i>
							<div class="foot-icon-text">首页</div>
						</div> 
					</div>
					<div class="item-footer-right item-footer-act">立即购买</div>
				</div> 
			</div>
		)
	}
	componentWillMount(){
		HomeService.getshopdetail(this.state.id)
		.then((res)=>{
			console.log(this.state.modefyindex)
			this.setState({objData:res,bannerdata:res.skuList[this.state.modefyindex].images,price:res.skuList[this.state.modefyindex].marketPrice,sale:res.skuList[this.state.modefyindex].salesCount,item:res.item})
			bannerSwiper.update();
			}    
	    ) 
	    
	    HomeService.gethtmlDate(this.state.id)
		.then((res)=>{
			var oDom=document.getElementById("desc-w")
			oDom.innerHTML=res 
			}     
	    ) 
	}   
	bttnAction(){ 
		$('.sku-box').hide()
	}
	bttAction(){
		$('.sku-box').show()
	}
	modify(n){
		this.setState({modefyindex:n})
		HomeService.getshopdetail(this.state.id)
		.then((res)=>{ 
			this.setState({objData:res,bannerdata:res.skuList[this.state.modefyindex].images,price:res.skuList[this.state.modefyindex].marketPrice,sale:res.skuList[this.state.modefyindex].salesCount,item:res.item})
			bannerSwiper.update();
			}    
	    )
		let v=$('.option-list span').eq(n).html()
		let y=$('.center').html()
		$('.sku-pick').html(v+"x"+y)
		$('.sku-box').hide()
	}
	componentDidMount(){
		$('.left').on('click',function(){
			let x=$('.center').html()
			if(x<2){
				$('.center').html(1)
			}
			else{
				x--
				$('.center').html(x)
			}
		})
		$(".right").on('click',function(){
			let x=$('.center').html()
			x++
			$('.center').html(x)
		})
		bannerSwiper = new Swiper (this.refs.banner, {
		    loop: true,
		    autoplay : 1000 ,
		    pagination: '.swiper-pagination' ,
		    autoplayDisableOnInteraction : false  
		 
		})
	}
}
