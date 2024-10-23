import React, { useEffect, useState } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GrView } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { fetchBlogs } from '../../../redux/slices/Bloggers';
import Spinner from '../../../components/spinner/Spinner';
import { motion } from 'framer-motion'
function Blogger() {
    const { blogs, loading, error, page, size } = useSelector((state) => state.Bloggers);
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBlogs({ page: currentPage, size }));
    }, [dispatch, currentPage, size]);


    const handlePageChange = (event, value) => {
        setCurrentPage(value - 1);
    };
    return (
        <div className="container-fluid d-flex justify-content-center">
            {loading ?
                <div className="col-12 col-md-9 d-flex justify-content-center align-items-center text-center gap-3 h-100"><Spinner /></div>
                :
                (blogs.content.length === 0 ? 'no bloggers available' :
                    <div className="col-12 col-md-9 d-flex flex-column justify-content-between gap-3 w-100" style={{ minHeight: '80vh' }}>
                        <motion.div
                            initial={{ y: '80px', opacity: .3, scale: .89, transition: { duration: 1 }, }}
                            animate={{ y: '0px', opacity: 1, scale: 1, transition: { duration: 1 }, }}
                            className="table-responsive">
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
                                    {blogs.content?.map((blog, index) => (
                                        <tr key={index}>
                                            <th scope="row">1</th>
                                            <td>{blog.name}</td>
                                            <td>{blog.email}</td>
                                            <td>{blog.countryOfResidence}</td>
                                            <td>
                                                <MdDeleteForever size={25} />
                                            </td>
                                            <td>
                                                <Link className='text-decoration-none ' to='/users/profile' state={blog}>
                                                    <motion.button
                                                        style={{ background: 'transparent', border: 'none', color: 'blue' }}
                                                        initial={{ opacity: 0.6 }}
                                                        whileHover={{
                                                            scale: 1.2,
                                                            transition: { duration: 1 },
                                                            color: '#00b2e5'
                                                        }}
                                                        whileTap={{ scale: 0.9 }}
                                                        whileInView={{ opacity: 1 }}>
                                                        <GrView size={25} />
                                                    </motion.button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                        <motion.div
                            initial={{ y: '-40px', scale: '.3', opacity: .1, scale: .89, transition: { duration: 1 } }}
                            animate={{ y: '0px', scale: '1', opacity: 1, scale: 1, transition: { duration: 1 } }}
                            className="row">
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
                        </motion.div>
                    </div>
                )
            }
        </div>
    )
}

export default Blogger