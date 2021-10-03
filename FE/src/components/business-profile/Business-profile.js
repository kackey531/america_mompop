import React, { useState } from "react";
import BlockHeader from "../../components/block-header";
import "./Business-profile.css";
import BusinessProfileView from "./business-profile-view/Business-profile-view";
import BusinessProfileEdit from "./business-profile-edit/Business-profile-edit";

const BusinessProfile = () => {
  const [isEdit, edit] = useState(false);

  return (
    <div>
      <BlockHeader
        title="Business profile"
        buttonText="Edit profile"
        buttonIcon="icon-pen"
        edit={isEdit}
        handler={() => edit(!isEdit)}
      />
      {!isEdit && <BusinessProfileView />}
      {isEdit && <BusinessProfileEdit edit={edit} />}
    </div>
  );
};

export default BusinessProfile;
