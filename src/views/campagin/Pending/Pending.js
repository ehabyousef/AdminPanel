import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import { GrView } from 'react-icons/gr';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../../../assets/images/avatars/1.jpg';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
function Pending() {
    const [loading, setLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(null); // State to hold the selected campaign
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate();
    const getPendingBloggers = () => {
        setLoading(true);
        axios.get('http://92.113.26.138:8081/api/admin/campaign/to-bloger', {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGdtYWlsLmNvbSIsImlhdCI6MTcyNzAzNzU3OH0.qniheG9oh3ZJw94BaaxIhVI2ojEDJz30T-unVRZ6QQs`,
            },
        }).then((response) => {
            setCampaigns(response.data);
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            console.log(err);
        });
    };

    useEffect(() => {
        getPendingBloggers();
    }, []);
    const handleCampaignClick = (campaign) => {
        setSelectedCampaign(campaign);
        setVisible(!visible)
    };
    const getBlogger = async (id) => {
        try {
            const response = await axios.get(
                `http://92.113.26.138:8081/api/bloger/${id}`
            );
            navigate("/users/profile", { state: response.data });
            console.log(response.data)
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="container-fluid d-flex justify-content-center">
            {loading ? (
                <div className="col-12 col-md-9 d-flex justify-content-center align-items-center text-center gap-3 h-100">Loading...</div>
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
                                {campaigns.map((campaign, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td className='d-flex align-self-center gap-1' onClick={() => getBlogger(campaign.blogerId)} style={{ cursor: "pointer" }}>
                                            <img className="rounded-circle" src={campaign.avatar || avatar} alt="." width={25} />
                                            <p className="m-0">{campaign.blogerId}</p>
                                        </td>
                                        <td>{campaign.clientId}</td>
                                        <td>
                                            <FaRegEdit
                                                size={25}
                                                style={{ cursor: 'pointer' }}
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
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
                            <CModalTitle>Modal title</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            {selectedCampaign ? (
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="bloggerId" className="form-label">campaign Type</label>
                                        <input type="text" className="form-control" id="bloggerId" value={selectedCampaign.campaignType} readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="clientId" className="form-label">campaign Description</label>
                                        <input type="text" className="form-control" id="clientId" value={selectedCampaign.campaignDescription} readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">campaign content</label>
                                        <textarea className="form-control" id="description" rows="3" defaultValue={selectedCampaign.content || 'No content'} />
                                    </div>
                                </form>
                            ) : (
                                <p>No campaign selected.</p>
                            )}
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="secondary" onClick={() => setVisible(false)}>
                                Close
                            </CButton>
                            <CButton color="primary">Save changes</CButton>
                        </CModalFooter>
                    </CModal>
                </div>
            )}
        </div>
    );
}

export default Pending;
