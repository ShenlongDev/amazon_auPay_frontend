import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import axios from 'axios';
import { FunctionOutlined, CloudDownloadOutlined } from '@ant-design/icons';
// project import
import MainCard from 'components/MainCard';
// assets
import { useEffect } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
    <Grid container rowSpacing={4.5} columnSpacing={2.75} >
      <Grid item xs={12} md={12} lg={12} >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">財務管理 / 収益管理</Typography>
            <Typography variant="caption" color="secondary" noWrap>
              注文処理状況を表示します。
            </Typography>
          </Grid>

          <Grid>
            <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', marginRight: '3px' }} >
              <CloudDownloadOutlined />&nbsp;&nbsp;CSV出力
            </Button>
            <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#faad14' }} >
              <FunctionOutlined />&nbsp;&nbsp;手数料設定
            </Button>
          </Grid>
        </Grid>

        <MainCard sx={{ mt: 2 }}>
          <Grid container justifyContent="space-between">
            <Grid item sx={{ width: '100%' }}>
              <Stack spacing={3}>
                <Grid container justifyContent="space-between" gap={2} alignItems="center" sx={{ marginTop: '5px !important', }}>

                  <Grid item sx={{ display: 'flex', gap: 1, width: '100%' }} >
                    <Grid item xs={12} md={3} lg={3}>

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                          <DatePicker label="月選択" defaultValue={dayjs('2022-04-17')} views={['year', 'month']} />
                        </DemoContainer>
                      </LocalizationProvider>

                    </Grid>
                    <Grid item xs={12} md={9} lg={9} sx={{ display: 'flex', fontWeight: '700', color: '#FF0000' }}>
                      <Grid item xs={12} md={4} lg={4}>売上げ(515,173円)</Grid>
                      <Grid item xs={12} md={4} lg={4}>利益(32,311円)</Grid>
                      <Grid item xs={12} md={4} lg={4}>利益率(6.27%)</Grid>
                    </Grid>
                  </Grid>
                  <Table aria-labelledby="tableTitle">
                    <TableHead>   
                      <TableRow>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>受注番号</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>注文日時</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>ASIN</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>商品名</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>Amazon</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>価格</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>販売価格</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>手数料</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>個数</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>利益</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>利率</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      
                    </TableBody>
                  </Table>

                </Grid>
              </Stack>
            </Grid>

          </Grid>
        </MainCard>
      </Grid>

    </Grid>

  );
}
