/* eslint-disable @typescript-eslint/no-shadow */
import * as React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_OFFICIALS } from "../../graphql/official/queries";
import {
  ADD_OFFICIAL,
  EDIT_OFFICIAL,
  DELETE_OFFICIAL,
} from "../../graphql/official/mutations";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";

import DataModal from "../../components/reusable/DataModal";
import DataTable from "../../components/reusable/DataTable";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const OfficialsPage = () => {
  const fieldsOfficial = [
    {
      value: "lastName",
      label: "Last Name",
    },
    {
      value: "firstName",
      label: "First Name",
    },
    {
      value: "address",
      label: "Address",
    },
    {
      value: "homePhone",
      label: "Home Phone",
    },
    {
      value: "workPhone",
      label: "Work Phone",
    },
    {
      value: "cellPhone",
      label: "Cell Phone",
    },
    {
      value: "email",
      label: "Email",
    },
    {
      value: "zip",
      label: "Zip Code",
    },
    {
      value: "ssn",
      label: "SS No.",
    },
  ];

  const officialsColumns = [
    {
      id: "no",
      label: "No.",
      minWidth: 50,
    },
    { id: "lastName", label: "Last Name", minWidth: 150 },
    {
      id: "firstName",
      label: "First Name",
      minWidth: 150,
    },
    {
      id: "address",
      label: "Address",
      minWidth: 150,
    },
    {
      id: "homePhone",
      label: "Home Phone",
      minWidth: 150,
    },
    {
      id: "workPhone",
      label: "Work Phone",
      minWidth: 150,
    },
    {
      id: "cellPhone",
      label: "Cell Phone",
      minWidth: 150,
    },
    {
      id: "email",
      label: "Email",
      minWidth: 150,
    },
    {
      id: "zip",
      label: "Zip",
      minWidth: 80,
    },
    {
      id: "ssn",
      label: "SS No.",
      minWidth: 120,
    },
    {
      id: "edit",
      label: "Edit",
      minWidth: 50,
    },
    {
      id: "delete",
      label: "Delete",
      minWidth: 50,
    },
  ];

  let dataSearchParameterLowerCase = "";

  const [schoolCode, setSchoolCode] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [homePhone, setHomePhone] = React.useState("");
  const [workPhone, setWorkPhone] = React.useState("");
  const [cellPhone, setCellPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [ssn, setSSN] = React.useState("");
  const [schoolCodeAsEdited, setSchoolCodeAsEdited] = React.useState("");
  const [lastNameAsEdited, setLastNameAsEdited] = React.useState("");
  const [firstNameAsEdited, setFirstNameAsEdited] = React.useState("");
  const [addressAsEdited, setAddressAsEdited] = React.useState("");
  const [homePhoneAsEdited, setHomePhoneAsEdited] = React.useState("");
  const [workPhoneAsEdited, setWorkPhoneAsEdited] = React.useState("");
  const [cellPhoneAsEdited, setCellPhoneAsEdited] = React.useState("");
  const [emailAsEdited, setEmailAsEdited] = React.useState("");
  const [zipAsEdited, setZipAsEdited] = React.useState("");
  const [ssnAsEdited, setSSNAsEdited] = React.useState("");
  
  const [wasQueryOfDataOfficial, setWasQueryOfDataOfficial] = React.useState(false);
  const [queryOfOfficialsData, setQueryOfOfficialsData] = React.useState([]);
  const [hasAllEntries, setHasAllEntries] = React.useState(false);
  const [fieldOfficial, setFieldOfficial] = React.useState("lastName");
  const [isDeleteOfficial, setIsDeleteOfficial] = React.useState(false);
  const [isEditOfficial, setIsEditOfficial] = React.useState(false);
  const [isAddOfficial, setIsAddOfficial] = React.useState(false);
  const [idOfRecordToBeDeletedOfficial, setIdOfRecordToBeDeletedOfficial] = React.useState("");
  const [rowEditDataOfficial, setRowEditDataOfficial] = React.useState({});
  const [rowDeleteDataOfficial, setRowDeleteDataOfficial] = React.useState({});
  const [recordRowObjectForUpdateOfficial, setRecordRowObjectForUpdateOfficial] =
    React.useState({
      id: String,
      schoolCode: String,
      lastName: String,
      firstName: String,
      address: String,
      homePhone: String,
      workPhone: String,
      cellPhone: String,
      email: String,
      zip: String,
      ssn: String,
    });
 

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSchoolCode("");
    setLastName("");
    setFirstName("");
    setAddress("");
    setHomePhone("");
    setWorkPhone("");
    setCellPhone("");
    setEmail("");
    setZip("");
    setSSN("");

    setSchoolCodeAsEdited("");
    setLastNameAsEdited("");
    setFirstNameAsEdited("");
    setAddressAsEdited("");
    setHomePhoneAsEdited("");
    setWorkPhoneAsEdited("");
    setCellPhoneAsEdited("");
    setEmailAsEdited("");
    setZipAsEdited("");
    setSSNAsEdited("");
    setIsAddOfficial(false);
    setIsEditOfficial(false);
    setIsDeleteOfficial(false);
  };

  const [
    createOfficial,
    {
      loading: createOfficialLoading,
      error: createOfficialError,
      data: createOfficialData,
    },
  ] = useMutation(ADD_OFFICIAL, {
    refetchQueries: [{ query: GET_OFFICIALS }, "Officials"],
  });

  const [
    modifyOfficial,
    {
      loading: modifyOfficialLoading,
      error: modifyOfficialError,
      data: modifyOfficialData,
    },
  ] = useMutation(EDIT_OFFICIAL, {
    update(cache, { data: { modifyOfficial } }) {
      cache.modify({
        fields: {
          allOfficials(existingOfficials = []) {
            const newOfficialRef = cache.writeFragment({
              data: modifyOfficial,
              fragment: gql`
                fragment ModifyOfficial on Official {
                  schoolCode
                  lastName
                  firstName
                  address
                  homePhone
                  workPhone
                  cellPhone
                  email
                  zip
                  ssn
                }
              `,
            });
            return [...existingOfficials, newOfficialRef];
          },
        },
      });
    },
  });

  const [
    deleteOfficial,
    {
      loading: deleteOfficialLoading,
      error: deleteOfficialError,
      data: deleteOfficialData,
    },
  ] = useMutation(DELETE_OFFICIAL, {
    refetchQueries: [{ query: GET_OFFICIALS }, "Officials"],
  });

  const { loading, error, data } = useQuery(GET_OFFICIALS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;
  const { officials } = data;

  const handleModifiedRecordOfficial = () => {
    const updatedOfficial = {
      id: recordRowObjectForUpdateOfficial.id,
      schoolCode: schoolCodeAsEdited,
      lastName: lastNameAsEdited,
      firstName: firstNameAsEdited,
      address: addressAsEdited,
      homePhone: homePhoneAsEdited,
      workPhone: workPhoneAsEdited,
      cellPhone: cellPhoneAsEdited,
      email: emailAsEdited,
      zip: zipAsEdited,
      ssn: ssnAsEdited
    };
    modifyOfficial({
      variables: {
        input: updatedOfficial,
      },
    });
    handleClose();
  };

  const handleAddRecord = () => {
    setIsDeleteOfficial(false);
    setIsEditOfficial(false);
    setIsAddOfficial(true);
    handleOpen();
  };

  const handleRecordToBeDeletedOfficial = (recID: string) => {
    const deleteOfficialID = {
      id: recID,
    };

    deleteOfficial({
      variables: {
        input: deleteOfficialID,
      },
    });
    handleClose();
  };



  const handleProcessRecordOfficial = () => {
    if (isEditOfficial) {
      handleModifiedRecordOfficial();
    } else if (isDeleteOfficial)
    {
      handleRecordToBeDeletedOfficial(idOfRecordToBeDeletedOfficial); 
    } else {
      try {
        const newOfficial = {
          schoolCode,
          lastName,
          firstName,
          address,
          homePhone,
          workPhone,
          cellPhone,
          email,
          zip,
          ssn
        };
        createOfficial({
          variables: {
            input: newOfficial,
          },
        });
        handleClose();
        // handleSearchQueryBasedOnCurrentFieldStored();
      } catch (error) {
        alert("There were input error(s)!");
      }
    }
  };

  const setOfficialDataAsEdited = (e: any) => {
    switch (e.target.id) {
    case "schoolCode":
      setSchoolCodeAsEdited(e.target.value);
      break;
    case "lastName":
      setLastNameAsEdited(e.target.value);
      break;
    case "firstName":
      setFirstNameAsEdited(e.target.value);
      break;  
    case "address":
      setAddressAsEdited(e.target.value);
      break;
    case "homePhone":
      setHomePhoneAsEdited(e.target.value);
      break;
    case "workPhone":
      setWorkPhoneAsEdited(e.target.value);
      break;
    case "cellPhone":
      setCellPhoneAsEdited(e.target.value);
      break;      
    case "email":
      setEmailAsEdited(e.target.value);
      break;
    case "zip":
      setZipAsEdited(e.target.value);
      break;
    case "ssn":
      setSSNAsEdited(e.target.value);
      break;
    }
  };

  const setOfficialData = (e: any) => {
    switch (e.target.id) {
    case "schoolCode":
      setSchoolCode(e.target.value);
      break;
    case "lastName":
      setLastName(e.target.value);
      break;
    case "firstName":
      setFirstName(e.target.value);
      break;  
    case "address":
      setAddress(e.target.value);
      break;
    case "homePhone":
      setHomePhone(e.target.value);
      break;
    case "workPhone":
      setWorkPhone(e.target.value);
      break;
    case "cellPhone":
      setCellPhone(e.target.value);
      break;      
    case "email":
      setEmail(e.target.value);
      break;
    case "zip":
      setZip(e.target.value);
      break;
    case "ssn":
      setSSN(e.target.value);
      break;
      
    }
  };


  const handleValueChangedAsEditedOfficial = (e: any) => {
    setOfficialDataAsEdited(e);
  };

  
  const handleEditRecordOfficial = (row: any) => {
    setRecordRowObjectForUpdateOfficial(row);
    setIsEditOfficial(true);
    setIsDeleteOfficial(false);
    setIsAddOfficial(false);
    setRowEditDataOfficial(row);
    setSchoolCodeAsEdited(row.schoolCode);
    setLastNameAsEdited(row.lastName);
    setFirstNameAsEdited(row.firstName);
    setAddressAsEdited(row.address);
    setHomePhoneAsEdited(row.homePhone);
    setWorkPhoneAsEdited(row.workPhone);
    setCellPhoneAsEdited(row.cellPhone);
    setEmailAsEdited(row.email);
    setZipAsEdited(row.zip);
    setSSNAsEdited(row.ssn);
    handleOpen();
  };

  const handleDeleteRecordOfficial = (row: any) => {
    setIsDeleteOfficial(true);
    setIsEditOfficial(false);
    setIsAddOfficial(false);
    setRowDeleteDataOfficial(row);
    setIdOfRecordToBeDeletedOfficial(row.id);
    handleOpen();
  };

  const handleChangeFieldOfficial = (event: any) => {
    setFieldOfficial(event.target.value);
    // handleSearchQueryBasedOnCurrentFieldStored();
  };

  // const handleSearchQueryBasedOnCurrentFieldStored = () => {
  //   const queriedFacilities = facilities.filter((facility: any) => {
  //     return facility[field]
  //       .toLowerCase()
  //       .includes(dataSearchParameterLowerCase.toLowerCase());
  //   });
  //   setQueryOfFacilitiesData(queriedFacilities);
  //   setWasQueryOfData(true);
  // };

  
  const handleSearchQueryOfficial = (e: any) => {
    const dataStringSearch = e.target.value;
    if (dataStringSearch === "") {
      setWasQueryOfDataOfficial(false);
    } else {
      dataSearchParameterLowerCase = dataStringSearch.toLowerCase();
      const queriedOfficials = officials.filter((official: any) => {
        return official[fieldOfficial]
          .toLowerCase()
          .includes(dataSearchParameterLowerCase.toLowerCase());
      });
      // facilities = queriedFacilities;
      setQueryOfOfficialsData(queriedOfficials);
      setWasQueryOfDataOfficial(true);
    }
  };

  const savingProgress = () =>  <p style={{color: "green"}}>Saving...</p>;
  const updateProgress = () =>  <p style={{color: "green"}}>Updating...</p>;
  const deleteProgress = () =>  <p style={{color: "red"}}>Deleting...</p>;
  
 

  return (
    <>
     
      <Typography variant="h6">Officials</Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField label="Search..." onChange={(e) => handleSearchQueryOfficial(e)} />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <TextField
              id="select-field-query"
              select
              value={fieldOfficial}
              label="Field"
              onChange={handleChangeFieldOfficial}
              helperText="Please select your query field"
            >
              {fieldsOfficial.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>
      </Box>

      {
        (createOfficialLoading && savingProgress())
      }

      {
        (modifyOfficialLoading && updateProgress())
      }

      {
        (deleteOfficialLoading && deleteProgress())
      }

      <DataModal
        open={open}
        isAdd={isAddOfficial}
        isEdit={isEditOfficial}
        isDelete={isDeleteOfficial}
        handleClose={handleClose}
        handleProcessRecord={handleProcessRecordOfficial}
        handleValueChanged={setOfficialData}
        handleValueChangedAsEdited={handleValueChangedAsEditedOfficial}
        recordRowObjectForUpdate={recordRowObjectForUpdateOfficial}
        rowDeleteData={rowDeleteDataOfficial}
        columns={officialsColumns}
        rowEditData={rowEditDataOfficial}
        hasAllEntries={hasAllEntries}
        maintenanceOptionTitle={"Official"}
      />

      <DataTable
        arrayOfData={!wasQueryOfDataOfficial ? officials : queryOfOfficialsData}
        columns={officialsColumns}
        handleEditRecord={(row: any) => handleEditRecordOfficial(row)}
        handleDeleteRecord={(row: any) => handleDeleteRecordOfficial(row)}
       
      />

      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={() => handleAddRecord()}>
          Add Official
        </Button>
      </Box>
    </>
  );
};

export default OfficialsPage;
