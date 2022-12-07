import * as React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_FACILITIES } from '../../../src/graphql/queries';
import { ADD_FACILITY } from '../../graphql/mutations';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Typography from '@mui/material/Typography';

import DataModal from '../../components/reusable/DataModal';
import DataTable from '../../components/reusable/DataTable';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const FacilitiesPage = () => {

  const facilitiesColumns = [
    {
      id: 'no',
      label: 'No.',
      minWidth: 70,
    },
    { id: 'placeName',
      label: 'Place Name',
      minWidth: 200,
    
    },
    {
      id: 'address1',
      label: 'Address 1',
      minWidth: 200,
       
    },
    {
      id: 'address2',
      label: 'Address 2',
      minWidth: 200,
    },
    {
      id: 'city',
      label: 'City',
      minWidth: 200,
      
    },
    {
      id: 'state',
      label: 'State',
      minWidth: 100,
    
    },
    {
      id: 'zipCode',
      label: 'Zip Code',
      minWidth: 100,
    
    },
    {
      id: 'edit',
      label: 'Edit',
      minWidth: 100,
    },
    {
      id: 'delete',
      label: 'Delete',
      minWidth: 100,
    },
  ];

  const [schoolCode, setSchoolCode] = React.useState("");
  const [placeName, setPlaceName] = React.useState("");
  const [address1, setAddress1] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");
  const [hasAllEntries, setHasAllEntries] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [createFacility, {loading: createFacilityLoading, error: createFacilityError, data: createFacilityData}] = useMutation(ADD_FACILITY, {
    refetchQueries: [
      {query: GET_FACILITIES},
      'Facilities'
    ],
  });

  
  const handleSave = () => {
    const newFacility = {
      schoolCode,
      placeName,
      address1,
      address2,
      directions: "None",
      city,
      state,
      zipCode
    }
    createFacility( {variables: {
      input: newFacility
    }});
    handleClose();
  }

  const setFacilityData = (e: any) => {
      if (schoolCode.length === 0 
          || placeName.length === 0
          || address1.length === 0
          || address2.length === 0
          || city.length === 0
          || state.length === 0
          || zipCode.length === 0) 
      {
        setHasAllEntries(false);
      } else {
        setHasAllEntries(true);
      }
      switch (e.target.id) {
        case "schoolCode": setSchoolCode(e.target.value); break;
        case "placeName": setPlaceName(e.target.value); break;
        case "address1": setAddress1(e.target.value); break;
        case "address2": setAddress2(e.target.value); break;
        case "city": setCity(e.target.value); break;
        case "state": setState(e.target.value); break;
        case "zipCode": setZipCode(e.target.value); break;
      }
      
     
  }

  const { loading, error, data } = useQuery(GET_FACILITIES);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Something Went Wrong</p>
    
  const { facilities } = data;
  
  return (
    <>
       <Typography variant="h6">
         Facilities
       </Typography>
       <Box display="flex"
            justifyContent="flex-end"
            mb={2}
       >
          <TextField
             label="Search..."
          />
          <Box sx={{ minWidth: 120 }}>
           <FormControl fullWidth>
             <InputLabel id="demo-simple-select-label">
                Field
             </InputLabel>
             <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Field"
             >
                <MenuItem >Place Name</MenuItem>
                <MenuItem >Address</MenuItem>
                <MenuItem >City</MenuItem>
             </Select>
           </FormControl>
          </Box>  
       </Box>

    
       <DataModal 
          open={open}
          handleClose={handleClose}
          handleSave={handleSave}
          handleValueChanged={setFacilityData}
          columns={facilitiesColumns}
          hasAllEntries={hasAllEntries}
       />

       <DataTable 
       
          arrayOfData={facilities}
          columns={facilitiesColumns}
       />
   
      <Box mt={2}
           display="flex"
           justifyContent="flex-end"
      >
         <Button 
           variant="contained"
           onClick={() => handleOpen()}
         >
           Add Facility
         </Button> 
        
      </Box>
 
    </>
  ) 
};

export default FacilitiesPage;


