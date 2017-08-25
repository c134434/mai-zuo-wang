import API from '../Api' 
import axios from 'axios'
//banner图
function getbannerDate(){  
	 return new Promise((resolve,reject)=>{
		axios.get(`${API.bannerList}?__t=${new Date().getTime()}`) 
		//请求成功 
		.then((response)=> {
			var res=response.data.data.billboards
			res.splice(0, 0, res[res.length-1]);
			//将第一张添加最后一个位置
			//res.push(res[1]);
		    resolve(res)   
		})
		//请求失败
		.catch(function (error) {
		   console.log(error);
		}); 
	})
}


//正在热映电影
function getMoviesDate(){   
	 return new Promise((resolve,reject)=>{
		axios.get(`${API.moviceList}?__t=${new Date().getTime()}`)  
		//请求成功 
		.then((response)=> { 
		  	let newarr=response.data.data.films.map((item)=>{
		  		let obj={}
		  		obj.origin=item.cover.origin
		  		obj.grade=item.grade
		  		obj.id=item.id
		  		obj.name=item.name
		  		obj.watchCount=item.watchCount
		  		obj.cinemaCount=item.cinemaCount
		  		return obj 
		  	}) 
		    resolve(newarr)   
		})
		//请求失败
		.catch(function (error) {
		   console.log(error);
		});  
	})
}
//即将上映电影
function getmoviceComingDate(){  
	 return new Promise((resolve,reject)=>{
		axios.get(`${API.moviceComingList}?__t=${new Date().getTime()}`) 
		//请求成功 
		.then((response)=> {
			let newarr=response.data.data.films.map((item)=>{
		  		let obj={}
		  		obj.origin=item.cover.origin
		  		obj.grade=item.grade
		  		obj.id=item.id
		  		obj.name=item.name
		  		obj.watchCount=item.watchCount
		  		obj.month=new Date(item.premiereAt).getMonth()+1
		  		obj.day=new Date(item.premiereAt).getDate()
		  		return obj 
		  	})
		    resolve(newarr)     
		})
		//请求失败
		.catch(function (error) {
		   console.log(error);
		}); 
	})
}
//正在热映电影
function getcinemaDate(n){   
	 return new Promise((resolve,reject)=>{
		axios.get(`${API.cinemaUpcoming}?count=7&page=${n}`)  
		//请求成功 
		.then((response)=> { 
		  	let newarr=response.data.data.films.map((item)=>{
		  		let obj={}
		  		obj.origin=item.poster.thumbnail 
		  		obj.intro=item.intro
		  		obj.grade=item.grade
		  		obj.id=item.id
		  		obj.name=item.name
		  		obj.watchCount=item.watchCount
		  		obj.cinemaCount=item.cinemaCount
		  		return obj 
		  	}) 
		    resolve(newarr)   
		})
		//请求失败
		.catch(function (error) {
		   console.log(error);
		}); 
	})
}
//即将上映
function getcinemaList(n){   
	 return new Promise((resolve,reject)=>{
		axios.get(`${API.cinemaList}?count=7&page=${n}`) 
		//请求成功 
		.then((response)=> { 
		  	let newarr=response.data.data.films.map((item)=>{
		  		let obj={}
		  		obj.origin=item.poster.thumbnail 
		  		obj.intro=item.intro
		  		obj.grade=item.grade
		  		obj.id=item.id
		  		obj.name=item.name
		  		obj.watchCount=item.watchCount
		  		obj.cinemaCount=item.cinemaCount
		  		return obj 
		  	}) 
		    resolve(newarr)   
		})
		//请求失败
		.catch(function (error) {
		   console.log(error);
		}); 
	})
}
//电影地域分布
function getcinemaAdList(){   
	 return new Promise((resolve,reject)=>{
		axios.get(`${API.cinemaAdress}?__t=${new Date().getTime()}`) 
		//请求成功 
		.then((response)=> {
			//console.log(response.data.data.cinemas) 
		  	let newarr=response.data.data.cinemas.map((item)=>{
		  		let obj={} 
		  		obj.address=item.address 
		  		obj.quname=item.district.name
		  		obj.pinyin=item.district.pinyin
		  		obj.id=item.id
		  		obj.show={display:"none"} 
		  		obj.activity=item.labels
		  		obj.name=item.name 
		  		obj.latitude=item.geocode.latitude
		  		obj.longitude=item.geocode.longitude
		  		return obj  
		  	})
		  	let arr=[]
		  	for(let i=0;i<newarr.length;i++){
		  		if(arr.indexOf(newarr[i].quname)==-1){
		  			arr.push(newarr[i].quname)
		  		} 
		  	}
		  	//console.log(arr)
		  	let arr2=arr.map((item)=>{
		  		let arr1=[] 
		  		for(let j=0;j<newarr.length;j++){
		  			if(newarr[j].quname==item){
		  				arr1.push(newarr[j]) 
		  			} 
		  		}
		  		return arr1
		  	})
		    resolve(arr2)    
		}) 
		//请求失败
		.catch(function (error) {
		   console.log(error);
		}); 
	})
}

//城市列表
function getcityDate(){  
	 return new Promise((resolve,reject)=>{
		axios.get(`${API.cityList}?__t=${new Date().getTime()}`) 
		//请求成功 
		.then((response)=> { 
			let newarr=response.data.data.cities.map((item)=>{
				let obj={}
				obj.pinyin=item.pinyin.substring(0,1)
				obj.name=item.name
				return obj
			})
			let arr=[]
		  	for(let i=0;i<newarr.length;i++){
		  		if(arr.indexOf(newarr[i].pinyin)==-1){
		  			arr.push(newarr[i].pinyin) 
		  		}
		  	}
		  	function compare(value1,value2){
				if(value1<=value2){
					return -1;
				}
				else{
					return 1
				}
			}
		  	var arr3=arr.sort(compare)
		  	let arr2=arr3.map((item)=>{
		  		let arr1=[]  
		  		for(let j=0;j<newarr.length;j++){
		  			if(newarr[j].pinyin==item){
		  				arr1.push(newarr[j]) 
		  			}  
		  		}
		  		return arr1
		  	})
		  	//console.log(arr2) 
		    resolve(arr2)     
		})
		//请求失败
		.catch(function (error) {
		   console.log(error);
		}); 
	})
}
//商城列表
function getshopDate(){  
	 return new Promise((resolve,reject)=>{
		axios.get(`${API.sellerList}`) 
		//请求成功 
		.then((response)=> {
			let arr=[]
			let newarr=response.data.data.splice(0,8)
			let newarr1=newarr.map((item)=>{
				let obj={}
				obj.imageSrc=item.imageSrc
				obj.name=item.name
				obj.url=item.url
				let newarr2=item.url.split("/")
				obj.id=newarr2[5]
				obj.title=newarr2[4] 
				return obj
			})
			arr.push(newarr1)
			let arr1=response.data.data.splice(0,2) 
			arr.push(arr1) 
			let arr2=response.data.data.splice(0,2)
			arr.push(arr2)
			let arr3=response.data.data.splice(0,3)
			arr.push(arr3) 
			let arr4=response.data.data.splice(0,response.data.data.length)
			arr.push(arr4)
			console.log(arr) 
		    resolve(arr)       
		})
		//请求失败
		.catch(function (error) {
		   console.log(error);
		}); 
	})
}
//电影详情
function getfilmDate(id){  
	 return new Promise((resolve,reject)=>{
		axios.get(`${API.filmData}/${id}?__t=${new Date().getTime()}`) 
		//请求成功  
		.then((response)=> {
			let obj={} 
			if(response.data.data.film.actors[0].name){
				obj.name1=response.data.data.film.actors[0].name
				obj.name2=response.data.data.film.actors[1].name
				obj.name3=response.data.data.film.actors[2].name
				obj.name4=response.data.data.film.actors[3].name
				obj.name5=response.data.data.film.actors[4].name
			}
			obj.director=response.data.data.film.director 
			obj.category=response.data.data.film.category
			obj.language=response.data.data.film.language
			obj.nation=response.data.data.film.nation
			obj.origin=response.data.data.film.cover.origin
			obj.synopsis=response.data.data.film.synopsis
			obj.month=new Date(response.data.data.film.premiereAt).getMonth()+1
		  	obj.day=new Date(response.data.data.film.premiereAt).getDate()
		    resolve(obj)        
		})
		//请求失败
		.catch(function (error) {
		   console.log(error);
		}); 
	})
}
//商城banner图列表
function getshoplist(id){   
	 return new Promise((resolve,reject)=>{
		axios.get(`${API.shopbannerList}?id=${id}`) 
		//请求成功 
		.then((response)=> {
		    if(response.data.status=="-1"){
				
				axios.get(`${API.shopbannerLis}`)
				.then((res)=> {
					resolve(res.data.data) 
				})
			}
			else{
				resolve(response.data.data)   
			}    
		})
		//请求失败
		.catch(function (error) {
		   console.log(error);
		}); 
	})
}
//商城商品列表
function getshopda(id){    
	 return new Promise((resolve,reject)=>{
		axios.get(`${API.shoplistData}?id=${id}&page=1&num=20`) 
		//请求成功 
		.then((response)=> {   
			if(response.data.data==null){
				
				axios.get(`${API.shoplistDat}`)
				.then((res)=> {
					 
					let newarr=res.data.data.products.map((item1)=>{
						let newobj={}
						newobj.id=item1.id
						newobj.image=item1.image
						newobj.masterName=item1.name
						newobj.price=item1.price/100+'.00' 
						return newobj
					})
					resolve(newarr)
				})
			}
			else{
				let arr=response.data.data.list.map((item)=>{
					let obj={}
					obj.id=item.id
					obj.displaySalesCount=item.displaySalesCount
					obj.masterName=item.masterName
					obj.image=item.skuList[0].image
					obj.price=item.skuList[0].price/100+'.00'
					return obj
				})
				resolve(arr)  
			}
		    
		})
		//请求失败
		.catch(function (error) { 
		   console.log(error);
		}); 
	})
}

//商品详情
function getshopdetail(id){  
	 return new Promise((resolve,reject)=>{
		axios.get(`${API.shopdetailData}?id=${id}`) 
		//请求成功 
		.then((response)=> {
			let b=response.data.data 
			let obj={}
			obj.displaySalesCount=b.displaySalesCount
			obj.id=b.id
			obj.supplierId=b.supplierId
			if(b.options[0]){ 
				obj.item=b.options[0].item
				obj.name=b.options[0].name
			}
			obj.masterName=b.masterName
			obj.slaveName=b.slaveName
			obj.skuList=b.skuList.map((item)=>{
				let obj1={}
				item.images.splice(0, 0, item.images[item.images.length-1]);
				//item.images.push(item.images[1]);
				obj1.images=item.images 
				obj1.marketPrice=item.price/100+'.00'
				obj1.salesCount=item.score+'.00'
				obj1.masterName=item.masterName 
				return obj1
			}) 
		    resolve(obj)   
		})
		//请求失败
		.catch(function (error) {
		   console.log(error); 
		}); 
	})
}
function gethtmlDate(id){  
	 return new Promise((resolve,reject)=>{
		axios.get(`${API.shopdetailP}?id=${id}`) 
		//请求成功 
		.then((response)=> {
		    resolve(response.data.data.desc)    
		})
		//请求失败
		.catch(function (error) {
		   console.log(error);
		}); 
	})
}
export default{ 
	getMoviesDate,
	getbannerDate,
	getmoviceComingDate,
	getcinemaDate ,
	getcinemaList,
	getcinemaAdList ,
	getcityDate,
	getshopDate,
	getfilmDate,
	getshoplist,
	getshopda,
	getshopdetail,
	gethtmlDate
}
