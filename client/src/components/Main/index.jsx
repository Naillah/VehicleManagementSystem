import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/vehicles");
        setVehicles(response.data.vehicles);
        console.log(response.data);
      } catch (error) {
        console.log("Error retrieving vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleDelete = async (vehicleId) => {
    try {
      await axios.delete(`http://localhost:8080/api/vehicle/${vehicleId}`);
      setVehicles(vehicles.filter((vehicle) => vehicle._id !== vehicleId));
    } catch (error) {
      console.log("Error deleting vehicle:", error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <h1 className="navbar-brand">VEHIFY</h1>
          </div>

          <button className="btn btn-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container mt-4">
        <h2 className="text-center mb-4">Registered Vehicles</h2>
        <div className="d-flex justify-content-end mb-4">
          <Link to="/create-vehicles" className="btn btn-dark">
            Add Vehicle
          </Link>
        </div>

        {vehicles && vehicles.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped mt-4">
              {/* Table headings */}
              <thead className="thead-dark bg-dark">
                <tr>
                  <th>Chasis Number</th>
                  <th>Manufacturer Company</th>
                  <th>Manufacture Year</th>
                  <th>Price</th>
                  <th>Plate Number</th>
                  <th>Model Name</th>
                  <th>Owner</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle._id} className="table-row">
                    <td>{vehicle.chasisNumber}</td>
                    <td>{vehicle.manufacturerCompany}</td>
                    <td>{vehicle.manufactureYear}</td>
                    <td>{vehicle.price}</td>
                    <td>{vehicle.plateNumber}</td>
                    <td>{vehicle.modelName}</td>
                    <td>{vehicle.owner && vehicle.owner.names}</td>
                    <td>
                      <Link
                        to={`/edit-vehicle/${vehicle._id}`}
                        className="btn btn-sm btn-primary me-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(vehicle._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
