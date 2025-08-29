import React, { useState } from 'react';
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
import axios from 'axios';
import { Input, Radio } from 'antd';
import { Space, Switch } from 'antd';

const server = "http://localhost:5050/";

const { Dragger } = Upload;

const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //
export default function DashboardDefault() {
  const props = {
    name: 'file',
    multiple: true,
    height: '200px',
    width: '300px',
    action: `${import.meta.env.VITE_PUBLIC_URL}users/imguload`,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("access_token")}`
    },
    async onChange(info) {
      const { status } = info.file;
     
      if (status === 'done') {
        const responseFiles = info.fileList[info.fileList.length - 1].response?.files[0]?.filename;      
  
        if (responseFiles) {
          try {
            const img_url = `${server}uploads/${responseFiles}`;          
            setImgInitUrl(img_url);     
            localStorage.setItem("img_init_url", responseFiles)        
          } catch (error) {
            
          }
        } else {
         
        }
  
      } else if (status === 'error') {
       
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const [img_init_url, setImgInitUrl] = useState(`${server}uploads/default.png`);
  const [img_init_config, setImgInitConfig] = useState(1);
  const [img_init_agree, setImgInitAgree] = useState(0);

  const onChange = (e) => {
    setImgInitConfig(e.target.value);
  };
  
  const onChangeAgree = (checked) => {
    setImgInitAgree(checked ? 1 : 0); // Update state based on switch
  };

  const checkImageExists = async (imgUrl) => {
    try {
      const response = await axios.get(imgUrl);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  const save =  async () =>{
    const requestData = {
      img_init_agree: img_init_agree,
      img_init_config: img_init_config,
      img_init_url: localStorage.getItem("img_init_url") 
    };
    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}users/imgInitSave`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then(async (response) => {
        // console.log(response.data.email);       

      })
      .catch((error) => {
        if (error.status == 401 || error.status == 500) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });

  }

  const getData = async () => {
    const requestData = {
      userId: '1'
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}users/getinfo`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then(async (response) => {
        // console.log(response.data.email);   
        const imgUrl = `${server}uploads/${response.data.user.img_init_url}`;
        const exists = await checkImageExists(imgUrl);
        if (exists) {
          setImgInitUrl(imgUrl);
          localStorage.setItem("img_init_url", response.data.user.img_init_url)
        }else{
          localStorage.setItem("img_init_url", "default.png")
        }

        if(response.data.user.img_init_agree == 1){          
          setImgInitAgree(1);
        }
       

        if(response.data.user.img_init_config){
          setImgInitConfig(response.data.user.img_init_config);
        }

      })
      .catch((error) => {
        if (error.status == 401 || error.status == 500) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });
  }

  useEffect(() => {
    getData();
  }, []);

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
                    <Switch checkedChildren="有効" unCheckedChildren="無効" checked={img_init_agree === 1} onChange={onChangeAgree}/><br></br>
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
                      src={img_init_url}
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
                        value={img_init_config}
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
                      <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', height: '41px' }} onClick={save}>
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
