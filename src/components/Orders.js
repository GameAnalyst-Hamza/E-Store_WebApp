import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { firestore } from "../firebase"
import "../style/home.css"


const Orders = () => {

    const [orderList, setOrder] = useState([]);
    const [id, setId] = useState('');

    useEffect(() => {
        firestore.collection('orders').orderBy('Date', 'desc')
            .get()
            .then(snap => {
                const list = [];
                snap.forEach(pro => {
                    list.push({ ...pro.data() });
                });
                setOrder(list);
            });
    }, [])

    const orderShip = () => {
        console.log(id)

        // firestore.collection('orders').get()
        // .doc()
        // .delete()
        // .then(() => {
        //     console.log('User deleted!');
        // });
    }

    const del = (Da) => {
        console.log(Da)
        firestore.collection('orders').where('Date', '==', Da).get()
            .then(res => { res.docs.forEach(doc => { setId(doc.id) }) })
            .then(orderShip)
    }

    return (
        <div className="back">

            <div className="head">
                <h1>Orders List</h1>
            </div>

            {
                orderList && orderList.map((data, index) => (
                    <div
                        key={index}
                        style={{
                            // backgroundColor:'#e6e6e6', 
                            backgroundColor: '#a8a8a8',

                            marginTop: '50px',
                            marginLeft: '50px',
                            marginRight: '50px',
                            marginBottom: '30px',

                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ marginLeft: '70px', marginTop: '20px' }}>
                                <h4>Product Detail:</h4>
                                <p><span style={{ fontWeight: '700' }}>Brand Name:</span>{"  "}{data.Brand}</p>
                                <p><span style={{ fontWeight: '700' }}>Product Id:</span>{"  "}{data.productTag}</p>
                                <p><span style={{ fontWeight: '700' }}>Quantity:</span>{"  "}{data.quantity}</p>
                                <p><span style={{ fontWeight: '700' }}>Size:</span>{"  "}{data.size}</p>
                                <p><span style={{ fontWeight: '700' }}>Payment Method:</span>{"  "}{data.paymentMethod}</p>
                            </div>

                            <div style={{ marginRight: '70px', marginTop: '20px' }}>
                                <h4>Customer Detail:</h4>
                                <p><span style={{ fontWeight: '700' }}>Full Name:</span>{"  "}{data.name}</p>
                                <p><span style={{ fontWeight: '700' }}>Email:</span>{"  "}{data.email}</p>
                                <p><span style={{ fontWeight: '700' }}>Phone #:</span>{"  "}{data.phone}</p>
                                <p><span style={{ fontWeight: '700' }}>Address:</span>{"  "}{data.address}</p>
                            </div>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <p> <span style={{ fontWeight: '700', marginBottom: '20px' }}>Order Placed Date:</span>{"   "}{data.Date}</p>
                            {/* <Button variant="success" onClick={()=>{del(data.Date)}}>Order Shipped</Button> */}
                        </div>



                    </div>
                ))
            }

        </div>
    )
}

export default Orders
