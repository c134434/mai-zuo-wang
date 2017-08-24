import React, {Component} from 'react'
import $ from "jquery"
import "../css/main.css"
import "../css/card.css"

export default class Card extends Component{
	
	render(){
		return (
			<div class="page">
				<div class="card_query_form">
					<ul class="tab-list">
						<li class="ta">卖座卡</li>
						<li class="ta">电子卖座卡</li>
					</ul>
					<div class="box">
						<div class="material">
							<div class="material-top">
								<label>卡号:</label>
								<input type="text" placeholder="请输入卡号" />
								<div class="line"></div>
							</div>
							<div class="material-top">
								<label>密码:</label>
								<input type="password" placeholder="请输入密码" />
								<div class="line"></div> 
							</div>
						</div>
						<div class="material">
							<div class="material-top">
								<label>卡号:</label>
								<input type="text" placeholder="请输入15位电子卖座卡号" />
								<div class="line"></div>
							</div>
						</div>
					</div>
					<div class="msg"></div>
					<button class="card_query_bottom">查询</button>
				</div> 
			</div> 
		)
	}
	componentDidMount(){
		$('.tab-list .ta').eq(0).addClass("active1")
		$(".box .material").eq(1).css("display","none")
		$('.tab-list .ta').on('click',function(){
			var index=$(this).index()
			$(this).addClass("active1").siblings().removeClass("active1") 
			$(".box .material").eq(index).css("display","block").siblings().css("display","none")  
		})  
	}
}