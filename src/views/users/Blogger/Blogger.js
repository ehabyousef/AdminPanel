import React from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from 'react-icons/md';
function Blogger() {
    return (
        <div>
            <table class="table table-responsive table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">email</th>
                        <th scope="col">country</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>
                            <CiEdit />
                            <MdDeleteForever />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>
                            <CiEdit />
                            <MdDeleteForever />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td >Larry the Bird</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                        <td>
                            <CiEdit />
                            <MdDeleteForever />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Blogger