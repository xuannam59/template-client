import { useState } from 'react';
import { Outlet } from 'react-router'

const LayoutAuth = () => {
    return (
        <>
            <div className="container-fluid bg-body-tertiary" style={{ height: "100vh" }}>
                <div className="row">
                    <div className="d-none d-md-flex col-6 p-0 justify-content-center align-items-center"
                        style={{ height: "100vh" }}
                    >
                        <div>
                            <img src="/images/bg-auth.png" alt="" style={{ width: "400px" }} />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 p-0">
                        <div
                            className="container d-md-flex align-items-center justify-content-center"
                            style={{ height: "100vh" }}
                        >
                            <div className="col-sm-12 col-md-12 col-lg-8 bg-white p-3 rounded-3 shadow-sm">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LayoutAuth