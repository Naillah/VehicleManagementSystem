import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {  useNavigate } from "react-router-dom";
const CarOwnerRegistration = () => {
  const [data, setData] = useState({
		names: "",
		email: "",
		phone: "",
		nationalId: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/owner";
			const { data: res } = await axios.post(url, data);
			navigate("/");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

  return (
    <div className="container">
      <h2 className="mt-4">Car Owner Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="names" className="form-label">Names:</label>
          <input
            type="text"
            className="form-control"
            id="names"
            name="names" 
            value={data.names}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email" 
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone:</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone" 
            value={data.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nationalId" className="form-label">National ID:</label>
          <input
            type="text"
            className="form-control"
            id="nationalId"
            name="nationalId" 
            value={data.nationalId}
            onChange={handleChange}
          />
          
        </div>
        {error && <div>{error}</div>}
					
        <button type="submit" className="btn btn-primary">Register Car Owner</button>
      </form>
    </div>
  );
};

export default CarOwnerRegistration;
