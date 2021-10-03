import React, { useState } from "react";
import { Button } from "react-bootstrap";

import FormComponent from "./../../form-component";

import "./Create-details.css";

const CreateDetails = ({ publish }) => {
  const [edit, setEdit] = useState(true);
  const [page, setPage] = useState(true);
  const data = {
    dealName: "Largest Summer Cyber Monday Sale",
    servicePicture: "profil_image.png",
    originalPrice: "$500.00",
    discountedPrice: "$300.00",
    dealStartDate: "06/13/2020",
    dealEndDate: "06/13/2020",
    dealPublishDate: "06/13/2020",
    dealDescription: "Cheaper Than Black Friday iMac + Free 2 Day Shipping",
  };

  return (
    <div className="create-details-container">
      <header className="create-details-container__header d-flex align-content-center justify-content-between">
        <h2 className="create-details-container__header__title m-0 d-flex align-items-center">
          Create your first deal
        </h2>
        <Button
          onClick={() => publish("list")}
          variant="link"
          className="shadow-none text-decoration-none p-0"
        >
          <i style={{ color: "black" }} className="icon-close close-btn" />
        </Button>
      </header>
      <FormComponent edit={edit} data={data} page={page} publish={publish} />
    </div>
  );
};

export default CreateDetails;
