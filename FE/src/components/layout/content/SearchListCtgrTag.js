import React from "react";
import {Pagination } from 'antd';
import axios from "../../../request/index";

class SearchListCtgrTag extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			wd: this.props.wd,
            category_id: this.props.category_id,
			total: this.props.total,
			searchList:[]
		}
        this.getSearchList = this.getSearchList.bind(this);
	}

	getSearchList(page, pageSize){
		let th = this;
		axios.get("/searchLinkList?wd="+this.state.wd+"&category_id="+th.state.category_id).then(function(data){
    		th.setState({
    			searchList: data.data.data
    		})
    	})
	}

    componentWillMount() {
    	this.getSearchList(1, 10); //首次加载
    }

    componentWillReceiveProps(nextProps) {
    	this.getSearchList(1, 10); //后续更新
    }



	render(){
		let th = this;
		return(
			<div>
				<h2>共有 {this.state.total} 条记录</h2>
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
								<div className="d-flex">
									<p className="f6 text-gray mr-3 mb-0 mt-2">
										{el.link}
									</p>
									<p className="f6 text-gray mr-3 mb-0 mt-2">
										{el.update_time}
									</p>
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
				<Pagination
					style={{textAlign:"center"}}
					className="mt-2"
					defaultCurrent={1}
					total={parseInt(this.state.total)}
					onChange={(page, pageSize)=>this.getSearchList(page, pageSize)}
				/>
			</div>
		)
	}
}















export default SearchListCtgrTag;
