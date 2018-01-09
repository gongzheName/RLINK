

<Layout>
    <Sider
        width={200}
        style={{backgroundColor:"#FFF"}}
    >
        <Menu
            mode="inline"
            defaultSelectedKey={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{height:"100%", borderRight:0}}
        >
            <SubMenu
                key="sub1"
                title={<span><Icon type="user"/>后台管理</span>}
            >
                <Menu.Item key="1">
                    新增
                </Menu.Item>
                <Menu.Item key="2">
                    删除
                </Menu.Item>
                <Menu.Item key="3">
                    修改
                </Menu.Item>
                <Menu.Item key="4">
                    查询
                </Menu.Item>
            </SubMenu>
        </Menu>
    </Sider>
</Layout>





const menu = (arr) => {
    return(
        arr.map((e, i) => {
            return(
                <Menu.Item key={i}>
                    <Link to={e.path}>{e.navTitle}</Link>
                </Menu.Item>
            )
        })
    )
};








<FormItem
    {...formItemLayout}
    label="头像"
    style={{display: this.state.isUpdate?"none":"block"}}
>
    {this.state.isUpdate?null:getFieldDecorator('avatar', {
        rules: [{ required: true, message: '请选择头像!' }],
    })(
        <div>
            <label className="label-avator-wrap" >
                <input type="radio" name="avator" value="1" />
                <Avatar src="http://www.qq1234.org/uploads/allimg/141211/092G942H-9.jpg" />
            </label>
            <label className="label-avator-wrap" >
                <input type="radio" name="avator" value="2" />
                <Avatar icon="user" />
            </label>
            <label className="label-avator-wrap" >
                <input type="radio" name="avator" value="5" />
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </label>
            <label className="label-avator-wrap" >
                <input type="radio" name="avator" value="3" />
                <Avatar>U</Avatar>
            </label>
            <label className="label-avator-wrap" >
                <input type="radio" name="avator" value="7" />
                <Avatar style={{ backgroundColor: '#87d068'}} icon="user" />
            </label>
            <label className="label-avator-wrap" >
                <input type="radio" name="avator" value="6" />
                <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf'}}>U</Avatar>
            </label>
            <label className="label-avator-wrap" >
                <input type="radio" name="avator" value="4" />
                <Avatar>USER</Avatar>
            </label>
        </div>
    )}
</FormItem>