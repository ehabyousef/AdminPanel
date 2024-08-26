import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function profile() {
    const [blogger, setBlogger] = useState({});
    const { id } = useParams();
    useEffect(() => {
        const getBlogger = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/bloger/${id}`
                );
                setBlogger(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        getBlogger();
    }, [id]);
    return (
        <div className="container">
            <div className="row my-3 justify-content-center">
                <div
                    className="col-12 col-md-6 d-flex flex-column position-relative"
                    style={{ minHeight: "300px" }}
                >
                    <div className="position-absolute w-75 h-100">
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
                    <div className="w-100 ">
                        <p className="fs-3 fw-bold">{blogger.name}</p>
                    </div>
                    <p className="fs-4 fw-bold" style={{ color: "var(--burble)" }}>
                        $17,00
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
                </div>
            </div>
        </div>
    )
}

export default profile