import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BikeDetails.css';

const BikeDetails = () => {
    let { id } = useParams();
    const [bike, setBike] = useState({});


    useEffect(() => {
        const url = `http://localhost:5000/inventory/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setBike(data));
    }, []);

    //Handle Delivered Button
    const handleDeliveredBtn = () => {
        const updateBike = { ...bike, quantity: bike.quantity - 1 };
        setBike(updateBike);

        //send to Server
        const url = `http://localhost:5000/inventory/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateBike)
        })
            .then(res => res.json())
            .then(result => {
                console.log('success', result);
            });
    };

    //Handle ReStock Form
    const handleReStock = (event) => {
        event.preventDefault();
        const newQuantity = + event.target.quantity.value;
        const updateBike = { ...bike, quantity: bike.quantity + newQuantity };
        setBike(updateBike);
        fetch(`http://localhost:5000/inventory/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateBike),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                alert("updateBike added successfully");
                event.target.reset();
            });
    };



    return (
        <div className='bikeDetails-cntainer w-50 mx-auto'>
            <div>
                <h2>Details of {bike.name}</h2>
                <div className='text-center bikeDetails-card'>
                    <img src={bike.img} width='300px' alt="" />
                    <div className='text-start'>
                        <h3>Manufectirer: {bike.manufecturer}</h3>
                        <h4 className='text-danger'>Price: {bike.price} BDT</h4>
                        <p>Quantity: {bike.quantity}</p>
                        <p>{bike.Description}</p>

                        <button onClick={() => handleDeliveredBtn(id)} className='btn btn-danger'>Delivered</button>
                    </div>
                </div>
            </div>
            <form onSubmit={handleReStock} className='d-flex align-items-center'>
                <input type="number" name="quantity" id="" />
                <input className='btn btn-success' type="submit" value="Re-Stock" />
            </form>
        </div>
    );
};

export default BikeDetails;