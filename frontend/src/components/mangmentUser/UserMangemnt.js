import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../helpers/UserHelper";

const UserMangemnt = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getAllUsers();

      response.json().then((t) => {
        setUsers(t);
      });
    }
    fetchData();
  }, []);

  return <div>qwer</div>;
};

export default UserMangemnt;
