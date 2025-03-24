import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckOutlined, KeyOutlined, CloudDownloadOutlined, ReloadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
// project import
import MainCard from 'components/MainCard';
// assets
import { useEffect } from "react";
import TextField from '@mui/material/TextField';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// ==============================|| DASHBOARD - DEFAULT ||============================== //
export default function DashboardDefault() {

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {

    }

  }, []);


  return (
    <>

      <Grid container rowSpacing={4.5} columnSpacing={2.75} >

        <Grid item xs={12} md={12} lg={12} >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">商品管理 / ASINで商品一括削除</Typography>
              <Typography variant="caption" color="secondary" noWrap>
                ASINを入力してください。<br></br>
                複数入力する場合は改行かスペース区切りで入力してください。100000件まで入力できます。
              </Typography>
            </Grid>
           
          </Grid>

          <MainCard sx={{ mt: 2 }}>

            <Grid container justifyContent="space-between">
              <Grid item sx={{ width: '100%' }}>
                <Stack spacing={3}>
                  <Grid item>

                    <TextField sx={{ width: '100%' }}
                      id="outlined-multiline-static"
                      label="ASIN"
                      placeholder="ASIN ASIN ASIN"
                      multiline
                      rows={5}
                      defaultValue="ASIN"
                    />

                  </Grid>
                  <Grid item >
                    <Grid item width={150}>
                      <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#e3342f', height: '41px' }}>
                        <DeleteOutlined />&nbsp;&nbsp;削除
                      </Button>
                    </Grid>
                  </Grid>
                  
                </Stack>
              </Grid>

            </Grid>
          </MainCard>
        </Grid>

      </Grid>
    </>
  );
}
