import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import axios from 'axios';
import { FunctionOutlined, CloudDownloadOutlined, ReloadOutlined } from '@ant-design/icons';
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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -30%)',
  width: 400,
  minWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //
export default function DashboardDefault() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {

    }

  }, []);


  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            販売手数料率
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} gap={2}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={12} >
                <TextField
                  label="販売手数料率"
                  id="outlined-start-adornment"
                  sx={{ width: '100%' }}
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start">%</InputAdornment>,
                      type: "number",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'right' }} pt={1}>
                <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#52c41a' }} onClick={() => handleOpen()}  >
                  <ReloadOutlined />&nbsp;&nbsp;更新
                </Button>
              </Grid>
            </Grid>
          </Typography>
        </Box>
      </Modal>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} >
        <Grid item xs={12} md={12} lg={12} >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">財務管理 / 損益管理</Typography>
              <Typography variant="caption" color="secondary" noWrap>
                損益状況を表示します。
              </Typography>
            </Grid>

            <Grid>
              <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', marginRight: '3px' }} >
                <CloudDownloadOutlined />&nbsp;&nbsp;CSV出力
              </Button>
              <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#faad14' }} onClick={() => handleOpen()} >
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
                      <Grid item xs={12} md={9} lg={9} sx={{ display: 'flex', fontWeight: '700', color: '#FF0000' }} pt={2}>
                        <Grid item xs={12} md={4} lg={4}>売上げ(515,173円)</Grid>
                        <Grid item xs={12} md={4} lg={4}>利益(32,311円)</Grid>
                        <Grid item xs={12} md={4} lg={4}>利益率(6.27%)</Grid>
                      </Grid>
                    </Grid>
                    <Table aria-labelledby="tableTitle">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ backgroundColor: '#EEE' }} align="center">受注番号</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }} align="center">注文日時</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }} align="center">ASIN</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }} align="center">商品名</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }} align="center">Amazon価格</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }} align="center">販売価格</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }} align="center">手数料</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }} align="center">個数</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }} align="center">利益</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }} align="center">利率</TableCell>
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
                            721963414
                          </TableCell>
                          <TableCell>
                            2025-03-01 00:04:00
                          </TableCell>
                          <TableCell>
                            B0CNQW4KBB
                          </TableCell>
                          <TableCell>
                            CIO マグネットケーブル専用取換端子 USB Type-C Micro-USB 磁石で脱着 防水規格 IPX5対応 iphone15 タイプC 交換用 端子 (USB Type-C,
                          </TableCell>
                          <TableCell>
                            1100
                          </TableCell>
                          <TableCell align="right">
                            1320
                          </TableCell>
                          <TableCell align="right">
                            132
                          </TableCell>
                          <TableCell align="right">
                            1
                          </TableCell>
                          <TableCell align="right">
                            88
                          </TableCell>
                          <TableCell align="right">
                            6.67%
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

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
