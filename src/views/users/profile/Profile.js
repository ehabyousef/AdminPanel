import React from 'react'
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion'
import { IoLogoInstagram, IoLogoTiktok, IoLogoYoutube } from "react-icons/io5";
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
                    <motion.div
                        initial={{ x: '-70px', opacity: .1, scale: .89, transition: { duration: 1 } }}
                        animate={{ x: '0px', opacity: 1, scale: 1, transition: { duration: 1 } }}
                        className="position-absolute h-100 my-2" style={{ width: "90%" }}>
                        <img
                            className="rounded-3"
                            src={blogger.image}
                            alt={blogger.name}
                            width="100%"
                            height="100%"
                        />
                    </motion.div>
                </div>
                <div className="col-12 col-md-6 d-flex flex-column align-items-start mt-4">
                    <motion.p
                        initial={{ x: '-40px', scale: .8, opacity: .1 }}
                        animate={{ x: '0px', scale: 1, opacity: 1, transition: { duration: 1.2 } }}
                        className="fs-3 fw-bold">{blogger.name}</motion.p>
                    {blogger.price ?
                        <>
                            <motion.p
                                initial={{ y: '-10px', opacity: .1 }}
                                animate={{ y: '0px', opacity: 1, transition: { duration: 1.2 } }}
                                className="fs-4 fw-bold" style={{ color: "var(--burble)" }}>
                                {blogger.price || '000$'}$
                            </motion.p>
                            <div className="d-flex flex-column gap-4">
                                <div className="d-flex gap-2 align-items-center">
                                    <IoLogoInstagram size={20} color="var(--blue)" />
                                    <motion.p
                                        initial={{ y: '-10px', opacity: .1 }}
                                        animate={{ y: '0px', opacity: 1, transition: { duration: 1.2 } }}
                                        className="m-0">
                                        {blogger.instagramFollowers} <span>followers</span>
                                    </motion.p>
                                </div>
                                <div className="d-flex gap-2 align-items-center">
                                    <IoLogoYoutube size={20} color="var(--blue)" />
                                    <motion.p
                                        initial={{ x: '-10px', opacity: .1 }}
                                        animate={{ x: '0px', opacity: 1, transition: { duration: 1.2 } }}
                                        className="m-0">
                                        {blogger.youtubeFollowers} <span>followers</span>
                                    </motion.p>
                                </div>
                                <div className="d-flex gap-2 align-items-center">
                                    <IoLogoTiktok size={20} color="var(--blue)" />
                                    <motion.p
                                        initial={{ y: '10px', opacity: .1 }}
                                        animate={{ y: '0px', opacity: 1, transition: { duration: 1.2 } }}
                                        className="m-0">
                                        {blogger.tiktokFollowers} <span>followers</span>
                                    </motion.p>
                                </div>
                            </div>
                        </>
                        : ""
                    }
                    <motion.div
                        initial={{ x: '40px', opacity: .1 }}
                        animate={{ x: '0px', opacity: 1, transition: { duration: 1.2 } }}
                        className="my-2 d-flex gap-2 align-items-center">
                        <h5 className="m-0" style={{ color: 'var(--red)' }}>email :</h5>
                        <p className="m-0 fs-4">{blogger.email}</p>
                    </motion.div>
                    <motion.div
                        initial={{ x: '40px', opacity: .1 }}
                        animate={{ x: '0px', opacity: 1, transition: { duration: 1.2 } }}
                        className="my-2 d-flex gap-2 align-items-center">
                        <h5 className="m-0" style={{ color: 'var(--red)' }}>phone :</h5>
                        <p className="m-0 fs-4">{blogger.phone}</p>
                    </motion.div>
                    {blogger.maritalStatus ?
                        <motion.div
                            initial={{ x: '40px', opacity: .1 }}
                            animate={{ x: '0px', opacity: 1, transition: { duration: 1.2 } }}
                            className="my-2 d-flex gap-2 align-items-center">
                            <h5 className="m-0" style={{ color: 'var(--red)' }}>maritalStatus :</h5>
                            <p className="m-0 fs-4">{blogger.maritalStatus}</p>
                        </motion.div>
                        : ""
                    }
                    {blogger.city ?
                        <motion.div
                            initial={{ x: '40px', opacity: .1 }}
                            animate={{ x: '0px', opacity: 1, transition: { duration: 1.2 } }}
                            className="my-2 d-flex gap-2 align-items-center">
                            <h5 className="m-0" style={{ color: 'var(--red)' }}>city :</h5>
                            <p className="m-0 fs-4">{blogger.city}</p>
                        </motion.div>
                        : ""
                    }
                    {blogger.language ?
                        <motion.div
                            initial={{ x: '40px', opacity: .1 }}
                            animate={{ x: '0px', opacity: 1, transition: { duration: 1.2 } }}
                            className="my-2 d-flex gap-2 align-items-center">
                            <h5 className="m-0" style={{ color: 'var(--red)' }}>language :</h5>
                            <p className="m-0 fs-4">{blogger.language}</p>
                        </motion.div>
                        : ""
                    }
                </div>
            </div>
        </div>
    )
}

export default profile