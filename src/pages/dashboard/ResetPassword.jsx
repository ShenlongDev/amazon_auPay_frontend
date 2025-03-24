import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { InboxOutlined, CloudUploadOutlined, CloudDownloadOutlined, ReloadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
// project import
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MainCard from 'components/MainCard';
// assets
import { useEffect } from "react";
import { message, Upload } from 'antd';
import { Image } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Space, Switch } from 'antd';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';


const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  height: '200px',
  width: '300px',
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
const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //
export default function DashboardDefault() {

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {

    }

  }, []);

  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>

      <Grid container rowSpacing={4.5} columnSpacing={2.75} >

        <Grid item xs={12} md={12} lg={12} >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">設定管理 / パスワード変更</Typography>
              <Typography variant="caption" color="secondary" noWrap>
                パスワード変更アカウント設定します。
              </Typography>
            </Grid>

          </Grid>

          <MainCard sx={{ mt: 2 }}>

            <Grid container justifyContent="space-between">
              <Grid item sx={{ width: '100%' }}>
                <Stack spacing={3}>
                  <Grid item>
                    <Grid container gap={1} alignItems={'center'}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '150px' }}> 現在のパスワード</Typography>
                      <Grid item sx={{ width: '70%' }}>
                        <TextField
                          label="現在のパスワード"
                          id="outlined-start-adornment"
                          sx={{ width: '350px' }}
                        /><br></br>
                      </Grid>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '150px' }}> 新しいパスワード</Typography>
                      <Grid item sx={{ width: '70%' }}>
                        <TextField
                          label="新しいパスワード"
                          id="outlined-start-adornment"
                          sx={{ width: '350px' }}
                        /><br></br>
                      </Grid>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '150px' }}> 新しいパスワード(確認)</Typography>
                      <Grid item sx={{ width: '70%' }}>
                        <TextField
                          label="新しいパスワード(確認)"
                          id="outlined-start-adornment"
                          sx={{ width: '350px' }}
                        /><br></br>
                      </Grid>
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
