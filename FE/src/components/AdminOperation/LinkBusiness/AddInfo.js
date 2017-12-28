import React from "react";

import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    DatePicker,
    Form,
    Icon,
    Input,
    Row,
    Select,
    Tooltip} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class AddInfo extends React.Component{
    test(){
        alert(123);
    }
    render(){
        return(
            <div>
                <h1>链接后台管理-新增</h1>
                <hr/>

                <Form>

                    <FormItem>
                        <Input
                            prefix={<Icon type="user" style={{fontSize:"13px"}} />}
                            placeholder="UserName"
                        />
                    </FormItem>

                </Form>

                <form action="">
                    <div className="form-group">
                        <label htmlFor="name">链接名称</label>
                        <input type="text" className="form-control" id="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">链接URL</label>
                        <input type="text" className="form-control" id="url"/>
                    </div>
                    <button onClick={this.props.addLink} type="button"
                            className="btn btn-default radius">提交</button>

                </form>
                    <DatePicker />
            </div>
        )
    }
}




export default AddInfo;



