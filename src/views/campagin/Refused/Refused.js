import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // For dispatching actions and accessing the state
import { FaRegEdit } from 'react-icons/fa';
import avatar from '../../../assets/images/avatars/2.jpg';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { adminToClient, getBloggerReply } from '../../../redux/slices/AdminControl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAdminLoged, } from '../../../redux/slices/GetUser';

function Refused() {
    const dispatch = useDispatch();
    const { bloggerReply, loading, error } = useSelector((state) => state.adminControl);
    const [visible, setVisible] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const TheToken = useSelector(getAdminLoged);
    useEffect(() => {
        // Fetch the blogger reply when the component loads
        dispatch(getBloggerReply({ TheToken }));
    }, [dispatch]);

    // Debugging: log the blogger reply data to ensure it's being loaded
    

    const handleCampaignClick = (campaign) => {
        setSelectedCampaign(campaign);
        setContent(campaign.content || '');
        setVisible(true); // Open the modal
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const contentBody = {
            content,
            campaignDescription: selectedCampaign.campaignDescription,
            campaignType: selectedCampaign.campaignType,
            from: selectedCampaign.from,
            to: selectedCampaign.to,
            blogerStatus: selectedCampaign.blogerStatus,
            clientStatus: selectedCampaign.clientStatus,
            blogerId: selectedCampaign.blogerId,
            clientId: selectedCampaign.clientId,
            adminApprovalClient: true,
            campaignUrl: selectedCampaign.campaignUrl,
            adminApprovalBloger: false,
            id: selectedCampaign.id,
        };

         // Debugging: check the body

        // Dispatch the async action to update the campaign
        dispatch(adminToClient({ contentBody, TheToken }))
            .unwrap() // Unwraps the response or error
            .then((response) => {
                
                dispatch(getBloggerReply({ TheToken }));
                setVisible(false); // Close the modal
            })
            .catch((err) => {
                console.error('Error updating the campaign:', err);
            });
    };
    const getBlogger = async (id) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/bloger/${id}`);
            navigate('/users/profile', { state: response.data });
        } catch (err) {
            console.error(err);
        }
    };
    console.log(bloggerReply)
    return (
        <div className="container-fluid d-flex justify-content-center">
            {loading ? (
                <div className="col-12 col-md-9 d-flex justify-content-center align-items-center text-center gap-3 h-100">
                    Loading...
                </div>
            ) : (
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
                                {bloggerReply.length > 0 ? bloggerReply
                                    .filter((campaign) => campaign.blogerStatus === 'Rejected')
                                    .map((campaign, index) => (
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
                                                    onClick={() => handleCampaignClick(campaign)} // Set selected campaign and open modal
                                                />
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

                    {/* Modal */}
                    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                            <CModalTitle>Edit Campaign Content</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            {selectedCampaign ? (
                                <form onSubmit={handleFormSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="content" className="form-label">Campaign Content</label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            id="content"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)} // Update content when edited
                                            style={{ height: '100px' }}
                                        />
                                    </div>
                                    <CButton type="submit" color="primary">Save Changes</CButton>
                                </form>
                            ) : (
                                <p>No campaign selected.</p>
                            )}
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
                        </CModalFooter>
                    </CModal>
                </div>
            )}
        </div>
    );
}

export default Refused