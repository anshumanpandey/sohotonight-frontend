import React, { useState, useEffect } from "react";
import useAxios from 'axios-hooks'
import DataTable from 'react-data-table-component';

export const UsersPage = () => {
  const [{ data, loading, error }, refetch] = useAxios({
    url: '/user/getUsers'
  }, { manual: true })

  useEffect(() => {
    refetch()
  },[])

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <DataTable
            progressPending={loading}
            data={data}
            pagination={true}
            columns={[
              { name: 'Name', selector: 'name' },
              { name: 'Email', selector: 'email' },
              { name: 'Mobile Number', selector: 'mobileNumber' },
              { name: 'Age', selector: 'age' },
              { name: 'Role', selector: 'role' },
              { name: 'Location', selector: 'location' },
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default UsersPage;
