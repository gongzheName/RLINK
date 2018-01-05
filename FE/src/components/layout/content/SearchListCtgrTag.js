import React from "react";
import {Pagination } from 'antd';
import axios from "../../../request/index";

class SearchListCtgrTag extends React.Component{
	constructor(props){
		super(props);
		console.log(props);
		this.state = {
			wd: this.props.wd,
			searchList:[]
		}
	}

	getSearchList(){
		let th = this;
		axios.get("/link_list.json?wd="+this.state.wd).then(function(data){
    		console.log(data.data);
    		th.setState({
    			searchList: data.data
    		})
    	})
	}

    componentWillMount() {
    	this.getSearchList();
    }

    componentWillReceiveProps(nextProps) {
    	this.getSearchList();
    }



	render(){
		let th = this;
		return(
			<div>
				<h2>共有 1324 条记录</h2>
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
								{el.username}
							</div>
						</div>
					</div>
					))}
				</ul>
				<Pagination
					style={{textAlign:"center"}}
					className="mt-2"
					defaultCurrent={1}
					total={50}
					onChange={(page, pageSize)=>(this.getSearchList)}
				/>
			</div>
		)
	}
}















export default SearchListCtgrTag;
