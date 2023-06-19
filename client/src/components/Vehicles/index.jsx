import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VehicleRegistration = () => {
  const [data, setData] = useState({
    chasisNumber: "",
    manufacturerCompany: "",
    manufactureYear: "",
    price: "",
    plateNumber: "",
    modelName: "",
    owner:"",
  });
  const [ error,setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/vehicle";
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
      <h2 className="mt-4">Vehicle Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="chasisNumber" className="form-label">Chasis Number:</label>
          <input
            type="text"
            className="form-control"
            id="chasisNumber"
            name="chasisNumber"
            value={data.chasisNumber}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="manufacturerCompany" className="form-label">Manufacturer Company:</label>
          <input
            type="text"
            className="form-control"
            id="manufacturerCompany"
            name="manufacturerCompany"
            value={data.manufacturerCompany}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="manufactureYear" className="form-label">Manufacture Year:</label>
          <input
            type="number"
            className="form-control"
            id="manufactureYear"
            name="manufactureYear"
            value={data.manufactureYear}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={data.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="plateNumber" className="form-label">Plate Number:</label>
          <input
            type="text"
            className="form-control"
            id="plateNumber"
            name="plateNumber"
            value={data.plateNumber}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="modelName" className="form-label">Model Name:</label>
          <input
            type="text"
            className="form-control"
            id="modelName"
            name="modelName"
            value={data.modelName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="owner" className="form-label">Owner</label>
          <input
            type="text"
            className="form-control"
            id="owner"
            name="owner"
            value={data.owner}
            onChange={handleChange}
          />
        </div>
        {error && <div>{error}</div>}
					
        <button type="submit" className="btn btn-primary">Register Vehicle</button>
        </form>
    </div>
  );
};

export default VehicleRegistration;
