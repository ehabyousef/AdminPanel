import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { doneCampagin, doneCampagins } from '../../../redux/slices/AdminControl';
import { getAdminLoged } from '../../../redux/slices/GetUser';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Done() {
    const dispatch = useDispatch();
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
    return (
        <div className="container-fluid d-flex justify-content-center">
            <div className="col-12 col-md-9 d-flex flex-column gap-3 w-100">
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Blogger</th>
                                <th scope="col">Client</th>
                                <th scope="col">Handle</th>
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
                                            <GrView size={25} color='#0000ff' />
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
                </div>
            </div>
        </div>
    )
}

export default Done