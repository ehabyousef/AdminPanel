import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // For dispatching actions and accessing the state
import { FaRegEdit } from 'react-icons/fa';
import { GrView } from 'react-icons/gr';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../../../assets/images/avatars/2.jpg';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { adminToBloger } from '../../../redux/slices/AdminControl';
import axios from 'axios';
import { getToken } from '../../../redux/slices/GetUser';

function Pending() {
    const [loading, setLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [content, setContent] = useState('');
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const TheToken = useSelector(getToken);

    const getPendingBloggers = () => {
        setLoading(true);
        axios
            .get('http://92.113.26.138:8081/api/admin/campaign/to-bloger', {
                headers: {
                    Authorization: `Bearer ${TheToken}`,
                },
            })
            .then((response) => {
                setCampaigns(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);

            });
    };

    useEffect(() => {
        getPendingBloggers();
    }, []);

    // Handle when a campaign is clicked to edit its content
    const handleCampaignClick = (campaign) => {
        setSelectedCampaign(campaign);
        setContent(campaign.campaignDescription || ''); // Set the initial content of the selected campaign
        setVisible(true);
    };

    // Handle the blogger profile view
    const getBlogger = async (id) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/bloger/${id}`);
            navigate('/users/profile', { state: response.data });
        } catch (err) {
            console.error(err);
        }
    };

    // Handle form submission to update the campaign
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
            id: selectedCampaign.id
        };

        // Dispatch the async action to update the campaign
        dispatch(adminToBloger({ contentBody, TheToken }))
            .unwrap()
            .then(() => {
                getPendingBloggers()
                setVisible(false);
            })
            .catch((err) => {
                console.error('Error updating the campaign:', err);
            });
    };
    console.log(campaigns)
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
                                    <th scope="col">Client Email</th>
                                    <th scope="col">from</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaigns.map((campaign, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td className="d-flex align-self-center gap-1" onClick={() => getBlogger(campaign.blogerId)} style={{ cursor: 'pointer' }}>
                                            <img className="rounded-circle" src={campaign.blogerImage || avatar} alt="." width={25} />
                                            <p className="m-0">{campaign.blogerName || 'bloger Name'}</p>
                                        </td>
                                        <td>{campaign.createdBy || 'client mail'}</td>
                                        <td>{campaign.from || 'date'}</td>
                                        <td>
                                            <FaRegEdit
                                                size={25}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleCampaignClick(campaign)} // Set selected campaign and open modal
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Modal */}
                    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                                <CModalTitle>Edit Campaign Description</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            {selectedCampaign ? (
                                <form  >
                                    <div className="mb-3">
                                        <label htmlFor="content" className="form-label">
                                                Campaign Description
                                        </label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            id="content"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)} // Update content when edited
                                            style={{ height: '100px' }}
                                        />
                                    </div>
                                </form>
                            ) : (
                                <p>No campaign selected.</p>
                            )}
                        </CModalBody>
                        <CModalFooter>
                            <CButton type="submit" color="primary" onClick={handleFormSubmit}>
                                Save Changes
                            </CButton>
                            <CButton color="secondary" onClick={() => setVisible(false)}>
                                Close
                            </CButton>
                        </CModalFooter>
                    </CModal>
                </div>
            )}
        </div>
    );
}

export default Pending;
