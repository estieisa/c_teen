import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { Link } from "react-router-dom";

export const mainListItems = (
  <>
    <Link to={"overview"} style={{ color: "black", textDecoration: "none" }}>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText
          primary="נתונים סטטיסטים"
          style={{ textAlign: "start" }}
        />
      </ListItemButton>
    </Link>
      <Link to={"all-users"} style={{ color: "black", textDecoration: "none" }}>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
        <ListItemText 
        primary="משתמשים"
         style={{ textAlign: "start" }} />
    </ListItemButton>
      </Link>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="" />
    </ListItemButton>
  </>
);

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
      אירועים
    </ListSubheader>
      <Link to={"new-posts"} style={{ color: "black", textDecoration: "none" }}>
    <ListItemButton>
      <ListItemIcon>
        <EditCalendarIcon />
      </ListItemIcon>
        <ListItemText primary="הוספת ארוע"
         style={{ textAlign: "start" }} />
    </ListItemButton>
      </Link>
      <Link to={"all-posts"} style={{ color: "black", textDecoration: "none" }}>
    <ListItemButton>
      <ListItemIcon>
        <CalendarMonthIcon />
      </ListItemIcon>
        <ListItemText primary="הצגת כל הארועים"
         style={{ textAlign: "start" }} />
    </ListItemButton>
      </Link>
      <Link   to={"all-posts-table"} style={{ color: "black", textDecoration: "none" }}>
    <ListItemButton>
      <ListItemIcon>
        <EventNoteIcon />
      </ListItemIcon>
        <ListItemText primary="עריכת האירועים" 
         style={{ textAlign: "start" }}/>
    </ListItemButton>
      </Link>
  </>
);
