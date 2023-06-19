import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    chasisNumber: "",
    manufacturerCompany: "",
    manufactureYear: "",
    price: "",
    plateNumber: "",
    modelName: "",
    owner: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/vehicle/${id}`);
        setData(response.data);
      } catch (error) {
        console.log("Error retrieving vehicle:", error);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/vehicle/${id}`, data);
      navigate.push("/");
    } catch (error) {
      console.log("Error updating vehicle:", error);
      setError("Error updating vehicle. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4">Edit Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="chasisNumber" className="form-label">
            Chasis Number:
          </label>
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
          <label htmlFor="manufacturerCompany" className="form-label">
            Manufacturer Company:
          </label>
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
          <label htmlFor="manufactureYear" className="form-label">
            Manufacture Year:
          </label>
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
          <label htmlFor="price" className="form-label">
            Price:
          </label>
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
          <label htmlFor="plateNumber" className="form-label">
            Plate Number:
          </label>
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
          <label htmlFor="modelName" className="form-label">
            Model Name:
          </label>
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
            <label htmlFor="owner" className="form-label">
              Owner:
            </label>
            <input
              type="text"
              className="form-control"
              id="owner"
              name="owner"
              value={data.owner}
              onChange={handleChange}
            />
          </div>
          {error && <div className="text-danger">{error}</div>}
          <div className="mt-4">
            <button type="submit" className="btn btn-primary me-2">
              Update
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate.push("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  export default EditVehicle;

