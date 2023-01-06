/* eslint-disable @typescript-eslint/no-shadow */
import * as React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PREPARATIONS } from "../../graphql/preparation/queries";
import {
  ADD_PREPARATION,
  DELETE_PREPARATION,
} from "../../graphql/preparation/mutations";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";

import DataModal from "../../components/reusable/DataModal";
import DataTable from "../../components/reusable/DataTable";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const PreparationsPage = () => {
  const fieldsPreparation = [
    {
      value: "duty",
      label: "Duty",
    },
    {
      value: "qty",
      label: "Quantity",
    },
   
  ];

  const preparationsColumns = [
    {
      id: "no",
      label: "No.",
      minWidth: 70,
    },
    {
      id: "duty",
      label: "Duty",
      minWidth: 200
    },
    {
      id: "qty",
      label: "Quantity",
      minWidth: 200,
    },
    {
      id: "delete",
      label: "Delete",
      minWidth: 100,
    },
    
  ];

  let dataSearchParameterLowerCase = "";

  const [schoolCode, setSchoolCode] = React.useState("");
  const [duty, setDuty] = React.useState("");
  const [qty, setQty] = React.useState(0);
 
  const [wasQueryOfDataPreparation, setWasQueryOfDataPreparation] = React.useState(false);
  const [queryOfPreparationsData, setQueryOfPreparationsData] = React.useState([]);
  
  const [fieldPreparation, setFieldPreparation] = React.useState("duty");
  const [isDeletePreparation, setIsDeletePreparation] = React.useState(false);
  const [isAddPreparation, setIsAddPreparation] = React.useState(false);

  const [idOfRecordToBeDeletedPreparation, setIdOfRecordToBeDeletedPreparation] = React.useState("");

  const [rowDeleteDataPreparation, setRowDeleteDataPreparation] = React.useState({});
 

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSchoolCode("");
    setDuty("");
    setQty(0);
    setIsAddPreparation(false);
    setIsDeletePreparation(false);
  };

  const [
    createPreparation,
    {
      loading: createPreparationLoading,
      error: createPreparationError,
      data: createPreparationData,
    },
  ] = useMutation(ADD_PREPARATION, {
    refetchQueries: [{ query: GET_PREPARATIONS }, "Preparations"],
  });

  const [
    deletePreparation,
    {
      loading: deletePreparationLoading,
      error: deletePreparationError,
      data: deletePreparationData,
    },
  ] = useMutation(DELETE_PREPARATION, {
    refetchQueries: [{ query: GET_PREPARATIONS }, "Preparations"],
  });

  const { loading, error, data } = useQuery(GET_PREPARATIONS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;
  const { preparations } = data;

  const handleAddRecordPreparation = () => {
    setIsDeletePreparation(false);
    setIsAddPreparation(true);
    handleOpen();
  };

  const handlePreparationRecordToBeDeleted = (recID: string) => {
    const deletePreparationID = {
      id: recID,
    };

    deletePreparation({
      variables: {
        input: deletePreparationID,
      },
    });
    handleClose();
  };



  const handleProcessRecordPreparation = () => {
    if (isDeletePreparation) {
      handlePreparationRecordToBeDeleted(idOfRecordToBeDeletedPreparation); 
    } else {
      try {
        const newPreparation = {
          schoolCode,
          duty,
          qty: Number(qty)
      
        };
        createPreparation ({
          variables: {
            input: newPreparation ,
          },
        });
        handleClose();
        // handleSearchQueryBasedOnCurrentFieldStored();
      } catch (error) {
        alert("There were input error(s)!");
      }
    }
  };

  const setPreparationData = (e: any) => {
    switch (e.target.id) {
    case "schoolCode":
      setSchoolCode(e.target.value);
      break;
    case "duty":
      setDuty(e.target.value);
      break;
    case "qty":
      setQty(e.target.value);
      break;
    }
  };

  
  const handleDeleteRecordPreparation = (row: any) => {
    setIsDeletePreparation(true);
    setIsAddPreparation(false);
    setRowDeleteDataPreparation(row);
    setIdOfRecordToBeDeletedPreparation(row.id);
    handleOpen();
  };

  const handleChangeFieldPreparation = (event: any) => {
    setFieldPreparation(event.target.value);
    // handleSearchQueryBasedOnCurrentFieldStored();
  };

  const handleSearchQueryPreparation = (e: any) => {
    const dataStringSearch = e.target.value;
    if (dataStringSearch === "") {
      setWasQueryOfDataPreparation(false);
    } else {
      dataSearchParameterLowerCase = dataStringSearch.toLowerCase();
      const queriedPreparations = preparations.filter((preparation: any) => {
        return preparation[fieldPreparation]
          .toLowerCase()
          .includes(dataSearchParameterLowerCase.toLowerCase());
      });
      setQueryOfPreparationsData(queriedPreparations);
      setWasQueryOfDataPreparation(true);
    }
  };

  const savingProgress = () =>  <p style={{color: "green"}}>Saving...</p>;
  const deleteProgress = () =>  <p style={{color: "red"}}>Deleting...</p>;
  

  return (
    <>
     
      <Typography variant="h6">Preparations</Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField label="Search..." onChange={(e) => handleSearchQueryPreparation(e)} />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <TextField
              id="select-field-query"
              select
              value={fieldPreparation}
              label="Field"
              onChange={handleChangeFieldPreparation}
              helperText="Please select your query field"
            >
              {fieldsPreparation.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>
      </Box>

      {
        (createPreparationLoading && savingProgress())
      }

      {
        (deletePreparationLoading && deleteProgress())
      }

      <DataModal
        open={open}
        isAdd={isAddPreparation}
        isEdit={false}
        isDelete={isDeletePreparation}
        rowEditData={null}
        recordRowObjectForUpdate={{}}
        handleClose={handleClose}
        handleProcessRecord={handleProcessRecordPreparation}
        rowDeleteData={rowDeleteDataPreparation}
        columns={preparationsColumns}
        hasAllEntries={false}
        handleValueChangedAsEdited={() => {return;}}
        handleValueChanged={setPreparationData}
        maintenanceOptionTitle={"Preparation"}
      />

      <DataTable
        arrayOfData={!wasQueryOfDataPreparation ? preparations : queryOfPreparationsData}
        columns={preparationsColumns}
        handleDeleteRecord={(row: any) => handleDeleteRecordPreparation(row)}
      />

      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={() => handleAddRecordPreparation()}>
          Add Preparation
        </Button>
      </Box>
    </>
  );
};

export default PreparationsPage;
