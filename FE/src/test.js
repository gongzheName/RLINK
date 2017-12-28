

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
