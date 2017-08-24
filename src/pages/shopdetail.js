import React, {Component} from 'react'
import HomeService from '../service/homeService.js' 
import $ from "jquery" 
import "../css/main.css"
import "../css/shopdetail.css" 
let bannerSwiper = null;
export default class Me extends Component{
	constructor(routeProps){
		super()
		let {match, history, location} = routeProps;
		this.state={
			id:location.state.id,
			history,
			objData:{},
			bannerdata:[],
			price:'',
			sale:''
		}
	} 
	render(){
		return(
			<div class="page detail"> 
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
						<div class="sold-amount">销量:{this.state.objData.supplierId}</div>
						<div class="location">全国</div>  
					</div> 
				</div>
				<div class="sku-pick">
					选择 规格 数量 
					<i class="iconfont icon-arrow-right "></i>
				</div>
				<div class="sku-box">
					<div class="box-body">
						<div class="box-sku-info">
							<div class="box-sku-head clearfix">
								<div class="sku-pic">
									<img class="sku-pic-img" src="" />
								</div>
								<div class="sku-context">
									<div class="price">￥49.00</div>
									<div class="name">选择 规格 数量</div>
								</div>
								<div>
									<i>X</i>
								</div>  
							</div>
						</div>
						<div class="sku-select">
							<div class="box-sku-list">
								<div class="option-name">款式</div>
								<div class="option-list">
									<span>熊二</span>
									<span>熊大</span>
									<span>雪熊</span>
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
						<div class="box-bottom"></div>
					</div> 
				</div>
			</div>
		)
	}
	
	componentWillMount(){
		HomeService.getshopdetail(this.state.id)
		.then((res)=>{
				console.log(res)
				this.setState({objData:res,bannerdata:res.skuList[1].images,price:res.skuList[1].marketPrice,sale:res.skuList[1].salesCount})
				bannerSwiper.update();
			}  
		)
	}
	
	componentDidMount(){
		bannerSwiper = new Swiper (this.refs.banner, {
		    loop: true,
		    autoplay : 1000 ,
		    pagination: '.swiper-pagination' ,
		    autoplayDisableOnInteraction : false  
		 
		})
	}
}
