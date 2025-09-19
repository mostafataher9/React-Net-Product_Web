import { Outlet } from "react-router-dom";
import React from "react";
import { Box } from '@mui/material';
import Sidebar from "../../Components/Sidebar";

export function AdminLayout(){
       return (
              <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                        <Sidebar />
                        <Box
                              component="main"
                              sx={{
                                     flexGrow: 1,
                                     bgcolor: '#f5f5f5',
                                     p: 3,
                                     ml: '240px', // Sidebar width
                              }}
                        >
                              <Outlet />
                        </Box>
              </Box>
      );
}
