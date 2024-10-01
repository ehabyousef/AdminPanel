import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck, FaRegEdit } from 'react-icons/fa';
import { GrView } from 'react-icons/gr';
import { Link, useNavigate } from 'react-router-dom';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { adminToBloger, compeleteCampagin, compeleteCampagins, postCompeleteCampagin } from '../../../redux/slices/AdminControl';
import axios from 'axios';
import { getAdminLoged } from '../../../redux/slices/GetUser';

function Compeleted() {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [visibleEditModal, setVisibleEditModal] = useState(false); // For Edit Modal
  const [visibleConfirmModal, setVisibleConfirmModal] = useState(false); // For Confirmation Modal
  const [content, setContent] = useState(''); // For campaign content editing
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const TheToken = useSelector(getAdminLoged);
  const compeletedCamp = useSelector(compeleteCampagins);

  useEffect(() => {
    dispatch(compeleteCampagin({ TheToken }));
  }, [dispatch, TheToken]);

  // Handle when a campaign is clicked to edit its content
  const handleEditClick = (campaign) => {
    setSelectedCampaign(campaign);
    setContent(campaign.content || ''); // Set the initial content for editing
    setVisibleEditModal(true);
  };

  // Handle when a campaign is clicked to confirm approval
  const handleConfirmClick = (campaign) => {
    setSelectedCampaign(campaign);
    setVisibleConfirmModal(true); // Open confirmation modal
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
      blogerName: selectedCampaign.blogerName,
      blogerImage: selectedCampaign.blogerImage,
      clientStatus: selectedCampaign.clientStatus,
      blogerId: selectedCampaign.blogerId,
      clientId: selectedCampaign.clientId,
      adminApprovalClient: true,
      campaignUrl: selectedCampaign.campaignUrl,
      adminApprovalBlogerResponse: true,
      adminApprovalBloger: false,
      id: selectedCampaign.id,
      doneFromBloger: true
    };

    // Dispatch the async action to update the campaign
    dispatch(adminToBloger({ contentBody, TheToken }))
      .unwrap()
      .then(() => {
        dispatch(compeleteCampagin({ TheToken }));
        setVisibleEditModal(false); // Close modal after saving changes
      })
      .catch((err) => {
        console.error('Error updating the campaign:', err);
      });
  };

  // Handle confirmation of approval
  const handleConfirmApproval = () => {
    const contentBody = {
      ...selectedCampaign,
      doneFromBloger: true,
    };
    dispatch(postCompeleteCampagin({ contentBody, TheToken }))
      .unwrap()
      .then(() => {
        dispatch(compeleteCampagin({ TheToken }));
        setVisibleConfirmModal(false); // Close modal after approval
      })
      .catch((err) => {
        console.error('Error confirming the campaign:', err);
      });
  };

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="col-12 col-md-9 d-flex flex-column gap-3 w-100">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Blogger</th>
                <th scope="col">Client Email</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Handle</th>
                <th scope="col">View</th>
              </tr>
            </thead>
            <tbody>
              {compeletedCamp.length > 0 ? compeletedCamp.map((campaign, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td className="d-flex align-self-center gap-1" onClick={() => getBlogger(campaign.blogerId)} style={{ cursor: 'pointer' }}>
                    <img className="rounded-circle" src={campaign.blogerImage} alt="." width={25} />
                    <p className="m-0">{campaign.blogerName || 'Blogger Name'}</p>
                  </td>
                  <td>{campaign.createdBy || 'Client Email'}</td>
                  <td>{campaign.from || 'Date'}</td>
                  <td>{campaign.to || 'Date'}</td>
                  <td className='d-flex gap-1 align-items-center'>
                    <FaRegEdit
                      size={25}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleEditClick(campaign)} // Set selected campaign and open edit modal
                    />
                    <FaCheck
                      size={25}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleConfirmClick(campaign)} // Set selected campaign and open confirm modal
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

        {/* Edit Modal */}
        <CModal alignment="center" visible={visibleEditModal} onClose={() => setVisibleEditModal(false)}>
          <CModalHeader>
            <CModalTitle>Edit Campaign content</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {selectedCampaign ? (
              <form>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    Campaign content
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
            <CButton type="submit" color="success" onClick={handleFormSubmit}>
              Save Changes
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Confirmation Modal */}
        <CModal alignment="center" visible={visibleConfirmModal} onClose={() => setVisibleConfirmModal(false)}>
          <CModalHeader>
            <CModalTitle>Confirm Campaign Approval</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Are you sure you want to approve this campaign?
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleConfirmModal(false)}>
              Cancel
            </CButton>
            <CButton color="success" onClick={handleConfirmApproval}>
              Yes, Approve
            </CButton>
          </CModalFooter>
        </CModal>
      </div>
    </div>
  );
}

export default Compeleted;
