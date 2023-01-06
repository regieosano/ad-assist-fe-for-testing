/* eslint-disable @typescript-eslint/no-shadow */
import * as React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_OPPONENTS } from "../../graphql/opponent/queries";
import {
  ADD_OPPONENT,
  EDIT_OPPONENT,
  DELETE_OPPONENT,
} from "../../graphql/opponent/mutations";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";

import DataModal from "../../components/reusable/DataModal";
import DataTable from "../../components/reusable/DataTable";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const OpponentsPage = () => {
  const fieldsOpponent = [
    {
      value: "schoolName",
      label: "School Name",
    },
    {
      value: "address",
      label: "Address",
    },
    {
      value: "city",
      label: "City",
    },
    {
      value: "state",
      label: "State",
    },
    {
      value: "zip",
      label: "Zip Code",
    },
    {
      value: "adName",
      label: "Ad Name",
    },
    {
      value: "email",
      label: "Email",
    },
    {
      value: "phone",
      label: "Phone",
    },
  ];

  const opponentsColumns = [
    {
      id: "no",
      label: "No.",
      minWidth: 50,
    },
    { id: "schoolName", label: "School Name", minWidth: 180 },
    {
      id: "address",
      label: "Address",
      minWidth: 200,
    },
    {
      id: "city",
      label: "City",
      minWidth: 150,
    },
    {
      id: "state",
      label: "State",
      minWidth: 130,
    },
    {
      id: "zip",
      label: "Zip Code",
      minWidth: 130,
    },
    {
      id: "adName",
      label: "Ad Name",
      minWidth: 150,
    },
    {
      id: "email",
      label: "Email",
      minWidth: 150,
    },
    {
      id: "phone",
      label: "Phone",
      minWidth: 150,
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
  const [schoolName, setSchoolName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [adName, setAdName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
 
  const [schoolCodeAsEdited, setSchoolCodeAsEdited] = React.useState("");
  const [schoolNameAsEdited, setSchoolNameAsEdited] = React.useState("");
  const [addressAsEdited, setAddressAsEdited] = React.useState("");
  const [cityAsEdited, setCityAsEdited] = React.useState("");
  const [stateAsEdited, setStateAsEdited] = React.useState("");
  const [zipAsEdited, setZipAsEdited] = React.useState("");
  const [adNameAsEdited, setAdNameAsEdited] = React.useState("");
  const [emailAsEdited, setEmailAsEdited] = React.useState("");
  const [phoneAsEdited, setPhoneAsEdited] = React.useState("");
  
  const [wasQueryOfDataOpponent, setWasQueryOfDataOpponent] = React.useState(false);
  const [queryOfOpponentsData, setQueryOfOpponentsData] = React.useState([]);
  const [hasAllEntries, setHasAllEntries] = React.useState(false);
  const [fieldOpponent, setFieldOpponent] = React.useState("schoolName");
  const [isDeleteOpponent, setIsDeleteOpponent] = React.useState(false);
  const [isEditOpponent, setIsEditOpponent] = React.useState(false);
  const [isAddOpponent, setIsAddOpponent] = React.useState(false);
  const [idOfRecordToBeDeletedOpponent, setIdOfRecordToBeDeletedOpponent] = React.useState("");
  const [rowEditDataOpponent, setRowEditDataOpponent] = React.useState({});
  const [rowDeleteDataOpponent, setRowDeleteDataOpponent] = React.useState({});
  const [recordRowObjectForUpdateOpponent, setRecordRowObjectForUpdateOpponent] =
    React.useState({
      id: String,
      schoolCode: String,
      schoolName: String,
      address: String,
      city: String,
      state: String,
      zip: String,
      adName: String,
      email: String,
      phone: String
    });
 

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSchoolCode("");
    setSchoolName("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setAdName("");
    setEmail("");
    setPhone("");
   
    setSchoolCodeAsEdited("");
    setSchoolNameAsEdited("");
    setAddressAsEdited("");
    setCityAsEdited("");
    setStateAsEdited("");
    setZipAsEdited("");
    setAdNameAsEdited("");
    setEmailAsEdited("");
    setPhoneAsEdited("");

    setIsAddOpponent(false);
    setIsEditOpponent(false);
    setIsDeleteOpponent(false);
  };

  const [
    createOpponent,
    {
      loading: createOpponentLoading,
      error: createOpponentError,
      data: createOpponentData,
    },
  ] = useMutation(ADD_OPPONENT, {
    refetchQueries: [{ query: GET_OPPONENTS }, "Opponents"],
  });

  const [
    modifyOpponent,
    {
      loading: modifyOpponentLoading,
      error: modifyOpponentError,
      data: modifyOpponentData,
    },
  ] = useMutation(EDIT_OPPONENT, {
    update(cache, { data: { modifyOpponent } }) {
      cache.modify({
        fields: {
          allOpponents(existingOpponents = []) {
            const newOpponentRef = cache.writeFragment({
              data: modifyOpponent,
              fragment: gql`
                fragment ModifyOpponent on Opponent {
                  schoolCode
                  schoolName
                  address
                  city
                  state
                  zip
                  adName
                  email
                  phone
                }
              `,
            });
            return [...existingOpponents, newOpponentRef];
          },
        },
      });
    },
  });

  const [
    deleteOpponent,
    {
      loading: deleteOpponentLoading,
      error: deleteOpponentError,
      data: deleteOpponentData,
    },
  ] = useMutation(DELETE_OPPONENT, {
    refetchQueries: [{ query: GET_OPPONENTS }, "Opponents"],
  });

  const { loading, error, data } = useQuery(GET_OPPONENTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;
  const { opponents } = data;

  const handleModifiedRecordOpponent = () => {
    const updatedOpponent = {
      id: recordRowObjectForUpdateOpponent.id,
      schoolCode: schoolCodeAsEdited,
      schoolName: schoolNameAsEdited,
      address: addressAsEdited,
      city: cityAsEdited,
      state: stateAsEdited,
      zip: zipAsEdited,
      adName: adNameAsEdited,
      email: emailAsEdited,
      phone: phoneAsEdited
    };
    modifyOpponent({
      variables: {
        input: updatedOpponent,
      },
    });
    handleClose();
  };

  const handleAddRecord = () => {
    setIsDeleteOpponent(false);
    setIsEditOpponent(false);
    setIsAddOpponent(true);
    handleOpen();
  };

  const handleRecordToBeDeletedOpponent = (recID: string) => {
    const deleteOpponentID = {
      id: recID,
    };

    deleteOpponent({
      variables: {
        input: deleteOpponentID,
      },
    });
    handleClose();
  };



  const handleProcessRecordOpponent = () => {
    if (isEditOpponent) {
      handleModifiedRecordOpponent();
    } else if (isDeleteOpponent)
    {
      handleRecordToBeDeletedOpponent(idOfRecordToBeDeletedOpponent); 
    } else {
      try {
        const newOpponent = {
          schoolCode,
          schoolName,
          address,
          city,
          state,
          zip,
          adName,
          email,
          phone
        };
        createOpponent({
          variables: {
            input: newOpponent,
          },
        });
        handleClose();
        // handleSearchQueryBasedOnCurrentFieldStored();
      } catch (error) {
        alert("There were input error(s)!");
      }
    }
  };

  const setOpponentDataAsEdited = (e: any) => {
    switch (e.target.id) {
    case "schoolCode":
      setSchoolCodeAsEdited(e.target.value);
      break;
    case "schoolName":
      setSchoolNameAsEdited(e.target.value);
      break;
    case "address":
      setAddressAsEdited(e.target.value);
      break;
    case "city":
      setCityAsEdited(e.target.value);
      break;
    case "state":
      setStateAsEdited(e.target.value);
      break;
    case "zip":
      setZipAsEdited(e.target.value);
      break;
    case "adName":
      setAdNameAsEdited(e.target.value);
      break;        
    case "email":
      setEmailAsEdited(e.target.value);
      break;
    case "phone":
      setPhoneAsEdited(e.target.value);
      break;
    }
  };

  const setOpponentData = (e: any) => {
    switch (e.target.id) {
    case "schoolCode":
      setSchoolCode(e.target.value);
      break;
    case "schoolName":
      setSchoolName(e.target.value);
      break;
    case "address":
      setAddress(e.target.value);
      break;
    case "city":
      setCity(e.target.value);
      break;
    case "state":
      setState(e.target.value);
      break;
    case "zip":
      setZip(e.target.value);
      break;
    case "adName":
      setAdName(e.target.value);
      break;        
    case "email":
      setEmail(e.target.value);
      break;
    case "phone":
      setPhone(e.target.value);
      break;
    }
  };


  const handleValueChangedAsEditedOpponent = (e: any) => {
    setOpponentDataAsEdited(e);
  };

  
  const handleEditRecordOpponent = (row: any) => {
    setRecordRowObjectForUpdateOpponent(row);
    setIsEditOpponent(true);
    setIsDeleteOpponent(false);
    setIsAddOpponent(false);
    setRowEditDataOpponent(row);
    setSchoolCodeAsEdited(row.schoolCode);
    setSchoolNameAsEdited(row.schoolName);
    setAddressAsEdited(row.address);
    setCityAsEdited(row.city);
    setStateAsEdited(row.state);
    setZipAsEdited(row.zip);
    setAdNameAsEdited(row.adName);
    setEmailAsEdited(row.email);
    setPhoneAsEdited(row.phone);
    handleOpen();
  };

  const handleDeleteRecordOpponent = (row: any) => {
    setIsDeleteOpponent(true);
    setIsEditOpponent(false);
    setIsAddOpponent(false);
    setRowDeleteDataOpponent(row);
    setIdOfRecordToBeDeletedOpponent(row.id);
    handleOpen();
  };

  const handleChangeFieldOpponent = (event: any) => {
    setFieldOpponent(event.target.value);
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

  
  const handleSearchQueryOpponent = (e: any) => {
    const dataStringSearch = e.target.value;
    if (dataStringSearch === "") {
      setWasQueryOfDataOpponent(false);
    } else {
      dataSearchParameterLowerCase = dataStringSearch.toLowerCase();
      const queriedOpponents = opponents.filter((opponent: any) => {
        return opponent[fieldOpponent]
          .toLowerCase()
          .includes(dataSearchParameterLowerCase.toLowerCase());
      });
      setQueryOfOpponentsData(queriedOpponents);
      setWasQueryOfDataOpponent(true);
    }
  };

  const savingProgress = () =>  <p style={{color: "green"}}>Saving...</p>;
  const updateProgress = () =>  <p style={{color: "green"}}>Updating...</p>;
  const deleteProgress = () =>  <p style={{color: "red"}}>Deleting...</p>;
  
 

  return (
    <>
     
      <Typography variant="h6">Opponents</Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField label="Search..." onChange={(e) => handleSearchQueryOpponent(e)} />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <TextField
              id="select-field-query"
              select
              value={fieldOpponent}
              label="Field"
              onChange={handleChangeFieldOpponent}
              helperText="Please select your query field"
            >
              {fieldsOpponent.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>
      </Box>

      {
        (createOpponentLoading && savingProgress())
      }

      {
        (modifyOpponentLoading && updateProgress())
      }

      {
        (deleteOpponentLoading && deleteProgress())
      }

      <DataModal
        open={open}
        isAdd={isAddOpponent}
        isEdit={isEditOpponent}
        isDelete={isDeleteOpponent}
        handleClose={handleClose}
        handleProcessRecord={handleProcessRecordOpponent}
        handleValueChanged={setOpponentData}
        handleValueChangedAsEdited={handleValueChangedAsEditedOpponent}
        recordRowObjectForUpdate={recordRowObjectForUpdateOpponent}
        rowDeleteData={rowDeleteDataOpponent}
        columns={opponentsColumns}
        rowEditData={rowEditDataOpponent}
        hasAllEntries={hasAllEntries}
        maintenanceOptionTitle={"Opponent"}
      />

      <DataTable
        arrayOfData={!wasQueryOfDataOpponent ? opponents : queryOfOpponentsData}
        columns={opponentsColumns}
        handleEditRecord={(row: any) => handleEditRecordOpponent(row)}
        handleDeleteRecord={(row: any) => handleDeleteRecordOpponent(row)}
       
      />

      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={() => handleAddRecord()}>
          Add Opponent
        </Button>
      </Box>
    </>
  );
};

export default OpponentsPage;
