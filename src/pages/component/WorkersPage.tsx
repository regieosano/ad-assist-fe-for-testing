/* eslint-disable @typescript-eslint/no-shadow */
import * as React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_WORKERS } from "../../graphql/worker/queries";
import {
  ADD_WORKER,
  EDIT_WORKER,
  DELETE_WORKER,
} from "../../graphql/worker/mutations";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";

import DataModal from "../../components/reusable/DataModal";
import DataTable from "../../components/reusable/DataTable";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const WorkersPage = () => {

  enum WorkerType  {
    hourly = "HOURLY",
    certified = "CERTIFIED"
  }


  const fieldsWorker = [
    {
      value: "lastName",
      label: "Last Name",
    },
    {
      value: "firstName",
      label: "First Name",
    },
    {
      value: "homePhone",
      label: "Home Phone",
    },
    {
      value: "workerType",
      label: "Worker Type",
    },
    {
      value: "payRate",
      label: "Pay Rate",
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
      value: "ssn",
      label: "SS No.",
    },
  ];

  const workersColumns = [
    {
      id: "no",
      label: "No.",
      minWidth: 50,
    },
    { id: "lastName", label: "Last Name", minWidth: 180 },
    { id: "firstName", label: "First Name", minWidth: 180 },
    {
      id: "homePhone",
      label: "Home Phone",
      minWidth: 150,
    },
    {
      id: "workerType",
      label: "Worker Type",
      minWidth: 150,
    },
    {
      id: "payRate",
      label: "Pay Rate",
      minWidth: 100,
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
      id: "ssn",
      label: "SS No.",
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
  const [lastName, setLastName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [homePhone, setHomePhone] = React.useState("");
  const [workerType, setWorkerType] = React.useState(WorkerType.hourly);
  const [payRate, setPayRate] = React.useState(0.0);
  const [cellPhone, setCellPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [ssn, setSSN] = React.useState("");
 
  const [schoolCodeAsEdited, setSchoolCodeAsEdited] = React.useState("");
  const [lastNameAsEdited, setLastNameAsEdited] = React.useState("");
  const [firstNameAsEdited, setFirstNameAsEdited] = React.useState("");
  const [homePhoneAsEdited, setHomePhoneAsEdited] = React.useState("");
  const [workerTypeAsEdited, setWorkerTypeAsEdited] = React.useState(WorkerType.hourly);
  const [payRateAsEdited, setPayRateAsEdited] = React.useState(0.0);
  const [cellPhoneAsEdited, setCellPhoneAsEdited] = React.useState("");
  const [emailAsEdited, setEmailAsEdited] = React.useState("");
  const [ssnAsEdited, setSSNAsEdited] = React.useState("");
  
  const [wasQueryOfDataWorker, setWasQueryOfDataWorker] = React.useState(false);
  const [queryOfWorkersData, setQueryOfWorkersData] = React.useState([]);
  const [hasAllEntries, setHasAllEntries] = React.useState(false);
  const [fieldWorker, setFieldWorker] = React.useState("lastName");
  const [isDeleteWorker, setIsDeleteWorker] = React.useState(false);
  const [isEditWorker, setIsEditWorker] = React.useState(false);
  const [isAddWorker, setIsAddWorker] = React.useState(false);
  const [idOfRecordToBeDeletedWorker, setIdOfRecordToBeDeletedWorker] = React.useState("");
  const [rowEditDataWorker, setRowEditDataWorker] = React.useState({});
  const [rowDeleteDataWorker, setRowDeleteDataWorker] = React.useState({});
  const [recordRowObjectForUpdateWorker, setRecordRowObjectForUpdateWorker] =
      React.useState({
        id: String,
        schoolCode: String,
        lastName: String,
        firstName: String,
        homePhone: String,
        workerType: String,
        payRate: Number,
        cellPhone: String,
        email: String,
        ssn: String
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
    setHomePhone("");
    setWorkerType(WorkerType.hourly);
    setPayRate(0.0);
    setCellPhone("");
    setEmail("");
    setSSN("");
   
    setSchoolCodeAsEdited("");
    setLastNameAsEdited("");
    setFirstNameAsEdited("");
    setHomePhoneAsEdited("");
    setWorkerTypeAsEdited(WorkerType.hourly);
    setPayRateAsEdited(0.0);
    setCellPhoneAsEdited("");
    setEmailAsEdited("");
    setSSNAsEdited("");

    setIsAddWorker(false);
    setIsEditWorker(false);
    setIsDeleteWorker(false);
  };

  const [
    createWorker,
    {
      loading: createWorkerLoading,
      error: createWorkerError,
      data: createWorkerData,
    },
  ] = useMutation(ADD_WORKER, {
    refetchQueries: [{ query: GET_WORKERS }, "Workers"],
  });

  const [
    modifyWorker,
    {
      loading: modifyWorkerLoading,
      error: modifyWorkerError,
      data: modifyWorkerData,
    },
  ] = useMutation(EDIT_WORKER, {
    update(cache, { data: { modifyWorker } }) {
      cache.modify({
        fields: {
          allWorkers(existingWorkers = []) {
            const newWorkerRef = cache.writeFragment({
              data: modifyWorker,
              fragment: gql`
                  fragment ModifyWorker on Worker {
                    schoolCode
                    lastName
                    firstName
                    homePhone
                    workerType
                    payRate
                    cellPhone
                    email
                    ssn
                  }
                `,
            });
            return [...existingWorkers, newWorkerRef];
          },
        },
      });
    },
  });

  const [
    deleteWorker,
    {
      loading: deleteWorkerLoading,
      error: deleteWorkerError,
      data: deleteWorkerData,
    },
  ] = useMutation(DELETE_WORKER, {
    refetchQueries: [{ query: GET_WORKERS }, "Workers"],
  });

  const { loading, error, data } = useQuery(GET_WORKERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;
  const { workers } = data;

  const handleModifiedRecordWorker = () => {
    const typeOfWorker = workerTypeAsEdited.toLocaleLowerCase() === "hourly" ? WorkerType.hourly: 
      workerTypeAsEdited.toLocaleLowerCase() === "certified" ? WorkerType.certified: WorkerType.hourly;
    
    const updatedWorker = {
      id: recordRowObjectForUpdateWorker.id,
      schoolCode: schoolCodeAsEdited,
      lastName: lastNameAsEdited,
      firstName: firstNameAsEdited,
      homePhone: homePhoneAsEdited,
      workerType: typeOfWorker,
      payRate: Number(payRateAsEdited),
      cellPhone: cellPhoneAsEdited,
      email: emailAsEdited,
      ssn: ssnAsEdited
    };
    modifyWorker({
      variables: {
        input: updatedWorker,
      },
    });
    handleClose();
  };

  const handleAddRecord = () => {
    setIsDeleteWorker(false);
    setIsEditWorker(false);
    setIsAddWorker(true);
    handleOpen();
  };

  const handleRecordToBeDeletedWorker = (recID: string) => {
    const deleteWorkerID = {
      id: recID,
    };

    deleteWorker({
      variables: {
        input: deleteWorkerID,
      },
    });
    handleClose();
  };



  const handleProcessRecordWorker = () => {
    if (isEditWorker) {
      handleModifiedRecordWorker();
    } else if (isDeleteWorker)
    {
      handleRecordToBeDeletedWorker(idOfRecordToBeDeletedWorker); 
    } else {
      const typeOfWorker = workerType.toLocaleLowerCase() === "hourly" ? WorkerType.hourly: 
        workerType.toLocaleLowerCase() === "certified" ? WorkerType.certified: WorkerType.hourly;
      try {
        const newWorker = {
          schoolCode,
          lastName,
          firstName,
          homePhone,
          workerType: typeOfWorker,
          payRate: Number(payRate),
          cellPhone,
          email,
          ssn
        };
        createWorker({
          variables: {
            input: newWorker,
          },
        });
        handleClose();
        // handleSearchQueryBasedOnCurrentFieldStored();
      } catch (error) {
        alert("There were input error(s)!");
      }
    }
  };

  const setWorkerDataAsEdited = (e: any) => {
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
    case "homePhone":
      setHomePhoneAsEdited(e.target.value);
      break;
    case "workerType":
      setWorkerTypeAsEdited(e.target.value);
      break;
    case "payRate":
      setPayRateAsEdited(e.target.value);
      break;
    case "cellPhone":
      setCellPhoneAsEdited(e.target.value);
      break;        
    case "email":
      setEmailAsEdited(e.target.value);
      break;
    case "ssn":
      setSSNAsEdited(e.target.value);
      break;
    }
  };

  const setWorkerData = (e: any) => {
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
    case "homePhone":
      setHomePhone(e.target.value);
      break;
    case "workerType":
      setWorkerType(e.target.value);
      break;
    case "payRate":
      setPayRate(e.target.value);
      break;
    case "cellPhone":
      setCellPhone(e.target.value);
      break;        
    case "email":
      setEmail(e.target.value);
      break;
    case "ssn":
      setSSN(e.target.value);
      break;
    }
  };


  const handleValueChangedAsEditedWorker = (e: any) => {
    setWorkerDataAsEdited(e);
  };

  
  const handleEditRecordWorker = (row: any) => {
    setRecordRowObjectForUpdateWorker(row);
    setIsEditWorker(true);
    setIsDeleteWorker(false);
    setIsAddWorker(false);
    setRowEditDataWorker(row);
    setSchoolCodeAsEdited(row.schoolCode);
    setLastNameAsEdited(row.lastName);
    setFirstNameAsEdited(row.firstName);
    setHomePhoneAsEdited(row.homePhone);
    setWorkerTypeAsEdited(row.workerType);
    setPayRateAsEdited(row.payRate);
    setCellPhoneAsEdited(row.cellPhone);
    setEmailAsEdited(row.email);
    setSSNAsEdited(row.ssn);
    handleOpen();
  };

  const handleDeleteRecordWorker = (row: any) => {
    setIsDeleteWorker(true);
    setIsEditWorker(false);
    setIsAddWorker(false);
    setRowDeleteDataWorker(row);
    setIdOfRecordToBeDeletedWorker(row.id);
    handleOpen();
  };

  const handleChangeFieldWorker = (event: any) => {
    setFieldWorker(event.target.value);
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

  
  const handleSearchQueryWorker = (e: any) => {
    if (fieldWorker === "payRate") {
      const dataPayRateSearch = e.target.value;
      const queriedWorkersBasedOnPayrate = workers.filter((worker: any) => {
        return worker[fieldWorker] == dataPayRateSearch;
      });
      setQueryOfWorkersData(queriedWorkersBasedOnPayrate);
      setWasQueryOfDataWorker(true);
    } else {
      const dataStringSearch = e.target.value;
      if (dataStringSearch === "") {
        setWasQueryOfDataWorker(false);
      } else {
        dataSearchParameterLowerCase = dataStringSearch.toLowerCase();
        const queriedWorkers = workers.filter((worker: any) => {
          return worker[fieldWorker]
            .toLowerCase()
            .includes(dataSearchParameterLowerCase.toLowerCase());
        });
        setQueryOfWorkersData(queriedWorkers);
        setWasQueryOfDataWorker(true);
      }
    }
   
  };

  const savingProgress = () =>  <p style={{color: "green"}}>Saving...</p>;
  const updateProgress = () =>  <p style={{color: "green"}}>Updating...</p>;
  const deleteProgress = () =>  <p style={{color: "red"}}>Deleting...</p>;
  
 

  return (
    <>
      <Typography variant="h6">Workers</Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField label="Search..." onChange={(e) => handleSearchQueryWorker(e)} />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <TextField
              id="select-field-query"
              select
              value={fieldWorker}
              label="Field"
              onChange={handleChangeFieldWorker}
              helperText="Please select your query field"
            >
              {fieldsWorker.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>
      </Box>

      {
        (createWorkerLoading && savingProgress())
      }

      {
        (modifyWorkerLoading && updateProgress())
      }

      {
        (deleteWorkerLoading && deleteProgress())
      }

      <DataModal
        open={open}
        isAdd={isAddWorker}
        isEdit={isEditWorker}
        isDelete={isDeleteWorker}
        handleClose={handleClose}
        handleProcessRecord={handleProcessRecordWorker}
        handleValueChanged={setWorkerData}
        handleValueChangedAsEdited={handleValueChangedAsEditedWorker}
        recordRowObjectForUpdate={recordRowObjectForUpdateWorker}
        rowDeleteData={rowDeleteDataWorker}
        columns={workersColumns}
        rowEditData={rowEditDataWorker}
        hasAllEntries={hasAllEntries}
        maintenanceOptionTitle={"Worker"}
      />

      <DataTable
        arrayOfData={!wasQueryOfDataWorker ? workers : queryOfWorkersData}
        columns={workersColumns}
        handleEditRecord={(row: any) => handleEditRecordWorker(row)}
        handleDeleteRecord={(row: any) => handleDeleteRecordWorker(row)}
       
      />

      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={() => handleAddRecord()}>
          Add Worker
        </Button>
      </Box>
    </>
  );
};

export default WorkersPage;
