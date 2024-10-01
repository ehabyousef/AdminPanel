import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { liveCampagin, liveCampagins } from '../../../redux/slices/AdminControl';
import { getAdminLoged } from '../../../redux/slices/GetUser';
import { FaRegEdit } from 'react-icons/fa';
import { GrView } from 'react-icons/gr';
import { Link } from 'react-router-dom';
function Live() {
    const dispatch = useDispatch();
    const liveCamp = useSelector(liveCampagins);
    const TheToken = useSelector(getAdminLoged);
    console.log(liveCamp)
    useEffect(() => {
        dispatch(liveCampagin({ TheToken }))
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
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Handle</th>
                                <th scope="col">view</th>
                            </tr>
                        </thead>
                        <tbody>
                            {liveCamp.length > 0 ? liveCamp.map((campaign, index) => (
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
                                    <td colSpan="7" className="text-center">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Live