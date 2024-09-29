import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clientPaid, paidCampagins } from '../../../redux/slices/AdminControl';
import { getAdmin } from '../../../redux/slices/GetUser';

function Paid() {
    const dispatch = useDispatch();
    const paidBlogger = useSelector(paidCampagins);
    const admin = useSelector(getAdmin);
    const adminId = admin.userOrBloger.id;
    console.log(adminId)
    useEffect(() => {
        dispatch(clientPaid({ id: adminId }))
    }, [dispatch])
    return (
        <div>Paid</div>
    )
}

export default Paid