import React, { useEffect, useState } from "react";
import { getEmailStorage } from "../helpers/HelperLocalStorage";
import { getUserByEmail } from "../helpers/UserHelper";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const email = getEmailStorage();
    getUserByEmail(email, setUserDetails);
  }, []);

  return (
    <div>
      <p>id: {userDetails.id}</p>
      <p>name: {userDetails.firstName}</p>
      <p>surname: {userDetails.lastName}</p>
      <p>email: {userDetails.email}</p>
      <p>rola: {userDetails.userRole}</p>
    </div>
  );
};

export default UserDetails;
