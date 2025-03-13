import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import axios from 'axios';
import { CheckOutlined , KeyOutlined, CloudDownloadOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
// project import
import MainCard from 'components/MainCard';
// assets
import { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { CheckBox } from '@mui/icons-material';

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

  const [age, setAge] = useState('');

  const handleChange = (event) => {
    // setAge(event.target.);
  };

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
              <Typography variant="h5">商品登録 / 商品一覧</Typography>
              <Typography variant="caption" color="secondary" noWrap>
                商品一覧を表示します。
              </Typography>
            </Grid>

            <Grid display={'flex'} gap={2}>
              <Grid alignContent={'center'}>
                管理商品数：49771 / 50000 件 | マーケット登録商品数：46260 件
              </Grid>
              <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', marginRight: '3px' }} >
                <CloudDownloadOutlined />&nbsp;&nbsp;CSV出力
              </Button>
              {/* <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#faad14' }} onClick={() => handleOpen()} >
                <FunctionOutlined />&nbsp;&nbsp;手数料設定
              </Button> */}
            </Grid>
          </Grid>

          <MainCard sx={{ mt: 2 }}>
            <Grid container alignItems="center" justifyContent="space-between">

              <Grid>

                {/* <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#faad14' }} onClick={() => handleOpen()} >
                <FunctionOutlined />&nbsp;&nbsp;手数料設定
              </Button> */}
              </Grid>
            </Grid>
            <Accordion sx={{ marginTop: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Grid container justifyContent="space-between" >
                  <Grid item>
                    <TextField
                      label="ASIN, ロットナンバー, 商品コード"
                      id="outlined-start-adornment"
                      sx={{ width: 500, minWidth: 300 }}
                      slotProps={{
                        input: {
                          startAdornment: <InputAdornment position="start"><KeyOutlined /></InputAdornment>,
                        },
                      }}
                    />
                    <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', marginRight: '3px', height: '41px' }} >
                      検索
                    </Button>
                  </Grid>
                  <Grid item alignContent={'center'}>
                    <Typography variant="h7"> <PlusOutlined /> 検索条件 </Typography>
                  </Grid>
                </Grid>

              </AccordionSummary>
              <AccordionDetails>
                sdf
              </AccordionDetails>
            </Accordion>
            <Grid container justifyContent="space-between">
              <Grid item sx={{ width: '100%' }}>
                <Stack spacing={3}>
                  <Grid container justifyContent="space-between" gap={2} alignItems="center" sx={{ marginTop: '5px !important', }}>

                    <Grid container justifyContent="space-between" mt={2}>
                      <Grid item >
                        <Grid container >
                          <Grid item width={150}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">アクション</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                              >
                                <MenuItem value={10}>ホワイトASIN登録</MenuItem>
                                <MenuItem value={20}>ホワイトASIN解除</MenuItem>
                                <MenuItem value={30}>商品再登録</MenuItem>
                                <MenuItem value={30} sx={{ backgroundColor: '#FF0000', color: '#FFF' }}>削除してNGに登録</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item width={150}>
                            <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#52c41a', height:'41px' }}>
                              <CheckOutlined />&nbsp;&nbsp;確認
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item alignContent={'center'}>
                        <FormControl sx={{ width: 100 }}>
                          <InputLabel id="demo-simple-select-label">表示件数</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                          >
                            <MenuItem value={10}>50</MenuItem>
                            <MenuItem value={20}>100</MenuItem>
                            <MenuItem value={30}>250</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>

                    <Table aria-labelledby="tableTitle">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ backgroundColor: '#EEE' }}>
                            {/* <CheckBox></CheckBox> */}
                          </TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }}>商品名</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }}>ブランド</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }}>Link</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }}>状態</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }}>登録日</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }}>画像</TableCell>
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
    </>
  );
}
