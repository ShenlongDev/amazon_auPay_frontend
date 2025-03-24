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
                発送通知履歴を表示します。
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
                      <TableRow >
                        <TableCell sx={{ backgroundColor: '#EEE' }} align="center">_</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }} align="center">受注番号</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }} align="center">配送お問合せ番号</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }} align="center">商品 (削除した商品は表示されません)</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }} align="center">状態</TableCell>
                        <TableCell sx={{ backgroundColor: '#EEE' }} align="center">通知日</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        hover
                        role="checkbox"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        tabIndex={-1}
                      >
                        <TableCell component="th" id='' scope="row">
                          詳細
                        </TableCell>
                        <TableCell>
                          723225931
                        </TableCell>
                        <TableCell>
                          
                        </TableCell>
                        <TableCell>
                          テントシート グランドシート 防水シート 軽量 収納バッグ付き アウトドア キャンプ 登山 ピクニックハイキング (105x210cm, グリーン)
                        </TableCell>
                        <TableCell>
                          済
                        </TableCell>
                        <TableCell align="right">
                          2025-03-24 15:15:34
                        </TableCell>
                      </TableRow>
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
