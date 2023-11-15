import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { fetchDeleteUser, fetchUsers } from "../../../../redux/authSlice";

import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import {
  DataGrid,
  heIL,
  GridColDef,
  GridToolbar,
  GridActionsCellItem,
  GridRowId,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";

interface UserTable {
  id:string,
  fullName: string,
  email: string,
  // phoneNumber: string ,
  gender: string,
  grade: string,
  photoURL: string,
  isAdmin:boolean
}

export default function AllUsers() {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const auth = useAppSelector((state) => state.auth.users);

  const [rows, setRows] = useState<UserTable[]>([{
    id:'',
    fullName: '',
    email: '',
    // phoneNumber: '' ,
    gender: '',
    grade: '',
    photoURL: '',
    isAdmin:false
  }]);


  const handleDeleteClick = (id: GridRowId) => async () => {
    try {
      // Dispatch the action to delete the post on the server
      await dispatch(fetchDeleteUser(id));
  
      // Update the local state to remove the deleted post
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }
  const columns: GridColDef[] = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 80,
    // },
    {
      field: "photoURL",
      headerName: "תמונה",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Avatar"
          style={{ width: 45, height: 45, borderRadius:50 }}
        />
      ),
    },
    { field: "fullName", headerName: "שם משתמש", width: 150 },
    { field: "email", headerName: "מייל", width: 180 },
    // { field: "phoneNumber", headerName: "מספר טלפון", width: 150 },
    {
      field: 'gender',
      headerName: 'מגדר',
      width: 100,
      renderCell: (params) => {
        const gender = params.value;
        let backgroundColor = '';
  
        if (gender === 'נערים') {
          backgroundColor = "#53cefc";
        } else if (gender === 'נערות') {
          backgroundColor =  "#f69e52";
        }
  
        return <div style={{ backgroundColor }}>{gender}</div>;
      },
    },
    { field: "grade", headerName: "כיתה", width: 100 },
    { field: 'isAdmin', headerName:"מנהל",  type: 'boolean', width: 100 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'מחיקה',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          // <GridActionsCellItem
          //   icon={<EditIcon />}
          //   label="Edit"
          //   className="textPrimary"
          //   onClick={handleEditClick(id)}
          //   color="inherit"
          // />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    }
  ];

  useEffect(() => {
    const userDataRows = auth.map((user) => {
      const { uid, displayName, email,
        //  phoneNumber,
          photoURL , isAdmin} = user.user;
      const { gender, grade } = user;
      return {
        id:uid,
        fullName: displayName,
        email: email,
        // phoneNumber,
        gender,
        grade,
        photoURL,
        isAdmin,
      };
    });
    setRows(userDataRows);
  }, [auth]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">כל המשתמשים</Typography>
          </div>

          <Grid container spacing={3}>
            <Grid item lg={12}>
              <Card>
                <DataGrid
                  localeText={
                    heIL.components.MuiDataGrid.defaultProps.localeText
                  }
              
                  slots={{ toolbar: GridToolbar,  }}
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                />
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
