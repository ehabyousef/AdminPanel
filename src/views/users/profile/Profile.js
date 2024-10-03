import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import { IoLogoInstagram, IoLogoTiktok, IoLogoYoutube } from "react-icons/io5";
import axios from 'axios';
function profile() {
    const location = useLocation();
    const blogger = location.state;
    
    return (
        <div className="container">
            <div className="row my-5">
                <div
                    className="col-12 col-md-5 d-flex flex-column position-relative"
                    style={{ minHeight: "420px" }}
                >
                    <div className="position-absolute h-100 my-2" style={{ width: "90%" }}>
                        <img
                            className="rounded-3"
                            src={blogger.image}
                            alt={blogger.name}
                            width="100%"
                            height="100%"
                        />
                    </div>
                </div>
                <div className="col-12 col-md-6 d-flex flex-column align-items-start mt-4">
                    <p className="fs-3 fw-bold">{blogger.name}</p>
                    {blogger.price ?
                        <>
                            <p className="fs-4 fw-bold" style={{ color: "var(--burble)" }}>
                                {blogger.price || '000$'}$
                            </p>
                            <div className="d-flex flex-column gap-4">
                                <div className="d-flex gap-2 align-items-center">
                                    <IoLogoInstagram size={20} color="var(--blue)" />
                                    <p className="m-0">
                                        {blogger.instagramFollowers} <span>followers</span>
                                    </p>
                                </div>
                                <div className="d-flex gap-2 align-items-center">
                                    <IoLogoYoutube size={20} color="var(--blue)" />
                                    <p className="m-0">
                                        {blogger.youtubeFollowers} <span>followers</span>
                                    </p>
                                </div>
                                <div className="d-flex gap-2 align-items-center">
                                    <IoLogoTiktok size={20} color="var(--blue)" />
                                    <p className="m-0">
                                        {blogger.tiktokFollowers} <span>followers</span>
                                    </p>
                                </div>
                            </div>
                        </>
                        : ""
                    }
                    <div className="my-2 d-flex gap-2 align-items-center">
                        <h5 className="m-0" style={{ color: 'var(--red)' }}>email :</h5>
                        <p className="m-0 fs-4">{blogger.email}</p>
                    </div>
                    <div className="my-2 d-flex gap-2 align-items-center">
                        <h5 className="m-0" style={{ color: 'var(--red)' }}>phone :</h5>
                        <p className="m-0 fs-4">{blogger.phone}</p>
                    </div>
                    {blogger.maritalStatus ?
                        <div className="my-2 d-flex gap-2 align-items-center">
                            <h5 className="m-0" style={{ color: 'var(--red)' }}>maritalStatus :</h5>
                            <p className="m-0 fs-4">{blogger.maritalStatus}</p>
                        </div>
                        : ""
                    }
                    {blogger.city ?
                        <div className="my-2 d-flex gap-2 align-items-center">
                            <h5 className="m-0" style={{ color: 'var(--red)' }}>city :</h5>
                            <p className="m-0 fs-4">{blogger.city}</p>
                        </div>
                        : ""
                    }
                    {blogger.language ?
                        <div className="my-2 d-flex gap-2 align-items-center">
                            <h5 className="m-0" style={{ color: 'var(--red)' }}>language :</h5>
                            <p className="m-0 fs-4">{blogger.language}</p>
                        </div>
                        : ""
                    }
                </div>
            </div>
        </div>
    )
}

export default profile