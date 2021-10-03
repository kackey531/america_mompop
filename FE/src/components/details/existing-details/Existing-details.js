import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Existing-details.css";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import UserContext from "../../../contexts/userContext";
import Moment from "react-moment";
import DealContext from "../../../contexts/dealContext";
import { callApi } from "../../../api/API";
import { empty } from "object-path";

const ExistingDetails = ({
  isEmpty,
  setTotalLen,
  currentPage,
  pageSize,
  createDeal,
}) => {
  const history = useHistory();
  const [dealsData, setDealsData] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [currentDeleteId, setDeleteId] = useState(null);
  const [fetchApiCall, setFetchApicall] = useState({
    didCall: false,
    success: false,
    error: false,
  });
  const [noDeals, setNoDeals] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const { dealData, setDealData } = useContext(DealContext);

  const  fetchApi = async ()=> {
    setFetchApicall({
      didCall: true,
      success: false,
      error: false,
    });
    console.log("result = ");
    
    const result = await callApi(`/coupons/findbyusersweb/${userData.id}`, "GET",null,"Bearer " + userData.token);
    console.log(result);
    if(!empty(result)){
      console.log("result not empty");
      if(!result.length){
        setNoDeals(true);
          setFetchApicall({
            didCall: false,
            success: true,
            error: false,
          });
      }
      setFetchApicall({
        didCall: false,
        success: true,
        error: false,
      });
      setDealsData(result);
      setTotalLen(result.length);
    }
    else if(result.staus === 404){
      setNoDeals(true);
          setFetchApicall({
            didCall: false,
            success: true,
            error: false,
          });
    }else{
      setFetchApicall({
        didCall: false,
        success: false,
        error: true,
      });
    }
  }
  useEffect(() => {
    fetchApi();
  }, []);

  const couponDelete = async () => {
    const result = await callApi(`/coupons/delete/${currentDeleteId}`,"GET", null,"Bearer " + userData.token);
    if(result){
      setShowDelete(false);
        fetchApi();
    }
    else{
      return 0;
    }
  };

  const deleteDeal = async () => {
    const result = callApi(`/customers/delete/${currentDeleteId}`,"DELETE",null, "Bearer " + userData.token);
    if(result){
      window.location.reload();
    }
  };

  const couponEdit = async (row) => {
    history.push({
      pathname: "/deal-details",
      search: "?edit&id="+row._id,
      state: { detail: row },
    });
  };

  return (
    <div className="table-container flex-grow-1">
      {fetchApiCall.didCall && (
        <div className="text-center">
          <Loader type="Bars" color="#FF992E" />
          <p>Loading deals...</p>
        </div>
      )}
      {fetchApiCall.success && noDeals && (
        <div className="text-center" style={{ padding: "5%" }}>
          <p>You don't have deals yet</p>
          {userData.accountLinked !== undefined &&
            userData.accountLinked === "no" && (
              <p>Please setup your payment information to add deals</p>
            )}
          {userData.accountLinked !== undefined &&
            userData.accountLinked === "yes" && (
              <Button onClick={() => createDeal("details")}>
                Create your first deal
              </Button>
            )}
        </div>
      )}
      {fetchApiCall.success && !noDeals && (
        <Table responsive className="details-table border-0 m-0">
          <thead>
            <tr>
              <th className="align-left border-0">Deal name</th>
              <th className="align-middle border-0">Sales</th>
              <th className="align-middle border-0">Start Date</th>
              <th className="align-middle border-0">End Date</th>
              <th className="align-middle border-0">Options</th>
            </tr>
          </thead>
          <tbody>
            {dealsData.length && dealsData
              .slice((currentPage - 1) * pageSize, pageSize * currentPage)
              .map((row) => (
                <tr>
                  <td className="align-left bold-text">
                    <Link to="/deal-details" className="details-name">
                      {row.name} <i className="icon-eye"></i>
                    </Link>
                  </td>
                  <td className="align-middle bold-text">0</td>
                  <td className="align-middle bold-text">
                    <Moment format="MM/DD/YYYY">{row.startdate}</Moment>
                  </td>
                  <td className="align-middle bold-text">
                    <Moment format="MM/DD/YYYY">{row.enddate}</Moment>
                  </td>

                  <td className="align-middle">
                    <button
                      onClick={() => {
                        couponEdit(row);
                      }}
                      type="button"
                      className="btn table-icon-btn  border-left-0 border-right-0 border-bottom-0 bg-transparent shadow-none p-0"
                    >
                      <i className="icon-pen" />
                    </button>
                    <button
                      onClick={() => {
                        setShowDelete(true);
                        setDeleteId(row._id);
                      }}
                      type="button"
                      className="btn table-icon-btn  border-left-0 border-right-0 border-bottom-0 bg-transparent shadow-none p-0"
                    >
                      <i className="icon-close" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
      {fetchApiCall.error && (
        <div className="text-center" style={{ padding: "5%" }}>
          <p style={{ color: "red" }}>Problem loading deals</p>
          <Button onClick={() => fetchApi()}>Try again</Button>
        </div>
      )}
      <Modal centered show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header>
          <h5>Delete the deal</h5>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the deal?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => couponDelete()} variant="danger">
            Yes
          </Button>
          <Button onClick={() => setShowDelete(false)} variant="secondary">
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ExistingDetails;
