import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { doneCampagin, doneCampagins } from '../../../redux/slices/AdminControl';
import { getAdminLoged } from '../../../redux/slices/GetUser';
function Done() {
    const dispatch = useDispatch();
    const doneCamp = useSelector(doneCampagins);
    const TheToken = useSelector(getAdminLoged);
    console.log(doneCamp)
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
                        {/* <tbody>
                            {doneCamp.length > 0 ? doneCamp.map((campaign, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td className="d-flex align-self-center gap-1" onClick={() => getBlogger(campaign.blogerId)} style={{ cursor: 'pointer' }}>
                                            <img className="rounded-circle" src={campaign.blogerImage || avatar} alt="." width={25} />
                                            <p className="m-0">{campaign.blogerName || 'Blogger Name'}</p>
                                        </td>
                                        <td>{campaign.clientName || 'Client Name'}</td>
                                        <td>
                                            <FaRegEdit
                                                size={25}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </td>
                                    </tr>
                                )) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No data available</td>
                                </tr>
                            )}
                        </tbody> */}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Done