import React from "react";
import { Tabs, Select, Pagination } from 'antd';
import axios from "../../../request/index";
import DialogModal from "../../modal/index";

import Promise from "promise";

import SearchListCtgrTag from "./SearchListCtgrTag";

import "./index.less";
const TabPane = Tabs.TabPane;
const Option = Select.Option;


class SearchList extends React.Component {
	constructor(props){
		super(props);
    this.test = this.test.bind(this);
    this.state = {
      wd: "",
      searchResList: []
    }
	}

	getSearchResList(wd){
		let th = this;
		axios.get("/search?wd="+wd).then(function(data){
			let searchResList = data.data.data;
			searchResList = typeof(searchResList)=="string"?
							 JSON.parse(searchResList):
							 searchResList;
			th.setState({
				searchResList: searchResList
			})
		}).catch(function(err){
			console.error(err);
		})
	}

    componentDidMount() {
    	let wd = window.decodeURIComponent(window.location.hash.split("?")[1].split("=")[1]);
    	this.setState({wd});
		  this.getSearchResList(wd);
    }

    componentWillReceiveProps(nextProps) {
      let wd = window.decodeURIComponent(window.location.href.split("=")[1]);
      this.setState({wd:wd});
		  this.getSearchResList(wd);
    }
	test(){
		console.log(this)
	}

  render() {
    return (
      <div className="link-list">
        <Tabs tabPosition="left" onTabClick={this.test.bind(this)}>
		  {this.state.searchResList.map((el, key)=>(
				<TabPane tab={el.category_name+"("+el.total+")"} key={key}>
					<SearchListCtgrTag
						wd={this.state.wd}
						category_id={el.category_id}
						total={el.total}
					/>
				</TabPane>
		  	))}
        </Tabs>
      </div>
    );
  }
}













export default SearchList;
