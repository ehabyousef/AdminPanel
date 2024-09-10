import React, { useEffect, useState } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GrView } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { fetchBlogs } from '../../../redux/slices/Bloggers';
function Blogger() {
    const { blogs, loading, error, page, size } = useSelector((state) => state.Bloggers);
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBlogs({ page: currentPage, size }));
    }, [dispatch, currentPage, size]);

    console.log(blogs);
    const handlePageChange = (event, value) => {
        setCurrentPage(value - 1);
    };
    return (
        <div class="container-fluid d-flex justify-content-center">
            {loading ?
                <div className="col-12 col-md-9 d-flex justify-content-center align-items-center text-center gap-3 h-100">loading...</div>
                :
                <div className="col-12 col-md-9 d-flex flex-column gap-3">
                    <div class="table-responsive">
                        <table class="table table-striped">
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
                                {blogs.content?.map((blog, index) => (
                                    <tr key={index}>
                                        <th scope="row">1</th>
                                        <td>{blog.name}</td>
                                        <td>{blog.email}</td>
                                        <td>{blog.countryOfResidence}</td>
                                        <td>
                                            <CiEdit />
                                            <MdDeleteForever />
                                        </td>
                                        <td>
                                            <Link className='text-decoration-none ' to='/users/profile' state={blog}>
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
                                count={blogs?.totalPages}
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
            }
        </div>
    )
}

export default Blogger