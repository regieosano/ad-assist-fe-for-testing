import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const DataModal = (
	  props: {
		   open: boolean;
			 isEdit: boolean;
			 isAdd: boolean;
			 isDelete: boolean;
			 rowEditData: any;
			 recordRowObjectForUpdate: object;
		   handleClose: Function;
		   handleSave: Function;
		   handleValueChanged: Function;
			 handleValueChangedAsEdited: Function;
			 columns: Array<object>;
			 hasAllEntries: boolean;
	  }
	) => {

  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


	return (
        <Modal
	   aria-labelledby="transition-modal-title"
     aria-describedby="transition-modal-description"
     open={props.open}
	   onClose={(_, reason) => reason === 'backdropClick' && props.handleClose}
	   closeAfterTransition
		 
		>
			<Fade in={props.open}>
				<Box sx={style}>
					<Typography id="transition-modal-title" variant="h6">
						{ props.isAdd ? "Add New Facility": 
						  props.isEdit ? "Edit Facility":
							"Delete Facility"
					  }
					</Typography>
					<Box
						component="form"
						noValidate
						autoComplete="off"
						mt={2}
					>
						<TextField
									sx={{
										width: 700
									}}
									defaultValue={props.isEdit ? props.rowEditData["schoolCode"]: ""}
									required={props.isAdd ? true: false}
									disabled={props.isDelete}
									id="schoolCode"
									label="School Code"
									onChange={!props.isEdit ? (e) => props.handleValueChanged(e): (e) => props.handleValueChangedAsEdited(e)}
														
						/>
					</Box>
					{
						props.columns.map((column: any, index: number) => {
							if (column.id !== "no" && column.id !== "edit" + "" && column.id !== "delete") {
								return (
									<Box
										component="form"
										noValidate
										autoComplete="off"
										mt={2}
										key={index}
									>
										<TextField
												sx={{ 
													width: 700
												}}
												// value={props.isEdit ? props.rowEditData[column.id]: ""}
												disabled={props.isDelete}
												required={!props.isEdit ? true: false}
												id={column.id}
												label={column.label}
												onChange={!props.isEdit ? (e) => props.handleValueChanged(e): (e) => props.handleValueChangedAsEdited(e)}
												defaultValue={props.isEdit ? props.rowEditData[column.id]:
												             props.isDelete ? props.recordRowObjectForUpdate: ""
												}
										/>
									</Box>
						  	)
							}
						})
					}
							
					<Box
						mt={2}
						display="flex"
						justifyContent="flex-end"
					>
						<Box mr={1}>
							<Button 
								variant="contained"
								onClick={() => props.handleSave()}
								disabled={false}
							>
								{ props.isEdit ? "Update":
								  props.isDelete ? "Delete":
									"Save"
								}
							</Button>			
						</Box>
						<Box>
							<Button 
								variant="contained"
								onClick={() => props.handleClose()}
							>
								Cancel
							</Button> 		
						</Box>
						
					</Box>
				
				</Box>
			</Fade>
		</Modal>
    );
	
}

export default DataModal;