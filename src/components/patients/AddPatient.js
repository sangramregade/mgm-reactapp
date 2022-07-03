import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faListNumeric, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import 'jquery/dist/jquery.min.js';
import $ from 'jquery';

const AddPatient = () => {

    const hsitory = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        site: "",
        phone: "",
        gender: "",
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

    const onSubmit = async e => {

        e.preventDefault();

        let response = await axios.post("http://localhost:3003/patients", formData);

        if (response) {
            alert("patient data submitted sucessfully.");
        } else {
            alert("Something went wrong");
        }

        hsitory("/");

        setFormData({
            name: "",
            age: "",
            site: "",
            phone: "",
            gender: "",
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

    };

    $(function () {
        $('#select-all').on("click", function () {
            var checked = this.checked;
            $('input[type="checkbox"]').each(function () {
                this.checked = checked;
            });
        })
    });

    //get currentLocation location
    const [currentLocation, setCurrent] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const getLocation = async e => {
            if (!navigator.geolocation) {
                setStatus('Geolocation is not supported by your browser');
                alert(status);
            } else {
                setStatus('Locating...');
                navigator.geolocation.getCurrentPosition((position) => {
                    setStatus(null);
                    let latitude = (position.coords.latitude);
                    let longitude = (position.coords.longitude);

                    const getAddressURL = "http://api.positionstack.com/v1/reverse?access_key=97d5129b423ebd5a56691a640e9bd7dc&query="

                    const Cordinates = (latitude + "," + longitude);

                    axios.get(getAddressURL + Cordinates)
                        .then(res => {

                            const addressArray = res.data;

                            for (var key in addressArray) {
                                const tempdata = (addressArray[key][0]["locality"]);
                                setCurrent(tempdata);
                            }
                        });

                }, () => {
                    setStatus('Unable to retrieve your location');
                    alert(status);
                });
            }
        }
        getLocation();
    }, []);

    return (
        <div className="container">
            <div className="card my-5" style={{ borderRadius: '1em' }}>
                <div className="card-body mt-2">
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="row">

                            <div className="col-12">

                                <div className="card mb-5 mx-4" style={{ borderRadius: '1em' }}>

                                    <div className="card-header text-center">
                                        <h4 className="my-2">Patient Personal Details</h4>
                                    </div>

                                    <div className="card-body pt-3">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">
                                                            <FontAwesomeIcon icon={faUser} />
                                                        </span>
                                                        <input type="text" className="form-control form-control-lg"
                                                            placeholder="Enter Name"
                                                            required
                                                            value={formData.name}
                                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text"><FontAwesomeIcon icon={faListNumeric} /></span>
                                                        <input type="text" className="form-control form-control-lg"
                                                            required
                                                            placeholder="Enter age" value={formData.age}
                                                            onChange={(e) => setFormData({
                                                                ...formData, age: e.target.value
                                                            })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group">
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text"><FontAwesomeIcon icon={faPhone} /></span>
                                                        <input
                                                            type="text"
                                                            required
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter Your Phone Number"
                                                            value={formData.phone}
                                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-5 pt-2">
                                                        <span className="input-group-text ps-5"> Selected Site &nbsp;&nbsp;&nbsp; <FontAwesomeIcon icon={faLocationDot} /> </span>
                                                    </div>
                                                    <div className="col-6 pt-2 text-center">
                                                        {currentLocation === "Mumbai" ?
                                                            <label className="btn btn btn-success">
                                                                <input
                                                                    type="radio"
                                                                    checked={formData.site = "Mumbai"}
                                                                    value="Mumbai"
                                                                    style={{ marginRight: '10px', textTransform: "uppercase" }}
                                                                    onChange={(e) => setFormData({ ...formData, site: e.target.value })}
                                                                    autoComplete="off" />
                                                                Mumbai
                                                            </label>
                                                            :
                                                            <label className="btn btn btn-success">
                                                                <input
                                                                    type="radio"
                                                                    checked={formData.site = "Banglore"}
                                                                    value="Banglore"
                                                                    style={{ marginRight: '10px' }}
                                                                    onChange={(e) => setFormData({ ...formData, site: e.target.value })}
                                                                    autoComplete="off" />
                                                                Banglore
                                                            </label>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row ms-1 me-2">
                                        <div className="col-6 text-center">
                                            <div className="card pb-2">
                                                <div className="card-header">Selcet Patient Gender</div>
                                                <div className="card-body">
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio"
                                                            checked={formData.gender === "male"}
                                                            value="male"
                                                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })} />
                                                        <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            checked={formData.gender === "female"}
                                                            value="female"
                                                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })} />
                                                        <label className="form-check-label"
                                                            htmlFor="inlineRadio2">Female</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            checked={formData.gender === "other"}
                                                            value="other"
                                                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })} />
                                                        <label className="form-check-label" htmlFor="inlineRadio3">other</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-6 text-center">
                                            <div className="card pb-2">
                                                <div className="card-header">Selcet Vaccine Type</div>
                                                <div className="card-body">
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            checked={formData.vaccine_name === "Covaxin"}
                                                            value="Covaxin"
                                                            onChange={(e) => setFormData({ ...formData, vaccine_name: e.target.value })} />
                                                        <label className="form-check-label"
                                                            htmlFor="inlineRadio1">Covaxin</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            checked={formData.vaccine_name === "Covishield"}
                                                            value="Covishield"
                                                            onChange={(e) => setFormData({ ...formData, vaccine_name: e.target.value })} />
                                                        <label className="form-check-label"
                                                            htmlFor="inlineRadio2">Covishield</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio"
                                                            checked={formData.vaccine_name === "NA"} value="NA"
                                                            onChange={(e) => setFormData({
                                                                ...formData, vaccine_name:
                                                                    e.target.value
                                                            })} />
                                                        <label className="form-check-label" htmlFor="inlineRadio3">NA</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row ms-1 me-2 pt-3">
                                        <div className="form-group">
                                            <div className="col-12 text-center">
                                                <div className="card pb-3">
                                                    <div className="card-header">Selcet Patient's Vaccination Status</div>
                                                    <div className="card-body mt-3">
                                                        <div className="form-check form-check-inline">
                                                            <input type="radio" className="btn-check"
                                                                name="options-outlined" id="success-outlined"
                                                                checked={formData.vaccination_status === "Fully Vaccinated"}
                                                                value="Fully Vaccinated" onChange={(e) => setFormData({
                                                                    ...formData, vaccination_status: e.target.value
                                                                })}
                                                                autoComplete="off" />
                                                            <label className="btn btn-outline-success"
                                                                htmlFor="success-outlined">Fully vaccinated</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input type="radio" className="btn-check"
                                                                checked={formData.vaccination_status === "Partially Vaccinated"
                                                                } value="Partially Vaccinated" onChange={(e) => setFormData({
                                                                    ...formData, vaccination_status: e.target.value
                                                                })}
                                                                name="options-outlined" id="warning-outlined" autoComplete="off" />
                                                            <label className="btn btn-outline-warning ms-5"
                                                                htmlFor="warning-outlined">Partially vaccinated</label>
                                                        </div>

                                                        <div className="form-check form-check-inline">
                                                            <input type="radio" className="btn-check"
                                                                checked={formData.vaccination_status === "Not Vaccinated"}
                                                                value="Not Vaccinated" onChange={(e) => setFormData({
                                                                    ...formData, vaccination_status: e.target.value
                                                                })}
                                                                name="options-outlined" id="danger-outlined" autoComplete="off" />
                                                            <label className="btn btn-outline-danger ms-5"
                                                                htmlFor="danger-outlined">Not vaccinated</label>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <br />
                                    <div className="row ms-1 me-2 pt-3">
                                        <div className="form-group">
                                            <div className="col-12">
                                                <div className="card pb-3">
                                                    <div className="card-header text-center">Select Current Symptoms</div>
                                                    <div className="card-body mt-3 text-center">
                                                        <div className="form-check form-check-inline" style={{ paddingRight: "50px" }} >
                                                            <input className="form-check-input " type="checkbox"
                                                                value="Headache" onChange={(e) => setFormData({ ...formData, symptomp_Headache: e.target.value })} id="inlineCheckbox1" />
                                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Headache</label>
                                                        </div>
                                                        <div className="form-check form-check-inline" style={{ paddingRight: "50px" }}>
                                                            <input className="form-check-input" type="checkbox"
                                                                value="Fatigue" onChange={(e) => setFormData({ ...formData, symptomp_Fatigue: e.target.value })} id="inlineCheckbox2" />
                                                            <label className="form-check-label" htmlFor="inlineCheckbox2">Fatigue</label>
                                                        </div>
                                                        <div className="form-check form-check-inline" style={{ paddingRight: "50px" }}>
                                                            <input className="form-check-input" type="checkbox"
                                                                value="Cough" onChange={(e) => setFormData({ ...formData, symptomp_Cough: e.target.value })} id="inlineCheckbox3" />
                                                            <label className="form-check-label" htmlFor="inlineCheckbox3">Cough</label>
                                                        </div>
                                                        <div className="form-check form-check-inline" style={{ paddingRight: "50px" }}>
                                                            <input className="form-check-input" type="checkbox"
                                                                value="Chest Pain" onClick={(e) => setFormData({ ...formData, symptomp_Chest_Pain: e.target.value })} id="inlineCheckbox4" />
                                                            <label className="form-check-label" htmlFor="inlineCheckbox4">Chest Pain</label>
                                                        </div>
                                                        <div className="form-check form-check-inline" style={{ paddingRight: "50px" }}>
                                                            <input className="form-check-input" type="checkbox"
                                                                value="Loss of Smell and Taste" onChange={(e) => setFormData({ ...formData, symptomp_Loss_of_Smell_Taste: e.target.value })} id="inlineCheckbox5" />
                                                            <label className="form-check-label" htmlFor="inlineCheckbox5">Loss of Smell and Taste</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="checkbox"
                                                                value="Shortness in breathing" onChange={(e) => setFormData({ ...formData, symptomp_Shortness_in_breathing: e.target.value })} id="inlineCheckbox6" />
                                                            <label className="form-check-label" htmlFor="inlineCheckbox6">Cough</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <br />

                                    <div className="row ms-1 me-2 pt-3">
                                        <div className="form-group">
                                            <div className="col-12 text-center">
                                                <div className="card pb-3">
                                                    <div className="card-header">Enter Any Medical History</div>
                                                    <div className="form-group">
                                                        <textarea className="form-control"
                                                            id="medical_history"
                                                            required
                                                            style={{ resize: 'none', border: 0, borderColor: 'transparent', height: '100%', borderRadius: 'none', overflow: 'auto' }}
                                                            value={formData.medical_history}
                                                            onChange={(e) => setFormData({ ...formData, medical_history: e.target.value })} rows="4"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-3 pt-5 pb-4 text-center" />
                                        <div className="col-3 pt-5 pb-4 text-center">
                                            <button className="btn btn-primary btn-block">Add Patient Data</button>
                                        </div>
                                        <div className="col-3 pt-5 pb-4 text-center">
                                            <Link className="btn btn-info" to="/">Cancel</Link>
                                        </div>
                                        <div className="col-3 pt-5 pb-4 text-center" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPatient;
