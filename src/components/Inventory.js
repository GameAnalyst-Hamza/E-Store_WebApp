import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { firestore } from "../firebase"
import "../style/home.css"


const Inventory = () => {

    const [product, setData] = useState([]);

    useEffect(() => {
        firestore
            .collection('products')
            .get()
            .then(snap => {
                const list = [];
                snap.forEach(pro => {
                    list.push({ ...pro.data() });
                });
                setData(list);
            });
    }, [])

    const del = (id) => {
        console.log(id)
        firestore.collection('products')
            .doc(id)
            .delete()
            .then(() => {
                window.location.reload(false);
            });
    }

    return (
        <div className="back">
            <div className="head">
                <h1>Inventory List</h1>
            </div>

            {
                product && product.map((data, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: '#a8a8a8',
                            marginTop: '60px',
                            marginLeft: '90px',
                            marginRight: '90px',
                            marginBottom: '60px',
                        }}>

                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={data.image_url} width="150" height="150" />
                            </div>
                            <div style={{ marginLeft: '40px' }}>
                                <p><span style={{ fontWeight: '700' }}>Brand Name:</span>{"  "}{data.storeName}</p>
                                <p><span style={{ fontWeight: '700' }}>Name:</span>{"  "}{data.productName}</p>
                                <p><span style={{ fontWeight: '700' }}>Price:</span>{"  "}{data.productPrice}{" Rs"}</p>
                                <p><span style={{ fontWeight: '700' }}>Tag:</span>{"  "}{data.productTag}</p>
                                <p><span style={{ fontWeight: '700' }}>Description:</span>{"  "}{data.productDes}</p>
                            </div>
                        </div>
                        <div style={{ float: 'right' }}>
                            <Button variant="danger" onClick={() => { del(data.id) }}>Delete</Button>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default Inventory
