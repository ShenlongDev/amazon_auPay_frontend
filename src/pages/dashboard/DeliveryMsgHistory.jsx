import { useState, React } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import MainCard from 'components/MainCard';
import { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


// ==============================|| DASHBOARD - DEFAULT ||============================== //
export default function DashboardDefault() {
 

  useEffect(() => {

  }, []);


  return (
    <>

      <Grid container rowSpacing={4.5} columnSpacing={2.75} >
        <Grid item xs={12} md={12} lg={12} >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">財務管理 / 発送通知履歴</Typography>
              <Typography variant="caption" color="secondary" noWrap>
                発送通知履歴状況を表示します。
              </Typography>
            </Grid>
            <Grid item />
          </Grid>

          <MainCard sx={{ mt: 2 }}>
            <Grid container justifyContent="space-between">
              <Grid item sx={{ width: '100%' }}>
                <Stack spacing={3}>
                  <Table aria-labelledby="tableTitle">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>詳細</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>受注番号</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>配送お問合せ番号</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>商品 (削除した商品は表示されません)</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>Amazon</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>価格</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>販売価格</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>状態</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }}>通知日</TableCell>
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
