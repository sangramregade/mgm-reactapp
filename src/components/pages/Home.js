import React, { useState, useEffect } from "react";
import logo from '../medicine.gif';
import { Link } from "react-router-dom";
import axios from "axios";
import 'jquery/dist/jquery.min.js';
import $ from 'jquery';
//Datatable Modules
import 'datatables.net-bs5/js/dataTables.bootstrap5'

const Home = () => {

  const [patients, setUser] = useState([]);


  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    const result = await axios.get("http://localhost:3003/patients");
    setUser(result.data.reverse());

    //initialize datatable
    $(function () {
      $('#patientDataTable').DataTable({

        destroy: true,
        'columnDefs': [{
          'targets': [1, 3, 7], // column index (start from 0)
          'orderable': false, // set orderable false for selected columns
        }],

        initComplete: function () {
          this.api()
            .columns()
            .every(function () {
              var column = this;
              if ($(column.footer()).hasClass('select_search')) {
                var select = $('<select><option value=""></option></select>')
                  .appendTo($(column.footer()).empty())
                  .on('change', function () {
                    var val = $.fn.dataTable.util.escapeRegex($(this).val());
                    column.search(val ? '^' + val + '$' : '', true, false).draw();
                  });

                column.data().unique().sort().each(function (d, j) {
                  select.append('<option value="' + d + '">' + d + '</option>')
                });
              }
              else {
                var that = this;
                $('input', this.footer()).on('keyup change', function () {
                  that.search(this.value).draw();
                });

              }

            });
        },

      });
    });

  }

  const afterDelete = async () => {
    const result = await axios.get("http://localhost:3003/patients");
    setUser(result.data.reverse());
  }

  const deleteUser = async id => {
    await axios.delete(`http://localhost:3003/patients/${id}`);
    afterDelete();
  };



  return (

    <div className="content">
      <div className="container-fluid">
        <header className="text-center">
          <img src={logo} className="App-logo" alt="logo" style={{ height: '150px', width: '150px' }} />
          <h1>M.G. Memorial Hospital</h1>
        </header>
        <div className="card mb-5 mx-4 mt-5" style={{ borderRadius: '1em' }}>
          <div className="card-header text-center" style={{ backgroundColor:'#563d7c',color:'white' }}>
            <h4 className="my-2">Patients List</h4>
          </div>
          <div className="card-body pt-3">
            <table id="patientDataTable" className="table table-bordered pt-4 pb-4">
              <thead>
                <tr>
                  <th className="text-center">No</th>
                  <th className="text-center">Patient Name</th>
                  <th className="text-center">Age</th>
                  <th className="text-center">Gender</th>
                  <th className="text-center">Site</th>
                  <th className="text-center">Phone No</th>
                  <th className="text-center">Symptoms</th>
                  <th className="text-center">Vaccination Status</th>
                  <th className="text-center">Vaccine Name</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {patients.map((patient, index) => (
                  <tr>
                    <th scope="row" key={index}>{index + 1}</th>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.site}</td>
                    <td>{patient.phone}</td>
                    <td style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                      <span className="badge rounded-pill bg-dark text-center">{patient.symptomp_Headache}</span>  <span className="badge rounded-pill bg-dark text-center">{patient.symptomp_Cough}</span>  <span className="badge rounded-pill bg-dark text-center">{patient.symptomp_Fatigue}</span>  <span className="badge rounded-pill bg-dark text-center">{patient.symptomp_Chest_Pain}</span> <span className="badge rounded-pill bg-dark text-center">{patient.symptomp_Loss_of_Smell_Taste}</span> <span className="badge rounded-pill bg-dark text-center">{patient.symptomp_Shortness_in_breathing}</span>
                    </td>
                    <td>{
                      patient.vaccination_status === "Fully Vaccinated" ? <span className="badge rounded-pill bg-success text-center">{patient.vaccination_status}</span> :
                        patient.vaccination_status === "Partially Vaccinated" ? <span className="badge rounded-pill bg-warning text-center">{patient.vaccination_status}</span> :
                          <span className="badge rounded-pill bg-danger text-center">{patient.vaccination_status}</span>
                    }
                    </td>
                    <td>{patient.vaccine_name}</td>
                    <td className="text-center">
                      <Link className="btn btn-info me-3" to={`/patients/${patient.id}`}>View</Link>
                      <Link className="btn btn-warning me-3" to={`/patients/edit/${patient.id}`}>Edit</Link>
                      <Link className="btn btn-danger" to={'/'} onClick={() => deleteUser(patient.id)}>Delete </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="text-center">
                <tr>
                  <th className="" style={{ borderStyle: 'none' }}></th>
                  <th className="" style={{ borderStyle: 'none' }}></th>
                  <th className="" style={{ borderStyle: 'none' }}></th>
                  <th className="" style={{ borderStyle: 'none' }}></th>
                  <th className="select_search" style={{ borderStyle: 'none' }}>Select Site</th>
                  <th className="" style={{ borderStyle: 'none' }}></th>
                  <th className="" style={{ borderStyle: 'none' }}></th>
                  <th className="" style={{ borderStyle: 'none' }}></th>
                  <th className="" style={{ borderStyle: 'none' }}></th>
                  <th className="" style={{ borderStyle: 'none' }}></th>
                </tr>
              </tfoot>
            </table>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
