import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';
import { doneCampagin, doneCampagins } from '../../../redux/slices/AdminControl';
import { getAdminLoged } from '../../../redux/slices/GetUser';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GrView } from 'react-icons/gr';
import Spinner from '../../../components/spinner/Spinner';
import { motion } from 'framer-motion'
function Done() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.adminControl);
    const doneCamp = useSelector(doneCampagins);
    const TheToken = useSelector(getAdminLoged);
    const navigate = useNavigate();

    // Handle the blogger profile view
    const getBlogger = async (id) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/bloger/${id}`);
            navigate('/users/profile', { state: response.data });
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        dispatch(doneCampagin({ TheToken }))
    }, [dispatch])
    console.log(doneCamp)
    return (
        <div className="container-fluid d-flex justify-content-center">
            {loading ? (
                <div className="col-12 col-md-9 d-flex justify-content-center align-items-center text-center gap-3 h-100">
                    <Spinner />
                </div>
            ) : (
                (doneCamp.length === 0 ? 'no campaigns available' :
                    <div className="col-12 col-md-9 d-flex flex-column gap-3 w-100">
                        <motion.div
                            initial={{ y: '80px', opacity: .3, scale: .89, transition: { duration: 1 }, }}
                            animate={{ y: '0px', opacity: 1, scale: 1, transition: { duration: 1 }, }}
                            className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Blogger</th>
                                        <th scope="col">Client</th>
                                        <th scope="col">From</th>
                                        <th scope="col">To</th>
                                        <th scope="col">Handle</th>
                                        <th scope="col">view</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {doneCamp.length > 0 ? doneCamp.map((campaign, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td className="d-flex align-self-center gap-1" onClick={() => getBlogger(campaign.blogerId)} style={{ cursor: 'pointer' }}>
                                                <img className="rounded-circle" src={campaign.blogerImage || avatar} alt="." width={25} />
                                                <p className="m-0">{campaign.blogerName || 'Blogger Name'}</p>
                                            </td>
                                            <td>{campaign.createdBy || 'Client Name'}</td>
                                            <td>{campaign.from || 'Date'}</td>
                                            <td>{campaign.to || 'Date'}</td>
                                            <td>
                                                <FaRegEdit
                                                    size={25}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </td>
                                            <td>
                                                <Link className='text-decoration-none' to={campaign.campaignUrl} target='_blank'>
                                                    <motion.button
                                                        style={{ background: 'transparent', border: 'none', color: 'blue' }}
                                                        initial={{ opacity: 0.6 }}
                                                        whileHover={{
                                                            scale: 1.2,
                                                            transition: { duration: 1 },
                                                            color: '#00b2e5'
                                                        }}
                                                        whileTap={{ scale: 0.9 }}
                                                        whileInView={{ opacity: 1 }}>
                                                        <GrView size={25} />
                                                    </motion.button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="text-center">No data available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </motion.div>
                    </div>
                )
            )}
        </div>
    )
}

export default Done