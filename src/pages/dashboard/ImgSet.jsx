import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { InboxOutlined, CloudUploadOutlined, CloudDownloadOutlined, ReloadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
// project import
import MainCard from 'components/MainCard';
// assets
import { useEffect } from "react";
import { message, Upload } from 'antd';
import { Image } from 'antd';
import { Input, Radio } from 'antd';
import { Space, Switch } from 'antd';

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
              <Typography variant="h5">設定管理 / 装飾画像設定</Typography>
              <Typography variant="caption" color="secondary" noWrap>
                装飾画像設定します。
              </Typography>
            </Grid>

          </Grid>

          <MainCard sx={{ mt: 2 }}>

            <Grid container justifyContent="space-between">
              <Grid item sx={{ width: '100%' }}>
                <Stack spacing={3}>
                  <Grid item>
                    <Switch checkedChildren="有効" unCheckedChildren="無効" defaultChecked /><br></br>
                  </Grid>
                  <Grid item>
                    <Typography variant="h7" sx={{ marginRight: '25px' }}>
                      装飾は最初の商品登録時に行われます。<br></br>
                      登録済みの商品は装飾画像再適用または再登録を行ってください。
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Image
                      width={200}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                  </Grid>
                  <Grid item>
                    <Dragger {...props} >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">ファイルをクリックまたはドラッグします。</p>
                      <p className="ant-upload-hint">
                        縦横2000x2000以下、1MB以下のpng画像を指定してください。
                      </p>
                    </Dragger>
                    <br></br>
                  </Grid>
                  <Grid item>
                    <Typography variant="h7" sx={{ marginRight: '25px' }}>
                      装飾画像と商品画像の縦横比が違う場合の処理
                      <br></br>
                      <Radio.Group
                        style={style}
                        onChange={onChange}
                        value={value}
                        options={[
                          { value: 1, label: '装飾画像を商品画像の縦横比に合わせて変形する' },
                          { value: 2, label: '装飾画像の縦横比に合わせて商品画像の上下または左右を切り取る' },
                          { value: 3, label: '装飾画像の縦横比に合わせて商品画像の上下または左右に余白を追加する' }
                        ]}
                      />
                    </Typography>
                  </Grid>
                  <Grid item >
                    <Grid item width={150}>
                      <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', height: '41px' }}>
                        <ReloadOutlined />&nbsp;&nbsp;変更する
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
