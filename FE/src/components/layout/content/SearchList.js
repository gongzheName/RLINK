import React from "react";
import { Tabs, Select, Pagination } from 'antd';

import "./index.less";
const TabPane = Tabs.TabPane;
const Option = Select.Option;


let list = ()=>{
	return(
		<div>
			<h2>共有 1324 条记录</h2>
			<ul>
				<div className="repo-list">
					<div className="repo-list-item d-flex flex-justify-start py-4 public source">
						<div className="col-8 pr-3">
							<h3>
								<a href="javascript:void(0);" className="v-align-middle">
									百度/
									<em>全家桶</em>
								</a>
							</h3>
							<p className="col-9 text-gray mb-2 pr-4">
								百度全家桶, 你值得拥有
							</p>
							<div className="d-flex">
								<p className="f6 text-gray mr-3 mb-0 mt-2">MIT licence</p>
								<p className="f6 text-gray mr-3 mb-0 mt-2">updated 15hours ago</p>
							</div>
						</div>
						<div className="d-table-cell col-2 text-gray pt-2">
							<span style={{backgroundColor:"#2b7489"}} className="repo-language-color ml-0"></span>
							呵呵哒
						</div>
					</div>
				</div>
			</ul>
			<Pagination className="mt-2" defaultCurrent={1} total={50} />
		</div>
	)}


class SearchList extends React.Component {
	constructor(props){
		super(props);
		console.log(this.props, 456);
		this.test = this.test.bind(this);
		//console.log(window.decodeURIComponent(window.location.hash.split("?")[1].split("=")[1]));
	}
    componentWillMount() {
		console.log("componentWillMount")
    }

    componentDidMount() {
        console.log("componentDidMount")
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps")
    }

    shouldComponentUpdate() {
        console.log("shouldComponentUpdate")
        return true;        // 记得要返回true
    }

    componentWillUpdate() {
        console.log("componentWillUpdate")
    }

    componentDidUpdate() {
        console.log("componentDidUpdate")
    }

    componentWillUnmount() {
        console.log("componentWillUnmount")
    }
	test(){
		//alert(12345678);
	}
  render() {
    return (
      <div className="link-list">
        <Tabs tabPosition="left" onTabClick={this.test.bind(this)}>
          <TabPane tab="百度(3K)" key="1">{list()}</TabPane>
          <TabPane tab="阿里巴巴(4K)" key="2">{list()}</TabPane>
          <TabPane tab="腾讯(100)" key="3">{list()}</TabPane>
        </Tabs>
      </div>
    );
  }
}













export default SearchList;
