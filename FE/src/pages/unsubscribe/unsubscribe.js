import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory,useLocation } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import UserContext from "../../contexts/userContext";
const Unsubscribe = () => {
    const location = useLocation();
    const history = useHistory();
    useEffect(()=>{
        let query = queryString.parse(location.search);
        axios.post(
        process.env.REACT_APP_BASEURL + "/users/unsubscribed/",
        {
          userid: query.userid,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          
        }
      });

    },[]);
    return(
        <>
            <div className="logo-container">
        <div className=" col-xl-11 mx-auto">
          <div className="row flex-column flex-md-row">
            <section className="col-md-6">
              <h1 className="general-title">Unsubscribed</h1>
              <p className="description">
                You have been unsubcribe successfully
              </p>
              </section>
              </div>
              </div>
              </div>
        </>
    );
}
export default Unsubscribe;