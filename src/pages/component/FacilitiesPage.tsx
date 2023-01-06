/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-shadow */
import { refetchQueries } from "refetch-queries";
import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_FACILITIES } from "../../graphql/facility/queries";
import {
  ADD_FACILITY,
  EDIT_FACILITY,
  DELETE_FACILITY,
} from "../../graphql/facility/mutations";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";

import DataModal from "../../components/reusable/DataModal";
import DataTable from "../../components/reusable/DataTable";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const FacilitiesPage = () => {
  const fieldsFacility = [
    {
      value: "placeName",
      label: "Place Name",
    },
    {
      value: "address1",
      label: "Address 1",
    },
    {
      value: "address2",
      label: "Address 2",
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
      value: "zipCode",
      label: "Zip Code",
    },
  ];

  const facilitiesColumns = [
    {
      id: "no",
      label: "No.",
      minWidth: 70,
    },
    { id: "placeName", label: "Place Name", minWidth: 200 },
    {
      id: "address1",
      label: "Address 1",
      minWidth: 200,
    },
    {
      id: "address2",
      label: "Address 2",
      minWidth: 200,
    },
    {
      id: "city",
      label: "City",
      minWidth: 200,
    },
    {
      id: "state",
      label: "State",
      minWidth: 100,
    },
    {
      id: "zipCode",
      label: "Zip Code",
      minWidth: 100,
    },
    {
      id: "edit",
      label: "Edit",
      minWidth: 100,
    },
    {
      id: "delete",
      label: "Delete",
      minWidth: 100,
    },
  ];

  let dataSearchParameterLowerCase = "";

  const [schoolCode, setSchoolCode] = React.useState("");
  const [placeName, setPlaceName] = React.useState("");
  const [address1, setAddress1] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");
  const [schoolCodeAsEdited, setSchoolCodeAsEdited] = React.useState("");
  const [placeNameAsEdited, setPlaceNameAsEdited] = React.useState("");
  const [address1AsEdited, setAddress1AsEdited] = React.useState("");
  const [address2AsEdited, setAddress2AsEdited] = React.useState("");
  const [cityAsEdited, setCityAsEdited] = React.useState("");
  const [stateAsEdited, setStateAsEdited] = React.useState("");
  const [zipCodeAsEdited, setZipCodeAsEdited] = React.useState("");
  const [wasQueryOfDataFacility, setWasQueryOfDataFacility] = React.useState(false);
  const [queryOfFacilitiesData, setQueryOfFacilitiesData] = React.useState([]);
  const [hasAllEntries, setHasAllEntries] = React.useState(false);
  const [fieldFacility, setFieldFacility] = React.useState("placeName");
  const [isDeleteFacility, setIsDeleteFacility] = React.useState(false);
  const [isEditFacility, setIsEditFacility] = React.useState(false);
  const [isAddFacility, setIsAddFacility] = React.useState(false);
  const [idOfRecordToBeDeletedFacility, setIdOfRecordToBeDeletedFacility] = React.useState("");
  const [rowEditDataFacility, setRowEditDataFacility] = React.useState({});
  const [rowDeleteDataFacility, setRowDeleteDataFacility] = React.useState({});
  const [recordRowObjectForUpdateFacility, setRecordRowObjectForUpdateFacility] =
    React.useState({
      id: String,
      schoolCode: String,
      placeName: String,
      address1: String,
      address2: String,
      city: String,
      state: String,
      zipCode: String,
    });
   
 

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSchoolCode("");
    setPlaceName("");
    setAddress1("");
    setAddress2("");
    setCity("");
    setState("");
    setZipCode("");

    setSchoolCodeAsEdited("");
    setPlaceNameAsEdited("");
    setAddress1AsEdited("");
    setAddress2AsEdited("");
    setCityAsEdited("");
    setStateAsEdited("");
    setZipCodeAsEdited("");
    setIsAddFacility(false);
    setIsEditFacility(false);
    setIsDeleteFacility(false);
  };

  
  const [
    createFacility,
    {
      loading: createFacilityLoading,
      error: createFacilityError,
      data: createFacilityData,
    },
  ] = useMutation(ADD_FACILITY, {
    refetchQueries: [{ query: GET_FACILITIES }, "Facilities"],
  });

  const [
    modifyFacility,
    {
      loading: modifyFacilityLoading,
      error: modifyFacilityError,
      data: modifyFacilityData,
    },
  ] = useMutation(EDIT_FACILITY, {
  
    update(cache, { data: { modifyFacility } }) {
      cache.modify({
        fields: {
          allFacilities(existingFacilities = []) {
            const newFacilityRef = cache.writeFragment({
              data: modifyFacility,
              fragment: gql`
                fragment ModifyFacility on Facility {
                  schoolCode
                  placeName
                  address1
                  address2
                  city
                  state
                  zipCode
                }
              `,
            });
            return [...existingFacilities, newFacilityRef];
          },
        },
      });
    },
  });

  const [
    deleteFacility,
    {
      loading: deleteFacilityLoading,
      error: deleteFacilityError,
      data: deleteFacilityData,
    },
  ] = useMutation(DELETE_FACILITY, {
    refetchQueries: [{ query: GET_FACILITIES }, "Facilities"],
  });

  const { loading, error, data } = useQuery(GET_FACILITIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;
  const { facilities } = data;

  const handleModifiedRecordFacility = () => {
    const updatedFacility = {
      id: recordRowObjectForUpdateFacility.id,
      schoolCode: schoolCodeAsEdited,
      placeName: placeNameAsEdited,
      address1: address1AsEdited,
      address2: address2AsEdited,
      directions: "None",
      city: cityAsEdited,
      state: stateAsEdited,
      zipCode: zipCodeAsEdited,
    };
    modifyFacility({
      variables: {
        input: updatedFacility,
      },
    });
    handleClose();
    setQueryOfFacilitiesData(facilities);
  };

  const handleAddRecord = () => {
    setIsDeleteFacility(false);
    setIsEditFacility(false);
    setIsAddFacility(true);
    handleOpen();
  };

  const handleRecordToBeDeletedFacility = (recID: string) => {
    const deleteFacilityID = {
      id: recID,
    };

    deleteFacility({
      variables: {
        input: deleteFacilityID,
      },
    });
    handleClose();
  };



  const handleProcessRecordFacility = () => {
    if (isEditFacility) {
      handleModifiedRecordFacility();
    } else if (isDeleteFacility)
    {
      handleRecordToBeDeletedFacility(idOfRecordToBeDeletedFacility); 
    } else {
      try {
        const newFacility = {
          schoolCode,
          placeName,
          address1,
          address2,
          directions: "None",
          city,
          state,
          zipCode,
        };
        createFacility({
          variables: {
            input: newFacility,
          },
        });
        handleClose();
        // handleSearchQueryBasedOnCurrentFieldStored();
      } catch (error) {
        alert("There were input error(s)!");
      }
    }
  };

  const setFacilityDataAsEdited = (e: any) => {
    // if (schoolCode.length === 0
    //     || placeName.length === 0
    //     || address1.length === 0
    //     || address2.length === 0
    //     || city.length === 0
    //     || state.length === 0
    //     || zipCode.length === 0)
    // {
    //   setHasAllEntries(false);
    // } else {
    //   setHasAllEntries(true);
    // }

    switch (e.target.id) {
    case "schoolCode":
      setSchoolCodeAsEdited(e.target.value);
      break;
    case "placeName":
      setPlaceNameAsEdited(e.target.value);
      break;
    case "address1":
      setAddress1AsEdited(e.target.value);
      break;
    case "address2":
      setAddress2AsEdited(e.target.value);
      break;
    case "city":
      setCityAsEdited(e.target.value);
      break;
    case "state":
      setStateAsEdited(e.target.value);
      break;
    case "zipCode":
      setZipCodeAsEdited(e.target.value);
      break;
    }
  };

  const setFacilityData = (e: any) => {
    // if (schoolCode.length === 0
    //     || placeName.length === 0
    //     || address1.length === 0
    //     || address2.length === 0
    //     || city.length === 0
    //     || state.length === 0
    //     || zipCode.length === 0)
    // {
    //   setHasAllEntries(false);
    // } else {
    //   setHasAllEntries(true);
    // }
    switch (e.target.id) {
    case "schoolCode":
      setSchoolCode(e.target.value);
      break;
    case "placeName":
      setPlaceName(e.target.value);
      break;
    case "address1":
      setAddress1(e.target.value);
      break;
    case "address2":
      setAddress2(e.target.value);
      break;
    case "city":
      setCity(e.target.value);
      break;
    case "state":
      setState(e.target.value);
      break;
    case "zipCode":
      setZipCode(e.target.value);
      break;
      
    }
  };


  const handleValueChangedAsEditedFacility = (e: any) => {
    setFacilityDataAsEdited(e);
  };

  
  const handleEditRecordFacility = (row: any) => {
    setRecordRowObjectForUpdateFacility(row);
    setIsEditFacility(true);
    setIsDeleteFacility(false);
    setIsAddFacility(false);
    setRowEditDataFacility(row);
    setSchoolCodeAsEdited(row.schoolCode);
    setPlaceNameAsEdited(row.placeName);
    setAddress1AsEdited(row.address1);
    setAddress2AsEdited(row.address2);
    setCityAsEdited(row.city);
    setStateAsEdited(row.state);
    setZipCodeAsEdited(row.zipCode);
    handleOpen();
  };

  const handleDeleteRecordFacility = (row: any) => {
    setIsDeleteFacility(true);
    setIsEditFacility(false);
    setIsAddFacility(false);
    setRowDeleteDataFacility(row);
    setIdOfRecordToBeDeletedFacility(row.id);
    handleOpen();
  };

  const handleChangeFieldFacility = (event: any) => {
    setFieldFacility(event.target.value);
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

  
  const handleSearchQueryFacility = (e: any) => {
    const dataStringSearch = e.target.value;
    if (dataStringSearch === "") {
      setWasQueryOfDataFacility(false);
    } else {
      dataSearchParameterLowerCase = dataStringSearch.toLowerCase();
      const queriedFacilities = facilities.filter((facility: any) => {
        return facility[fieldFacility]
          .toLowerCase()
          .includes(dataSearchParameterLowerCase.toLowerCase());
      });
      // facilities = queriedFacilities;
      setQueryOfFacilitiesData(queriedFacilities);
      setWasQueryOfDataFacility(true);
    }
  };

  const savingProgress = () =>  <p style={{color: "green"}}>Saving...</p>;
  const updateProgress = () =>  <p style={{color: "green"}}>Updating...</p>;
  const deleteProgress = () =>  <p style={{color: "red"}}>Deleting...</p>;
  
 

  return (
    <>
     
      <Typography variant="h6">Facilities</Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField label="Search..." onChange={(e) => handleSearchQueryFacility(e)} />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <TextField
              id="select-field-query"
              select
              value={fieldFacility}
              label="Field"
              onChange={handleChangeFieldFacility}
              helperText="Please select your query field"
            >
              {fieldsFacility.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>
      </Box>

      {
        (createFacilityLoading && savingProgress())
      }

      {
        (modifyFacilityLoading && updateProgress())
      }

      {
        (deleteFacilityLoading && deleteProgress())
      }

      <DataModal
        open={open}
        isAdd={isAddFacility}
        isEdit={isEditFacility}
        isDelete={isDeleteFacility}
        handleClose={handleClose}
        handleProcessRecord={handleProcessRecordFacility}
        handleValueChanged={setFacilityData}
        handleValueChangedAsEdited={handleValueChangedAsEditedFacility}
        recordRowObjectForUpdate={recordRowObjectForUpdateFacility}
        rowDeleteData={rowDeleteDataFacility}
        columns={facilitiesColumns}
        rowEditData={rowEditDataFacility}
        hasAllEntries={hasAllEntries}
        maintenanceOptionTitle={"Facility"}
      />

      <DataTable
        arrayOfData={!wasQueryOfDataFacility ? facilities : queryOfFacilitiesData}
        columns={facilitiesColumns}
        handleEditRecord={(row: any) => handleEditRecordFacility(row)}
        handleDeleteRecord={(row: any) => handleDeleteRecordFacility(row)}
       
      />

      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={() => handleAddRecord()}>
          Add Facility
        </Button>
      </Box>
    </>
  );
};

export default FacilitiesPage;
