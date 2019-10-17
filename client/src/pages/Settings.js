import React, { Component } from 'react'

export class Settings extends Component {
    render() {
        const style = {
            main: {
              textAlign: "center",
              marginTop: "25vh"
            }
          };
        return (
            <div style={style.main}>
                <h1>Account Settings</h1>
                <div className="container">
                    <div className="row">
                        <div className="col s4 container-outline">

                        </div>
                    </div>
                    <div className="row">
                        <div className="col s4 container-outline">
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s4 container-outline">
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings
