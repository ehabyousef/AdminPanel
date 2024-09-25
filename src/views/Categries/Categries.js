import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, allCategories, deleteCategory, getAllCategories, updateCategory } from '../../redux/slices/AdminControl';
import avatar from '../../assets/images/avatars/2.jpg';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { FaRegEdit } from 'react-icons/fa';
import { cibAddthis, cilX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

function Categories() {
    const [visible, setVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false); // State for delete confirmation modal
    const [selectedCategory, setSelectedCategory] = useState(null);
    const categories = useSelector(allCategories);
    const dispatch = useDispatch();

    const [categoryData, setCategoryData] = useState({
        name: '',
        image: ''
    });
    const [image, setImage] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCategoryData(prev => ({
                    ...prev,
                    image: reader.result,
                }));
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCategoryClick = (category = null) => {
        if (category) {
            setSelectedCategory(category);
            setCategoryData({
                name: category.name,
                image: '',
            });
            setImage(category.image || '');
        } else {
            setSelectedCategory(null);
            setCategoryData({
                name: '',
                image: ''
            });
            setImage(null);
        }
        setVisible(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (selectedCategory) {
            dispatch(updateCategory({ id: selectedCategory.id, categoryData }));
        } else {
            dispatch(addCategory({ categoryData }));
        }
        setVisible(false);
    };

    // Function to open delete confirmation modal
    const handleDeleteClick = (category) => {
        setSelectedCategory(category);
        setDeleteModalVisible(true);
    };

    // Function to confirm deletion
    const confirmDelete = () => {
        if (selectedCategory) {
            dispatch(deleteCategory({ id: selectedCategory.id }));
        }
        setDeleteModalVisible(false);
        setSelectedCategory(null);
    };

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    return (
        <div className="container-fluid d-flex justify-content-center">
            <div className='d-flex flex-column gap-3 w-100 m-0 p-0'>
                {/* Add Category Button */}
                <div className='d-flex justify-content-end'>
                    <CIcon
                        icon={cibAddthis}
                        width={30}
                        style={{ cursor: 'pointer', color: '#888' }}
                        onClick={() => handleCategoryClick()} // Open modal for new category
                    />
                </div>

                {/* Categories Table */}
                <div className="col-12 col-md-9 d-flex flex-column gap-3 w-100">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(categories) && categories.length > 0 ? (
                                    categories.map((category, index) => (
                                        <tr key={index}>
                                            <th scope="row">{category.id}</th>
                                            <td>{category.name}</td>
                                            <td>
                                                <img className="rounded-circle" src={category.image || avatar} alt="." width={25} />
                                            </td>
                                            <td className='d-flex align-items-center gap-3 h-100 w-100'>
                                                <FaRegEdit
                                                    size={25}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleCategoryClick(category)} // Open modal for editing
                                                />
                                                <div onClick={() => handleDeleteClick(category)}>
                                                    <CIcon icon={cilX} style={{ color: 'red', fontWeight: 'bold', cursor: 'pointer' }} width={25} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">Loading categories or No categories available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Modal for Add/Edit Category */}
                    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                            <CModalTitle>
                                {selectedCategory ? 'Edit Category' : 'Add New Category'}
                            </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <form onSubmit={handleFormSubmit}>
                                <div className="mb-3 d-flex flex-column gap-2 justify-content-center">
                                    <label htmlFor="name" className="form-label">
                                        Category Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={categoryData.name}
                                        onChange={(e) => setCategoryData(prev => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))}
                                        required
                                        style={{ height: '60px' }}
                                    />

                                    <label htmlFor="image" className="form-label">Category Image</label>
                                    <input
                                        className="form-control"
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />

                                    {/* Optional Image Preview */}
                                    {image && <img src={image} alt="Preview" width={100} />}
                                </div>
                                <CButton type="submit" color="primary">
                                    {selectedCategory ? 'Save Changes' : 'Add Category'}
                                </CButton>
                            </form>
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="secondary" onClick={() => setVisible(false)}>
                                Close
                            </CButton>
                        </CModalFooter>
                    </CModal>

                    {/* Modal for Delete Confirmation */}
                    <CModal alignment="center" visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)}>
                        <CModalHeader>
                            <CModalTitle>Confirm Deletion</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <p>Are you sure you want to delete the category <strong>{selectedCategory ? selectedCategory.name : ''}</strong>?</p>
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="danger" onClick={confirmDelete}>
                                Delete
                            </CButton>
                            <CButton color="secondary" onClick={() => setDeleteModalVisible(false)}>
                                Cancel
                            </CButton>
                        </CModalFooter>
                    </CModal>
                </div>
            </div>
        </div>
    );
}

export default Categories;
