import React, {Component} from 'react'
import $ from "jquery" 
import "../css/main.css"
import "../css/me.css" 
export default class Me extends Component{
	constructor(routeProps){
		super()
		let {match, history, location} = routeProps;
		this.state={
			history
		}
	}
	render(){
		return (
			<div class="page">
				<div class="login">
					<div class="login-view">
						<form class="view">
							<div class="form-group">
								<input class="form-control form1-control" type="text" placeholder="输入手机号/邮箱" />
								<div class="input-bg"></div>
							</div>
							<div class="form-group"> 
								<input class="form-control form2-control" type="password" placeholder="输入密码/验证码" />
								<div class="input-bg"></div> 
							</div>
							<div onClick={this.btnAction.bind(this)} class="center-block sub">登录</div>  
						</form>      
					</div>
				</div> 
			</div>
		)
	}
	btnAction(){
		if($(".form1-control").val()!=""&&$(".form2-control").val()!=""){
			alert ('登录成功')
			this.state.history.push({ 
				pathname:'/'   
			});  
		}
	}
	
} 