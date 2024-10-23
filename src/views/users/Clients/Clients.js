import React, { useEffect, useState } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GrView } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../redux/slices/Bloggers';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getAdminLoged } from '../../../redux/slices/GetUser';
import Spinner from '../../../components/spinner/Spinner';
function Clients() {
    const { users, loading, error, page, size } = useSelector((state) => state.Bloggers);
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useDispatch();
    const TheToken = useSelector(getAdminLoged);
    useEffect(() => {
        dispatch(fetchUsers({ page: currentPage, size, TheToken }));
    }, [dispatch, currentPage, size]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value - 1);
    };
    return (
        <div className="container-fluid d-flex justify-content-center">
            {loading ?
                <div className="col-12 col-md-9 d-flex justify-content-center align-items-center text-center gap-3 h-100"><Spinner /></div>
                :
                (users.content.length === 0 ? 'no users available' :
                    <div className="col-12 col-md-9 d-flex flex-column gap-3 w-100">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Country</th>
                                        <th scope="col">Handle</th>
                                        <th scope="col">View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.content?.map((user, index) => (
                                        <tr key={index}>
                                            <th scope="row">1</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.country}</td>
                                            <td>
                                                <MdDeleteForever size={25} />
                                            </td>
                                            <td>
                                                <Link className='text-decoration-none ' to='/users/profile' state={user}>
                                                    <GrView size={25} color='#0000ff' />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <Stack spacing={2}>
                                <Pagination
                                    count={users?.totalPages}
                                    page={currentPage + 1}
                                    onChange={handlePageChange}
                                    showFirstButton
                                    showLastButton
                                    variant="outlined"
                                    shape="rounded"
                                    color="primary"
                                    style={{ margin: '1rem auto' }}
                                />
                            </Stack>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Clients