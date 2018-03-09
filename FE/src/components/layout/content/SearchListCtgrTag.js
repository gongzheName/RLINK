import React from "react";
import QRCode from "qrcode.react";
import {Pagination } from 'antd';
import axios from "../../../request/index";

class SearchListCtgrTag extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			wd: this.props.wd,
      category_id: this.props.category_id,
			total: this.props.total,
			searchList:[],
			emptyList:false
		}
    this.getSearchList = this.getSearchList.bind(this);
    this.nodata = this.nodata.bind(this);
	}

	getSearchList(page, page_size){
		let th = this;
		page--;
		let args = ["/searchLinkList"];
		args.push("?wd="+this.state.wd);
		args.push("&category_id="+this.state.category_id);
		args.push("&page="+page);
		args.push("&page_size="+page_size);
		axios.get(args.join("")).then(function(data){
  		th.setState({
  			searchList: data.data.data,
  			emptyList: data.data.is_empty == "true"
  		});
  	});
	}

    componentWillMount() {
    	this.getSearchList(1, 10); //首次加载
    }

    componentWillReceiveProps(nextProps) {
    	this.setState({wd:nextProps.wd}, function(){
    		this.getSearchList(1, 10); //后续更新
    	});

    }

  nodata(){
  	if(this.state.emptyList){
  		return(
  			<span>暂无<span style={{color:"red"}}>{this.state.wd}</span>搜索记录</span>
  		)
  	}else{
  		return(<span>共有{this.state.total}条记录</span>)
  	}
  }

	render(){
		let th = this;
		return(
			<div>
				<h2>{this.nodata()}</h2>
				<ul>
					{this.state.searchList.map((el, key)=>(
						<div className="repo-list" key={key}>
						<div
							className="repo-list-item d-flex flex-justify-start py-4 public source"
						>
							<div className="col-8 pr-3">
								<h3>
									<a
										target="_blank"
										href={el.link}
										className="v-align-middle"
									>
										{th.state.wd}/
										<em>{el.name}</em>
									</a>
								</h3>
								<p className="col-9 text-gray mb-2 pr-4">
									{el.description}
								</p>
								<div style={{position:"relative"}} className="d-flex">
									<p style={{width:"200px"}}
										className="f6 text-gray mr-3 mb-0 mt-2">
										{el.link}
									</p>
									<p style={{width:"110px"}}
										className="f6 text-gray mr-3 mb-0 mt-2">
										{el.update_time}
									</p>
									<div
										style={{position:"absolute",top:"-50px",left:"400px",width:"80px",height:"80px"}}
									>
									<QRCode
										style={{width:"80px",height:"80px"}}
										value={el.link} /></div>
								</div>
							</div>
							<div className="d-table-cell col-2 text-gray pt-2">
								<span
									style={{backgroundColor:"#2b7489"}}
									className="repo-language-color ml-0"
								></span>
								管理员
							</div>
						</div>
					</div>
					))}
				</ul>

				<div style={{display: this.state.emptyList? "none": "block"}}>
					<Pagination
						style={{textAlign:"center"}}
						className="mt-2"
						defaultCurrent={1}
						total={parseInt(this.state.total)}
						onChange={(page, pageSize)=>this.getSearchList(page, pageSize)}
					/>
				</div>
			</div>
		)
	}
}















export default SearchListCtgrTag;
