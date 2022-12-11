/* eslint-disable @typescript-eslint/no-shadow */
import * as React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_LEVELS } from "../../graphql/level/queries";
import {
  ADD_LEVEL,
  DELETE_LEVEL,
} from "../../graphql/level/mutations";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";

import DataModal from "../../components/reusable/DataModal";
import DataTable from "../../components/reusable/DataTable";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const LevelsPage = () => {
  const fields = [
    {
      value: "level",
      label: "Level Name",
    },
    {
      value: "description",
      label: "Description",
    },
   
  ];

  const levelsColumns = [
    {
      id: "no",
      label: "No.",
      minWidth: 70,
    },
    {
      id: "level",
      label: "Level",
      minWidth: 200
    },
    {
      id: "description",
      label: "Description",
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
  const [level, setLevel] = React.useState("");
  const [description, setDescription] = React.useState("");

  
 
  const [wasQueryOfDataLevel, setWasQueryOfDataLevel] = React.useState(false);
  const [queryOfLevelsData, setQueryOfLevelsData] = React.useState([]);
  
  const [fieldLevel, setFieldLevel] = React.useState("level");
  const [isDeleteLevel, setIsDeleteLevel] = React.useState(false);
  const [isAddLevel, setIsAddLevel] = React.useState(false);

  const [idOfRecordToBeDeletedLevel, setIdOfRecordToBeDeletedLevel] = React.useState("");

  const [rowDeleteDataLevel, setRowDeleteDataLevel] = React.useState({});
 
 

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSchoolCode("");
    setLevel("");
    setDescription("");
    setIsAddLevel(false);
    setIsDeleteLevel(false);
  };

  const [
    createLevel,
    {
      loading: createLevelLoading,
      error: createLevelError,
      data: createLevelData,
    },
  ] = useMutation(ADD_LEVEL, {
    refetchQueries: [{ query: GET_LEVELS }, "Levels"],
  });

  const [
    deleteLevel,
    {
      loading: deleteLevelLoading,
      error: deleteLevelError,
      data: deleteLevelData,
    },
  ] = useMutation(DELETE_LEVEL, {
    refetchQueries: [{ query: GET_LEVELS }, "Levels"],
  });

  const { loading, error, data } = useQuery(GET_LEVELS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;
  const { levels } = data;

  const handleAddRecordLevel = () => {
    setIsDeleteLevel(false);
    setIsAddLevel(true);
    handleOpen();
  };

  const handleLevelRecordToBeDeleted = (recID: string) => {
    const deleteLevelID = {
      id: recID,
    };

    deleteLevel({
      variables: {
        input: deleteLevelID,
      },
    });
    handleClose();
  };



  const handleProcessRecordLevel = () => {
    if (isDeleteLevel) {
      handleLevelRecordToBeDeleted(idOfRecordToBeDeletedLevel); 
    } else {
      try {
        const newLevel = {
          schoolCode,
          level,
          description,
      
        };
        createLevel({
          variables: {
            input: newLevel,
          },
        });
        handleClose();
        // handleSearchQueryBasedOnCurrentFieldStored();
      } catch (error) {
        alert("There were input error(s)!");
      }
    }
  };

  const setLevelData = (e: any) => {
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
    case "level":
      setLevel(e.target.value);
      break;
    case "description":
      setDescription(e.target.value);
      break;
    }
  };

  
  const handleDeleteRecordLevel = (row: any) => {
    setIsDeleteLevel(true);
    setIsAddLevel(false);
    setRowDeleteDataLevel(row);
    setIdOfRecordToBeDeletedLevel(row.id);
    handleOpen();
  };

  const handleChangeFieldLevel = (event: any) => {
    setFieldLevel(event.target.value);
    // handleSearchQueryBasedOnCurrentFieldStored();
  };

  const handleSearchQueryLevel = (e: any) => {
    const dataStringSearch = e.target.value;
    if (dataStringSearch === "") {
      setWasQueryOfDataLevel(false);
    } else {
      dataSearchParameterLowerCase = dataStringSearch.toLowerCase();
      const queriedLevels = levels.filter((level: any) => {
        return level[fieldLevel]
          .toLowerCase()
          .includes(dataSearchParameterLowerCase.toLowerCase());
      });
      // facilities = queriedFacilities;
      setQueryOfLevelsData(queriedLevels);
      setWasQueryOfDataLevel(true);
    }
  };

  const savingProgress = () =>  <p style={{color: "green"}}>Saving...</p>;
  const deleteProgress = () =>  <p style={{color: "red"}}>Deleting...</p>;
  

  return (
    <>
     
      <Typography variant="h6">Levels</Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField label="Search..." onChange={(e) => handleSearchQueryLevel(e)} />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <TextField
              id="select-field-query"
              select
              value={fieldLevel}
              label="Field"
              onChange={handleChangeFieldLevel}
              helperText="Please select your query field"
            >
              {fields.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>
      </Box>

      {
        (createLevelLoading && savingProgress())
      }

      {
        (deleteLevelLoading && deleteProgress())
      }

      <DataModal
        open={open}
        isAdd={isAddLevel}
        isEdit={false}
        isDelete={isDeleteLevel}
        rowEditData={null}
        recordRowObjectForUpdate={{}}
        handleClose={handleClose}
        handleProcessRecord={handleProcessRecordLevel}
        rowDeleteData={rowDeleteDataLevel}
        columns={levelsColumns}
        hasAllEntries={false}
        handleValueChangedAsEdited={() => {return;}}
        handleValueChanged={() => {return;}}
        maintenanceOptionTitle={"Level"}
      />

      <DataTable
        arrayOfData={!wasQueryOfDataLevel ? levels : queryOfLevelsData}
        columns={levelsColumns}
        handleDeleteRecord={(row: any) => handleDeleteRecordLevel(row)}
      />

      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={() => handleAddRecordLevel()}>
          Add Level
        </Button>
      </Box>
    </>
  );
};

export default LevelsPage;
