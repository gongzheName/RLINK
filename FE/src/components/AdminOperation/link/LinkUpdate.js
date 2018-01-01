import React from "react";

class DelInfo extends React.Component{
    render(){
        return(
            <div>
                <button onClick={this.props.DelInfo}
                        className="btn btn-success">删除</button>
            </div>
        )
    }
}





export default DelInfo;