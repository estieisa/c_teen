import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import {
  DataGrid,
  heIL,
  GridColDef,
  GridToolbar,
  GridActionsCellItem,
  GridRowId,
} from "@mui/x-data-grid";
import { Post, fetchDeletePost, fetchPosts } from "../../../../redux/postsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate, formatTime } from '../../category/PostByCategory'

interface PostTable {
  id: string;
  title: string;
  description: string;
  gender: string[];
  grade: string[];
  image: string;
  category: string;
  date: string | number | Date;
  users: number;
}

export default function AllPostsTable() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const posts: Post[] = useAppSelector((state) => state.posts.posts);

  const [rows, setRows] = useState<PostTable[]>([
    {
      id: "",
      title: "",
      description: "",
      gender: [],
      grade: [],
      category: "",
      date: "",
      users: 0,
      image: "",
    },
  ]);

  const handleDeleteClick = (id: GridRowId) => async () => {
    try {
      // Dispatch the action to delete the post on the server
      await dispatch(fetchDeletePost(id));

      // Update the local state to remove the deleted post
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "תמונה",
      width: 80,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Avatar"
          style={{ width: 45, height: 45, borderRadius: 50 }}
        />
      ),
    },
    { field: "title", headerName: "כותרת", width: 150 },
    { field: "description", headerName: "תיאור", width: 150 },
    { field: "gender", headerName: "מגדר", width: 100 },
    { field: "grade", headerName: "כיתה", width: 100 },
    { field: "category", headerName: "קטגוריה", width: 100 },
    {
      field: 'date',
      headerName: 'תאריך ושעה',
      width: 130,
      renderCell: (params) => {
        const currentDate = new Date()
        const cellDate = new Date(params.value)
        let backgroundColor = '';
  
        if (cellDate < currentDate) {
          backgroundColor = "#f69e52";
        }
  
        return <div style={{ backgroundColor }}>{formatDate(params.value)} {formatTime(params.value)}</div>;
      },
    },
    { field: "users", headerName: "רשומים", width: 60 },
    {
      field: "actions",
      type: "actions",
      headerName: "מחיקה",
      width: 80,
      cellClassName: "actions",
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
            label="מחיקה"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    const postDataRows = posts.map((post) => {
      const {
        id,
        title,
        description,
        gender,
        grade,
        image,
        category,
        date,
        users,
      } = post;
      return {
        id,
        title,
        description,
        gender,
        grade,
        category,
        date: date,
        users: users?.length,
        image,
      };
    });
    setRows(postDataRows);
  }, [posts]);

  return (
    <>
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
              <Typography variant="h4">כל הפוסטים</Typography>
            </div>

            <Grid container spacing={3}>
              <Grid item lg={12}>
                <Card>
                  <DataGrid
                    localeText={
                      heIL.components.MuiDataGrid.defaultProps.localeText
                    }
                    slots={{ toolbar: GridToolbar }}
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
    </>
  );
}
