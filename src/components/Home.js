import React from 'react'
import { auth } from "../firebase"
import "../style/home.css"
import img from '../back.jpg'
import out from '../out.png'

const Home = () => {
    return (
        <div className="back">
            <div className="home_img">
                <img src={img} />
            </div>
            <div className="head">
                <h1>E-Store Web Panel</h1>
            </div>

            <div className="body" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
                <div
                    style={{
                        backgroundColor: "#3b3a39",
                        opacity: "0.9",
                        borderRadius: "25px",
                        marginRight: "50px",
                        width: "20vw",
                        height: "30vh",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: "center"

                    }}>
                    <a href="/add-product" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '30px', color: "#f199b3" }}>Add Product</a>
                </div>

                <div
                    style={{
                        backgroundColor: "#3b3a39",
                        borderRadius: "25px",
                        opacity: "0.9",
                        width: "20vw",
                        height: "30vh",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: "center"
                    }}>
                    <a href="/inventory" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '30px', color: "#f199b3" }}>Inventory</a>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
                <div
                    style={{
                        backgroundColor: "#3b3a39",
                        borderRadius: "25px",
                        opacity: "0.9",

                        marginRight: "50px",
                        width: "20vw",
                        height: "30vh",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: "center"
                    }}>
                    <a href="/orders" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '30px', color: "#f199b3" }}>New Orders</a>
                </div>

                <div
                    style={{
                        backgroundColor: "#3b3a39",
                        borderRadius: "25px",
                        opacity: "0.9",
                        width: "20vw",
                        height: "30vh",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: "center"
                    }}>
                    <a style={{ textDecoration: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '30px', color: "white" }} onClick={() => { auth.signOut() }}>SignOut</a>
                </div>
            </div>

        </div>
    )
}

export default Home
