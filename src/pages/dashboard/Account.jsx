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
              <Typography variant="h5">設定管理 / アカウント設定</Typography>
              <Typography variant="caption" color="secondary" noWrap>
                アカウント設定します。
              </Typography>
            </Grid>

          </Grid>

          <MainCard sx={{ mt: 2 }}>

            <Grid container justifyContent="space-between">
              <Grid item sx={{ width: '100%' }}>
                <Stack spacing={3}>
                  <Typography variant="h5">Wow! manager</Typography>
                  <Grid item>
                    <Grid container gap={1} alignItems={'center'}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> 仕入価格</Typography>
                      <Grid item sx={{ width: '70%' }}>
                        <TextField
                          label="仕入価格"
                          id="outlined-start-adornment"
                          sx={{ width: '100%' }}
                        /><br></br>
                      </Grid>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> APIキー</Typography>
                      <Grid item sx={{ width: '70%' }}>
                        <TextField
                          label="APIキー"
                          id="outlined-start-adornment"
                          sx={{ width: '100%' }}
                        /><br></br>
                        <Typography variant="h7" sx={{ paddingLeft: '5px', }}> 有効期限にご注意ください。</Typography>
                      </Grid>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> APIキー自動更新</Typography>
                      <Grid item>
                        <Switch checkedChildren="オン" unCheckedChildren="オフ" defaultChecked /><br></br>
                      </Grid>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> APIキー有効期限</Typography>
                      <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker label="月選択" defaultValue={dayjs('2022-04-17')} views={['year', 'month', 'day']} />
                          </DemoContainer>
                        </LocalizationProvider><br></br>
                        <Typography variant="h7" sx={{ paddingLeft: '5px', }}> 有効期限の一週間前から自動更新を行います。</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>

          <MainCard sx={{ mt: 2 }}>

            <Grid container justifyContent="space-between">
              <Grid item sx={{ width: '100%' }}>
                <Stack spacing={3}>
                  <Typography variant="h5">Amazon SP-API</Typography>
                  <Grid item>
                    <Grid container gap={1} alignItems={'center'}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> client_id</Typography>
                      <Grid item sx={{ width: '70%' }}>
                        <TextField
                          label="client_id"
                          id="outlined-start-adornment"
                          sx={{ width: '100%' }}
                        /><br></br>
                      </Grid>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> client_secret</Typography>
                      <Grid item sx={{ width: '70%' }}>
                        <TextField
                          label="client_secret"
                          id="outlined-start-adornment"
                          sx={{ width: '100%' }}
                        /><br></br>
                      </Grid>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> application_id</Typography>
                      <Grid item sx={{ width: '70%' }}>
                        <TextField
                          label="application_id"
                          id="outlined-start-adornment"
                          sx={{ width: '100%' }}
                        /><br></br>
                      </Grid>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> refresh_token
                      </Typography>
                      <Grid item sx={{ width: '70%' }}>
                        <TextField
                          label="refresh_token"
                          id="outlined-start-adornment"
                          sx={{ width: '100%' }}
                        /><br></br>
                      </Grid>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>

          <MainCard sx={{ mt: 2 }}>

            <Grid container justifyContent="space-between">
              <Grid item sx={{ width: '100%' }}>
                <Stack spacing={3}>
                  <Typography variant="h5">商品</Typography>
                  <Grid item>
                    <Grid container gap={1} alignItems={'center'}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> 在庫数</Typography>
                      <Grid item sx={{ width: '70%' }}>
                        <TextField
                          label="在庫数"
                          id="outlined-start-adornment"
                          sx={{ width: '100%' }}
                        /><br></br>
                        <Typography variant="h7" sx={{ paddingLeft: '5px', }}> 出品済み商品への適用は、商品ごとに販売状態が変化したか受注を処理した時に行われます。</Typography>
                      </Grid>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> 最大画像枚数</Typography>
                      <Grid item sx={{ width: '70%' }}>
                        <TextField
                          label="最大画像枚数"
                          id="outlined-start-adornment"
                          sx={{ width: '100%' }}
                        /><br></br>
                        <Typography variant="h7" sx={{ paddingLeft: '5px', }}> 出品済み商品へは適用されません。</Typography>
                      </Grid>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> 必須FBA出品者数</Typography>
                      <Grid item sx={{ width: '70%' }}>
                        <TextField
                          label="必須FBA出品者数"
                          id="outlined-start-adornment"
                          sx={{ width: '100%' }}
                        /><br></br>
                        <Typography variant="h7" sx={{ paddingLeft: '5px', }}>FBAの出品者数がこれ未満の商品は在庫切れとします。 出品済み商品への適用は、次回の定期更新時に行われます。</Typography>
                      </Grid>
                    </Grid>

                  </Grid>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>

          <MainCard sx={{ mt: 2 }}>

            <Grid container justifyContent="space-between">
              <Grid item sx={{ width: '100%' }}>
                <Stack spacing={3}>
                  <Typography variant="h5">発送通知メール</Typography>
                  <Grid item>
                    <Grid container gap={1} alignItems={'center'}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> 店舗名</Typography>
                      <Grid item sx={{ width: '70%' }}>
                        <TextField
                          label="店舗名"
                          id="outlined-start-adornment"
                          sx={{ width: '100%' }}
                        /><br></br>
                      </Grid>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> 送信元メールアドレス</Typography>
                      <Grid item sx={{ width: '70%' }}>
                        <TextField
                          label="送信元メールアドレス"
                          id="outlined-start-adornment"
                          sx={{ width: '100%' }}
                        /><br></br>
                      </Grid>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> お問い合わせ先メールアドレス</Typography>
                      <Grid item sx={{ width: '70%' }}>
                        <TextField
                          label="お問い合わせ先メールアドレス"
                          id="outlined-start-adornment"
                          sx={{ width: '100%' }}
                        /><br></br>
                      </Grid>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> 本文ヘッダー
                      </Typography>
                      <Grid item sx={{ width: '70%' }}>
                        <TextField
                          label="本文ヘッダー"
                          id="outlined-start-adornment"
                          placeholder="ASIN ASIN ASIN"
                          multiline
                          rows={5}
                          sx={{ width: '100%' }}
                        /><br></br>
                      </Grid>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> 本文フッター
                      </Typography>
                      <Grid item sx={{ width: '70%' }}>
                        <TextField
                          label="本文フッター"
                          id="outlined-start-adornment"
                          placeholder="ASIN ASIN ASIN"
                          multiline
                          rows={5}
                          sx={{ width: '100%' }}
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
