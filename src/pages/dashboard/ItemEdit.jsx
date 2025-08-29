import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckOutlined, KeyOutlined, CloudDownloadOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
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
import axios from 'axios';

// ==============================|| DASHBOARD - DEFAULT ||============================== //
export default function DashboardDefault() {
  const [asin, setAsin] = useState();
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {

    }

  }, []);

  const add = async () => {

    const requestData = {
      userId: localStorage.getItem("user_id"),   
      asin_list: asin
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}spapi/additemFromAsin`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then(async (response) => {
        console.log(response);
      })
      .catch((error) => {
        alert("Error");
      });
  }

  return (
    <>

      <Grid container rowSpacing={4.5} columnSpacing={2.75} >

        <Grid item xs={12} md={12} lg={12} >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">商品管理 / 商品登録</Typography>
              <Typography variant="caption" color="secondary" noWrap>
                商品を登録します。
              </Typography>
            </Grid>

            <Grid display={'flex'} gap={2}>

              <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', marginRight: '3px' }} >
                <CloudDownloadOutlined />&nbsp;&nbsp;CSV一括登録
              </Button>
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
                      value={asin}
                      onChange={(event)=>setAsin(event.target.value)}
                      defaultValue="ASIN"
                    />

                  </Grid>
                  <Grid item >
                    <Grid item width={150}>
                      <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#52c41a', height: '41px' }}
                        onClick={add}>
                        <PlusOutlined />&nbsp;&nbsp;登録
                      </Button>
                    </Grid>
                  </Grid>
                  <Table aria-labelledby="tableTitle">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>登録日</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>状態</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>ASIN</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>商品名</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>Amazon</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>価格</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>画像</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>

                    </TableBody>
                  </Table>
                </Stack>
              </Grid>

            </Grid>
          </MainCard>
        </Grid>

      </Grid>
    </>
  );
}
