import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewPaient = () => {

  const [patientData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    gender: "",
    site: "",
    vaccine_name: "",
    vaccination_status: "",
    medical_history: "",
    symptomp_Headache: "",
    symptomp_Cough: "",
    symptomp_Fatigue: "",
    symptomp_Chest_Pain: "",
    symptomp_Loss_of_Smell_Taste: "",
    symptomp_Shortness_in_breathing: ""
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:3003/patients/${id}`);
    setFormData(res.data);
  };

  return (

    <div className="container">
      <div className="card mt-5" style={{ borderRadius: '1em' }}>

        <div className="card-header text-center" style={{ backgroundColor: '#8a9a5b' }}>
          <h3 className="my-2"> Patient Details</h3>
        </div>
        <div className="card-body mt-3">
          <div className="row no-gutters">

            <div className="col-8">
              <div className="card mb-4 mx-4" style={{ borderRadius: '1em' }}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-4"><p className="mb-0 ms-5">Name</p></div>
                    <div className="col-sm-8"><p className="text-muted mb-0">{patientData.name}</p></div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-4"><p className="mb-0 ms-5">Age</p></div>
                    <div className="col-sm-8"><p className="text-muted mb-0">{patientData.age}</p></div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-4"><p className="mb-0 ms-5">Gender</p></div>
                    <div className="col-sm-8"><p className="text-muted mb-0">{patientData.gender}</p></div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-4"><p className="mb-0 ms-5">Site</p></div>
                    <div className="col-sm-8"><p className="text-muted mb-0">{patientData.site}</p></div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-4"><p className="mb-0 ms-5">Phone</p></div>
                    <div className="col-sm-8"><p className="text-muted mb-0">{patientData.phone}</p></div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-4"><p className="mb-0 ms-5">Symptoms History</p></div>
                    <div className="col-sm-8">
                      <p className="text-muted mb-0 pb-3">
                          <span className="badge rounded-pill bg-dark text-center me-3">{patientData.symptomp_Headache}</span> 
                          <span className="badge rounded-pill bg-dark text-center me-3">{patientData.symptomp_Cough}</span> 
                          <span className="badge rounded-pill bg-dark text-center me-3">{patientData.symptomp_Fatigue}</span>
                          <span className="badge rounded-pill bg-dark text-center me-3">{patientData.symptomp_Chest_Pain}</span>  
                          <span className="badge rounded-pill bg-dark text-center me-3 mb-3">{patientData.symptomp_Loss_of_Smell_Taste}</span>
                          <span className="badge rounded-pill bg-dark text-center me-3 ">{patientData.symptomp_Shortness_in_breathing}</span>
                      </p> 
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-4"><p className="mb-0 ms-5">Medical History</p></div>
                    <div className="col-sm-8"><p className="text-muted mb-0">{patientData.medical_history}</p></div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="card mb-3 mx-3" style={{ borderRadius: '1em' }} >
                <div className="card-header text-center">
                  <h5 className="my-2">Vaccination Details</h5>
                </div>
                <div className="card-body text-center">
                  <div className="row">
                    <div className="col-sm-6"><p className="mb-0">Vaccination Status</p></div>
                    <div className="col-sm-6">
                      {
                        patientData.vaccination_status === "Fully Vaccinated" ? <p className="badge rounded-pill bg-success text-center" style={{ textTransform: "uppercase" }}>{patientData.vaccination_status}</p> :
                          patientData.vaccination_status === "Partially Vaccinated" ? <p className="badge rounded-pill bg-warning text-center" style={{ textTransform: "uppercase" }}>{patientData.vaccination_status}</p> :
                            <p className="badge rounded-pill bg-danger text-center" style={{ textTransform: "uppercase" }}>{patientData.vaccination_status}</p>
                      }
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-6"><p className="mb-0">Vaccine  Name</p></div>
                    <div className="col-sm-6">
                      {
                        patientData.vaccine_name === "Covaxin" ?
                          <p className="badge rounded-pill text-center" style={{ textTransform: "uppercase", backgroundColor: "#74C3FF" }}>{patientData.vaccine_name}</p> :
                          <p className="badge rounded-pill text-center" style={{ textTransform: "uppercase", backgroundColor: "#20B2AA" }}>{patientData.vaccine_name}</p>
                      }
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-12 text-center">
            <Link to="/" className="btn btn-info" style={{ color:'white' }}><b>CLOSE</b></Link>
          </div>
        </div>
      </div>


    </div>

  );
};

export default ViewPaient;
