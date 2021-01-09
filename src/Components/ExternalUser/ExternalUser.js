import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../../App.css";
import db from "../Firebase/firebase";

const ExternalUser = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [aadhar, setAadhar] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("users")
      .add({
        name: name,
        number: number,
        address: address,
        aadhar: aadhar
      })
      .then(() => {
        setLoader(false);
        alert("Your info has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setName("");
    setNumber("");
    setAddress("");
    setAadhar("");
  };

  const numChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e === '' || re.test(e)) {
      setNumber(e)
    }
  }

  const aadharChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e === '' || re.test(e)) {
      setAadhar(e)
    }
  }


  return (
    <div>
        <form className="form" onSubmit={handleSubmit}>

            <h1>Hello There.</h1>
            <h3>Please provide your information below.</h3>

            <label>Full Name</label>
            <input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label>Contact No.</label>
            <input
                placeholder="Contact No."
                type="text"
                value={number}
                onChange={(e) => numChange(e.target.value)}
            />

            <label>Full Address</label>
            <textarea
                placeholder="Full Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            ></textarea>

            <label>Aadhar No.</label>
            <input
                placeholder="Aadhar No."
                type="text"
                value={aadhar}
                onChange={(e) => aadharChange(e.target.value)}
            />

            <button
                type="submit"
                style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
            >
                Submit
            </button>
            <h5>Done with the registration?</h5>
            <Link to='/'>Home Page</Link>
        </form>
    </div>
    
  );
};

export default ExternalUser;