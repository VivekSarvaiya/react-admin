import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Profile = () => {
    return (
        <>
            <section className="login">
                <div className="container " style={{ height: "100vh" }}>
                    <div className="row d-flex justify-content-center align-items-center h-100 ">
                        <div className="col-xl-10">
                            <div className="card p-4" style={{ borderRadius: "10px" }}>
                                <div className="d-flex align-items-center flex-wrap gap-5">
                                    <Avatar
                                        sx={{
                                            width: "8rem",
                                            height: "8rem",
                                            background:
                                                "linear-gradient(90deg,  #3c56bd 0%, #5a78ef 100%)",
                                        }}
                                    />

                                    <div className="col-md-6 mx-4">
                                        <dt className="text-sm font-medium text-gray-500">text</dt>
                                        <dd className="mt-1 text-sm text-gray-900">Remote</dd>
                                        <Button
                                            type="link"
                                            className="px-0"
                                            icon={<EditOutlined className="fs-5" />}
                                        >
                                            Edit Details
                                        </Button>
                                    </div>
                                </div>
                                <br />
                                <div>
                                    <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
                                        <h1 className="text-gray-500 font-medium fs-5 mb-0">
                                            Personal Details
                                        </h1>
                                        <br />
                                        <dl className="row row-cols-1 gap-4 gap-md-0 g-md-3">
                                            <div className="col-md-6 mt-3">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    {/* <IntlMessages id="roles.preview.location" /> */}
                                                    text
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {/* {role?.location ? role?.location : "Remote"} */}Remote
                                                </dd>
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    {/* <IntlMessages id="roles.preview.location" /> */}
                                                    text
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {/* {role?.location ? role?.location : "Remote"} */}
                                                    Remote
                                                </dd>
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    {/* <IntlMessages id="roles.preview.location" /> */}
                                                    text
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {/* {role?.location ? role?.location : "Remote"} */}
                                                    Remote
                                                </dd>
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    {/* <IntlMessages id="roles.preview.location" /> */}
                                                    text
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {/* {role?.location ? role?.location : "Remote"} */}
                                                    Remote
                                                </dd>
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    {/* <IntlMessages id="roles.preview.location" /> */}
                                                    text
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {/* {role?.location ? role?.location : "Remote"} */}
                                                    Remote
                                                </dd>
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    text
                                                    {/* <IntlMessages id="roles.preview.department" /> */}
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {/* {role?.department} */}department
                                                </dd>
                                            </div>

                                            <div className="col-md-6 mt-3">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    text
                                                    {/* <IntlMessages id="roles.preview.experience" /> */}
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {/* {role?.experience} */}department
                                                </dd>
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    text
                                                    {/* <IntlMessages id="roles.preview.qualification" /> */}
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    text
                                                    {/* {role?.qualification ? role?.qualification : "Not Provided"} */}
                                                </dd>
                                            </div>

                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profile;