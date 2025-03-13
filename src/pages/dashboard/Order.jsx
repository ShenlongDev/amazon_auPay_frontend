import { useState, React } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Box from '@mui/material/Box';
import { AlertOutlined, HistoryOutlined, CheckOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { useEffect } from "react";
import Modal from '@mui/material/Modal';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { minWidth } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -30%)',
  width: '50%',
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

  const handleDeliveryMsgHistory = async () => {
    location.href = "/delivery_msg_history"
  }
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    // setAge(event.target.);
  };

  useEffect(() => {

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
            発送通知
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} gap={2}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={12} md={5} lg={5} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']} >
                    <DatePicker label="発送日" defaultValue={dayjs('2022-04-17')} />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={5} lg={5} sx={{textAlign: 'right'}} pt={1}>
                <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#52c41a' }} onClick={() => handleOpen()}  >
                  <CheckOutlined />&nbsp;&nbsp;確認
                </Button>
              </Grid>
            </Grid>

            <Grid item mt={3}>
              <TextField sx={{ width: '100%' }}
                id="outlined-multiline-static"
                label="対象"
                placeholder="タブと改行区切りで入力してください。

受注番号	配送お問合せ番号
受注番号	配送お問合せ番号
受注番号	配送お問合せ番号
..."
                multiline
                rows={10}
                defaultValue="Default Value"
              />
            </Grid>
            <Grid container alignItems="center" justifyContent="space-between" mt={2} gap={2}>
              <Grid item xs={12} md={5} lg={5} >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">宅配便の配送業者</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Rukuten 1</MenuItem>
                    <MenuItem value={20}>Rukuten 2</MenuItem>
                    <MenuItem value={30}>Rukuten 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5} lg={5} >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">宅配便の配送業者</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Rukuten 1</MenuItem>
                    <MenuItem value={20}>Rukuten 2</MenuItem>
                    <MenuItem value={30}>Rukuten 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Typography>
        </Box>
      </Modal>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} >
        <Grid item xs={12} md={12} lg={12} >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">財務管理 / 注文処理</Typography>
              <Typography variant="caption" color="secondary" noWrap>
                注文処理状況を表示します。
              </Typography>
            </Grid>
            <Grid item />
          </Grid>

          <MainCard sx={{ mt: 2 }}>
            <Grid container justifyContent="space-between">
              <Grid item sx={{ width: '100%' }}>
                <Stack spacing={3}>
                  <Grid container justifyContent="space-between" gap={2} alignItems="center" sx={{ marginTop: '5px !important', }}>

                    <Grid item sx={{ display: 'flex', gap: 1, width: '100%' }} >
                      <Grid item xs={12} md={3} lg={3}>
                        新規受付
                      </Grid>
                      <Grid item xs={12} md={9} lg={9} sx={{ display: 'flex' }}>
                        Wow! manager で受注メール作成 ( 9 )
                      </Grid>
                    </Grid>
                    <Grid item sx={{ display: 'flex', gap: 1, width: '100%' }} >
                      <Grid item xs={12} md={3} lg={3}>
                        処理中
                      </Grid>
                      <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
                        宅配便 ( 0 )
                      </Grid>
                      <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
                        メール便 ( 0 )
                      </Grid>
                      <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
                        全て ( 0 )
                      </Grid>
                    </Grid>
                    <Grid item sx={{ display: 'flex', gap: 1, width: '100%' }} >
                      <Grid item xs={12} md={3} lg={3}>
                        処理済み
                      </Grid>
                      <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
                        宅配便 ( 0 )
                      </Grid>
                      <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
                        メール便 ( 0 )
                      </Grid>
                      <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
                        全て ( 0 )
                      </Grid>
                    </Grid>
                    <Grid item sx={{ display: 'flex', gap: 1, width: '100%' }} >
                      <Grid item xs={12} md={3} lg={3}>
                        保留
                      </Grid>
                      <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
                        宅配便 ( 0 )
                      </Grid>
                      <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
                        メール便 ( 0 )
                      </Grid>
                      <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
                        全て ( 0 )
                      </Grid>
                    </Grid>
                    <Grid item sx={{ display: 'flex', gap: 1, width: '100%' }} >
                      <Button size="big" variant="contained" sx={{ textTransform: 'capitalize' }} onClick={() => handleOpen()}  >
                        <AlertOutlined />&nbsp;&nbsp;発送通知
                      </Button>
                      <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#faad14' }} onClick={() => handleDeliveryMsgHistory()} >
                        <HistoryOutlined />&nbsp;&nbsp;発送通知履歴
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
