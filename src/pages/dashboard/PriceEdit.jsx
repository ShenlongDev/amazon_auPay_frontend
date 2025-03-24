import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { CheckOutlined, InboxOutlined, CloudDownloadOutlined, ReloadOutlined, PlusOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

// project import
import MainCard from 'components/MainCard';
// assets
import { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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

const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  height: '200px',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //
export default function DashboardDefault() {
 
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

      <Grid container rowSpacing={4.5} columnSpacing={2.75} >

        <Grid item xs={12} md={12} lg={12} >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">設定管理 / 価格設定</Typography>
              <Typography variant="caption" color="secondary" noWrap>
                価格設定情報を表示します。
              </Typography>
            </Grid>

            <Grid display={'flex'} gap={2}>
              <Grid alignContent={'center'}>
                宅配便追加上乗せ固定値 :  0 円 | メール便追加上乗せ固定値： 0 円
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

                  <Grid item alignContent={'center'}>
                    <Typography variant="h7"> <PlusOutlined /> 設定情報 </Typography>
                  </Grid>
                </Grid>

              </AccordionSummary>
              <AccordionDetails>
                <Grid container justifyContent="space-between" mt={3}>
                  <Grid item>
                    <Dragger {...props} >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">ファイルをクリックまたはドラッグします。</p>
                      <p className="ant-upload-hint">
                        価格設定を指定のファイルで置き換えます。<br />現在の設定は全て消去されます。
                      </p>
                    </Dragger>
                    <br></br>
                    <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', marginRight: '3px', height: '41px' }} >
                      <CloudUploadOutlined />&nbsp;&nbsp;インポート
                    </Button>
                  </Grid>
                  <Grid item>
                    <Grid container gap={1} alignItems={'center'}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '100px' }}> 仕入価格</Typography>
                      <TextField
                        label="仕入価格"
                        id="outlined-start-adornment"
                        sx={{ width: '250px' }}
                        slotProps={{
                          input: {
                            startAdornment: <InputAdornment position="end">円以上</InputAdornment>,
                            type: "number",
                          },
                        }}
                      />
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '100px' }}> 上乗せ比率</Typography>
                      <TextField
                        label="上乗せ比率"
                        id="outlined-start-adornment"
                        sx={{ width: '250px' }}
                        slotProps={{
                          input: {
                            startAdornment: <InputAdornment position="end">%</InputAdornment>,
                            type: "number",
                          },
                        }}
                      />
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '100px' }}> 上乗せ固定値</Typography>
                      <TextField
                        label="上乗せ固定値"
                        id="outlined-start-adornment"
                        sx={{ width: '250px' }}
                        slotProps={{
                          input: {
                            startAdornment: <InputAdornment position="end">円</InputAdornment>,
                            type: "number",
                          },
                        }}
                      />
                    </Grid>
                    <br></br>
                    <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', marginRight: '3px', height: '41px' }} >
                      <PlusOutlined />&nbsp;&nbsp;追加
                    </Button>
                  </Grid>
                  <Grid item mt={2}>
                    <Grid container gap={1} alignItems={'center'}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '100px' }}> 宅配便追加上乗せ固定値</Typography>
                      <TextField
                        label="宅配便追加上乗せ固定値"
                        id="outlined-start-adornment"
                        sx={{ width: '250px' }}
                        slotProps={{
                          input: {
                            startAdornment: <InputAdornment position="end">円</InputAdornment>,
                            type: "number",
                          },
                        }}
                      />
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '100px' }}> メール便追加上乗せ固定値</Typography>
                      <TextField
                        label="メール便追加上乗せ固定値"
                        id="outlined-start-adornment"
                        sx={{ width: '250px' }}
                        slotProps={{
                          input: {
                            startAdornment: <InputAdornment position="end">円</InputAdornment>,
                            type: "number",
                          },
                        }}
                      />
                    </Grid>                    
                    <br></br>
                    <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', marginRight: '3px', height: '41px', backgroundColor: '#52c41a' }} >
                      <ReloadOutlined />&nbsp;&nbsp;更新
                    </Button>
                  </Grid>

                </Grid>

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
                            <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#52c41a', height: '41px' }}>
                              <CheckOutlined />&nbsp;&nbsp;確認
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>

                    </Grid>

                    <Table aria-labelledby="tableTitle">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ backgroundColor: '#EEE' }}>
                            {/* <CheckBox></CheckBox> */}
                          </TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }}>仕入価格(円)</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }}>上乗せ比率(%)</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }}>上乗せ固定値(円)</TableCell>        
                          <TableCell sx={{ backgroundColor: '#EEE' }}>_</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }}>_</TableCell>
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
