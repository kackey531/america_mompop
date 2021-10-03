import React, { useState, useContext, useEffect } from "react";
import DefaultImage from "../../../assets/images/default.png";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Business-profile-edit.css";
import imageProfile from "../../../assets/images/profil_image.png";
import LocationAutoComplete from "../../location-auto-complete";
import UserContext from "../../../contexts/userContext";
import { callApi } from "../../../api/API";

const BusinessProfileEdit = ({ edit }) => {
  const { register, handleSubmit, errors, ...form } = useForm();
  const { userData, setUserData } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [calling, setCalling] = useState(false);
  const [bussinessProfile, setBussinessProfile] = useState('')
  const [coordinates, setCordinates] = useState({});
  const handleSubmitForm = async (payload) => { alert(userData.id);
    setCalling(true);
    if (payload.baddress === "") {
      payload.baddress = profile.bussiness.baddress;
    }
    payload["lat"] = coordinates.lat;
    payload["longitude"] = coordinates.long;
    console.log(payload);
    const userUpdate = await callApi(`/users/update/${userData.id}`,"PUT", payload,   "Bearer " + userData.token);
    if(userUpdate){
      setCalling(false);
      edit(false);
    }
    else{
      setCalling(false);
    }
  };

  const  fetchUserProfileApi = async ()=>{
    const result = await callApi(`/users/${userData.id}`,"GET", null,"Bearer " + userData.token);
    if(result){
      setProfile({ user: result[0], bussiness: result[1][0] });
    }
    else{
      //todo: show error message
    }
  }

  //--------------------------
  const onFileUplad = event => {
    var profileImage = event.target.files[0]
    setBussinessProfile(URL.createObjectURL(profileImage))
    var fileBody = {
      logoimg: profileImage,
      userid: userData.id
    }
    callApi('/users/updatelogo', 'POST', fileBody, "Bearer " + userData.token, 'file')
    .catch(err => {
      // console.log('file upload error', err)
    })
  }

  useEffect(() => {
    register({ name: "baddress" });
    fetchUserProfileApi();
    return () => {
      console.log("This will be logged on unmount");
    };
  }, []);

  return (
    <div className="business-profile-page col-12">
      <div className="d-flex flex-wrap flex-column justify-content-between align-items-start mb-2">
        <div className="col-12 d-flex flex-column align-items-center p-0">
          {profile && (
            <Form
              autoComplete="off"
              onSubmit={handleSubmit(handleSubmitForm)}
              className="create-details-form-container"
            >
              <div className="row">
                <div className="col-sm-12 d-flex flex-row align-items-center border-bottom px-0 py-3 mb-2">
                  {/*<a href=""*/}
                  {/*className="business-profile-image rounded-circle d-block overflow-hidden shadow">*/}
                  {/*<img src={DefaultImage} alt="" className="w-100 h-100 img-fluid"/>*/}
                  {/*</a>*/}
                  <div>
                    <div className="business-profile-image rounded-circle d-block overflow-hidden shadow position-relative">
                      <img
                        src={bussinessProfile}
                        alt=""
                        className="w-100 h-100 img-fluid"
                      />
                      <div className="position-absolute d-flex align-items-center justify-content-center overflow-hidden img-upload-container w-100 h-100">
                        {!bussinessProfile &&
                        <Button
                        variant="link"
                        className="text-decoration-none text-white shadow-none p-0"
                      >
                        <i className="icon-image" />
                      </Button>}
                      </div>
                      <input
                        type="file"
                        onChange={onFileUplad}
                        className="position-absolute img-upload w-100 h-100"
                      />
                    </div>
                  </div>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      autoComplete="chrome-off"
                      name="fname"
                      ref={register}
                      value={profile.bussiness.fname}
                      type="text"
                      className="input shadow-none font-weight-bold"
                      placeholder="First Name"
                      onChange={(e) => {
                        setProfile({
                          ...profile,
                          ["bussiness"]: {
                            ...profile.bussiness,
                            ["fname"]: e.target.value,
                          },
                        });
                      }}
                      disabled={edit ? "" : "disabled"}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      autoComplete="chrome-off"
                      name="lname"
                      ref={register}
                      value={profile.bussiness.lname}
                      type="text"
                      className="input shadow-none font-weight-bold mx-2"
                      placeholder="Last Name"
                      onChange={(e) => {
                        setProfile({
                          ...profile,
                          ["bussiness"]: {
                            ...profile.bussiness,
                            ["lname"]: e.target.value,
                          },
                        });
                      }}
                      disabled={edit ? "" : "disabled"}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      autoComplete="chrome-off"
                      name="email"
                      type="text"
                      ref={register}
                      value={profile.user.email}
                      className="input shadow-none mx-3 px-1"
                      placeholder="Email"
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          user: {
                            ...profile.user,
                            ["email"]: e.target.value,
                          },
                        })
                      }
                      disabled={edit ? "" : "disabled"}
                    />
                  </Form.Group>
                </div>

                <div className="col-12 d-flex align-items-center p-0">
                  <Form.Group
                    controlId="formBasicEmail"
                    className="w-100 input-with-icon position-relative"
                  >
                    <i className="icon-address-card business-profile-icon position-absolute" />
                    <Form.Control
                      name="description"
                      ref={register}
                      autoComplete="chrome-off"
                      type="text"
                      className="input shadow-none position-relative bg-transparent"
                      placeholder="Description"
                      value={profile.bussiness.description}
                      onChange={(e) => {
                        setProfile({
                          ...profile,
                          ["bussiness"]: {
                            ...profile.bussiness,
                            ["description"]: e.target.value,
                          },
                        });
                      }}
                      disabled={edit ? "" : "disabled"}
                    />
                  </Form.Group>
                </div>

                <div className="col-sm-12 d-flex flex-row align-items-center justify-content-center p-0">
                  <div className="row w-100">
                    <div className="col-sm-6 d-flex flex-wrap justify-content-between p-0">
                      <div className="col-sm-6 p-0">
                        <Form.Group
                          controlId="formBasicEmail"
                          className="input-with-icon position-relative mr-sm-3"
                        >
                          <i className="icon-phone business-profile-icon position-absolute" />
                          <Form.Control
                            name="phonenumber"
                            ref={register}
                            autoComplete="chrome-off"
                            type="text"
                            className="input shadow-none position-relative bg-transparent"
                            placeholder="Phone"
                            value={profile.bussiness.phonenumber}
                            onChange={(e) => {
                              setProfile({
                                ...profile,
                                ["bussiness"]: {
                                  ...profile.bussiness,
                                  ["phonenumber"]: e.target.value,
                                },
                              });
                            }}
                            disabled={edit ? "" : "disabled"}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-sm-6 p-0">
                        <Form.Group
                          controlId="formBasicEmail"
                          className="input-with-icon position-relative mr-sm-3"
                        >
                          <i className="icon-user business-profile-icon position-absolute" />
                          <Form.Control
                            name="bname"
                            ref={register}
                            autoComplete="chrome-off"
                            type="text"
                            className="input shadow-none position-relative bg-transparent"
                            placeholder="Business Name"
                            value={profile.bussiness.bname}
                            onChange={(e) => {
                              setProfile({
                                ...profile,
                                ["bussiness"]: {
                                  ...profile.bussiness,
                                  ["bname"]: e.target.value,
                                },
                              });
                            }}
                            disabled={edit ? "" : "disabled"}
                          />
                        </Form.Group>
                      </div>
                    </div>

                    <div className="col-sm-6 p-0 pl-1">
                      <Form.Group
                        controlId="formBasicEmail"
                        className="input-with-icon position-relative"
                      >
                        <i className="icon-globe  business-profile-icon position-absolute" />
                        <Form.Control
                          name="website"
                          ref={register}
                          autoComplete="off"
                          type="text"
                          className="input shadow-none orange-btn website position-relative bg-transparent"
                          placeholder="website"
                          value={profile.bussiness.website}
                          onChange={(e) => {
                            setProfile({
                              ...profile,
                              ["bussiness"]: {
                                ...profile.bussiness,
                                ["website"]: e.target.value,
                              },
                            });
                          }}
                          disabled={edit ? "" : "disabled"}
                        />
                      </Form.Group>
                    </div>
                  </div>
                </div>

                {userData && userData.btype === "offline" && (
                  <div className="col-12 d-flex align-items-center p-0">
                    <Form.Group
                      controlId="formBasicEmail"
                      className="w-100 input-with-icon position-relative"
                    >
                      <i className="icon-map-marker-alt  business-profile-icon position-absolute" />
                      <LocationAutoComplete
                        name="baddress"
                        form={form}
                        errors={errors}
                        getCoordinates={setCordinates}
                        placeholder={profile.bussiness.baddress}
                      />
                      {/* <Form.Control
                      name="baddress"
                      ref={register}
                      autoComplete="off"
                      type="text"
                      className="input shadow-none position-relative bg-transparent"
                      placeholder="Deal Address"
                      value={profile.bussiness.baddress}
                      onChange={(e) => {
                        setProfile({
                          ...profile,
                          ["bussiness"]: {
                            ...profile.bussiness,
                            ["baddress"]: e.target.value,
                          },
                        });
                      }}
                      disabled={edit ? "" : "disabled"}
                    /> */}
                    </Form.Group>
                  </div>
                )}

                <div className="col-12 d-flex align-items-center justify-content-between m-0 p-0 position-relative"></div>

                <div className="col-12 d-flex align-items-center justify-content-between p-0">
                  <Button
                    variant="link"
                    className="text-decoration-none shadow-none green-btn btn btn-link   ml-1 w-25"
                    type="submit"
                    disabled={calling}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileEdit;
