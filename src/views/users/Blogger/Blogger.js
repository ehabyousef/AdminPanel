import React from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from 'react-icons/md';
function Blogger() {
    return (
        <div class="container-fluid">
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
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>ehabyooo@gmail.com</td>
                            <td>@mdo</td>
                            <td>
                                <CiEdit />
                                <MdDeleteForever />
                            </td>
                            <td>
                                <Link className='text-decoration-none ' to='/users/profile'>
                                    <GrView size={25} color='#ff0000' />
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>ehabyooo@gmail.com</td>
                            <td>@fat</td>
                            <td>
                                <CiEdit />
                                <MdDeleteForever />
                            </td>
                            <td>
                                <Link className='text-decoration-none ' to='/users/profile'>
                                    <GrView size={25} color='#ff0000' />
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry the Bird</td>
                            <td>ehabyooo@gmail.com</td>
                            <td>@twitter</td>
                            <td>
                                <CiEdit />
                                <MdDeleteForever />
                            </td>
                            <td>
                                <Link className='text-decoration-none ' to='/users/profile'>
                                    <GrView size={25} color='#ff0000' />
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Blogger