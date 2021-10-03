import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import UserContext from "../../../contexts/userContext";
import "./Details-empty.css";
import detailsImage from "./../../../assets/images/deals-illustration.svg";
const DetailsEmpty = ({ createDeal, ...props }) => {
  const { userData, setUserData } = useContext(UserContext);
  console.log("account linked ", userData.accountLinked);

  return (
    <div className="empty-details-container position-relative overflow-hidden flex-grow-1 mb-0">
      <div className="position-relative empty-details">
        <div className="empty-item bg-white align-items-center">
          <div className="empty-item__number">1.</div>
          <div className="empty-item__icon-orange">
            <i className="icon-image" />
          </div>
          <div className="empty-item__name text-truncate">
            Mom&Pop 3 Year Premium Membership
          </div>
          <div className="empty-item__price">$250.00</div>
          <div>
            <Button
              variant="link"
              className="empty-item__edit text-decoration-none shadow-none"
            >
              <i className="icon-pen" />
            </Button>
          </div>
        </div>
        <div className="empty-item bg-white align-items-center">
          <div className="empty-item__number">1.</div>
          <div className="empty-item__icon-green">
            <i className="icon-image" />
          </div>
          <div className="empty-item__name text-truncate">
            Mom&Pop 3 Year Premium Membership
          </div>
          <div className="empty-item__price">$250.00</div>
          <div>
            <Button
              variant="link"
              className="empty-item__edit text-decoration-none shadow-none"
            >
              <i className="icon-pen" />
            </Button>
          </div>
        </div>
        <firgure className="d-flex justify-content-end empty-details__image">
          <img src={detailsImage} className="w-50" alt="" />
        </firgure>
        <p className="empty-details__description text-center">
          Here you can view your active and past deals as well as the activity
          and sales reports on each of them.{" "}
        </p>
      </div>
      {userData.accountLinked !== undefined &&
        userData.accountLinked === "yes" && (
          <div className="d-flex justify-content-center">
            <Button
              variant="link"
              className="text-decoration-none shadow-none green-btn empty-details__btn w-auto"
              onClick={() => createDeal("details")}
              type="submit"
            >
              Create your first deal
            </Button>
          </div>
        )}
      {userData.accountLinked !== undefined && userData.accountLinked === "no" && (
        <div className="d-flex justify-content-center">
          <p style={{ color: "orange" }}>
            {" "}
            Setup payment information to create your first deal
          </p>
        </div>
      )}
    </div>
  );
};

export default DetailsEmpty;
