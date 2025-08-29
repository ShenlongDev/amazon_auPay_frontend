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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

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
//0:クロネコヤマト
//1:佐川急便
//2:福山通運
//3:西濃運輸
//4:日本郵便
//5:Rakuten EXPRESS
const service_list = [
  {
    value: 100,
    label: '---'
  },
  {
    value: 0,
    label: 'クロネコヤマト'
  },
  {
    value: 1,
    label: '佐川急便'
  },
  {
    value: 2,
    label: '福山通運'
  },
  {
    value: 3,
    label: '西濃運輸'
  },
  {
    value: 4,
    label: '日本郵便'
  },
  {
    value: 5,
    label: 'Rakuten EXPRESS'
  },
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //
export default function DashboardDefault() {

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {

    }

  }, []);
  //メール便の配送業者の既定値
  const [account_delivery, setAccountDelivery] = useState(100);
  const handleChange_account_delivery = (e) => {
    setAccountDelivery(e.target.value);
  };
  //メール便の配送業者の既定値
  const [account_mail_server, setAccountMailServer] = useState(100);
  const handleChange_account_mail_server = (e) => {
    setAccountMailServer(e.target.value);
  };

  const [account_company_info, setAccountCompanyInfo] = useState('');
  const handleChange_account_company_info = (e) => {
    setAccountCompanyInfo(e.target.value);
  };
  const [account_au_api, setAccountAuApi] = useState('');
  const handleChange_account_au_api = (e) => {
    setAccountAuApi(e.target.value);
  };
  const [account_sp_api_client_id, setAccountSpApiClientId] = useState('');
  const handleChange_account_sp_api_client_id = (e) => {
    setAccountSpApiClientId(e.target.value);
  };
  const [account_sp_api_client_secret, setAccountSpApiClientSecret] = useState('');
  const handleChange_account_sp_api_client_secret = (e) => {
    setAccountSpApiClientSecret(e.target.value);
  };
  const [account_sp_api_application_id, setAccountSpApiApplicationId] = useState('');
  const handleChange_account_sp_api_application_id = (e) => {
    setAccountSpApiApplicationId(e.target.value);
  };
  const [account_sp_api_refresh_token, setAccountSpApiRefreshToken] = useState('');
  const handleChange_account_sp_api_refresh_token = (e) => {
    setAccountSpApiRefreshToken(e.target.value);
  };
  const [account_stock, setAccountStock] = useState(0);
  const handleChange_account_stock = (e) => {
    setAccountStock(e.target.value);
  };
  const [account_img_count, setAccountImgCount] = useState(0);
  const handleChange_account_img_count = (e) => {
    setAccountImgCount(e.target.value);
  };
  const [account_fba_count, setAccountFbaCount] = useState(0);
  const handleChange_account_fba_count = (e) => {
    setAccountFbaCount(e.target.value);
  };
  const [account_store, setAccountStore] = useState('');
  const handleChange_account_store = (e) => {
    setAccountStore(e.target.value);
  };
  const [account_mail, setAccountMail] = useState('');
  const handleChange_account_mail = (e) => {
    setAccountMail(e.target.value);
  };
  const [account_mail_contact, setAccountMailContact] = useState('');
  const handleChange_account_mail_contact = (e) => {
    setAccountMailContact(e.target.value);
  };
  const [account_mail_head, setAccountMailHead] = useState('');
  const handleChange_account_mail_head = (e) => {
    setAccountMailHead(e.target.value);
  };
  const [account_mail_txt, setAccountMailTxt] = useState('');
  const handleChange_account_mail_txt = (e) => {
    setAccountMailTxt(e.target.value);
  };

  const [account_au_api_auto_update, setAccountAuApiAutoupdate] = useState(0);
  const onChangeAgree = (checked) => {
    setAccountAuApiAutoupdate(checked ? 1 : 0); // Update state based on switch
  };

  const [account_au_api_expiry_date, setAccountAuApiExpiryDate] = useState(dayjs());
  const handleChange_date = (newDate, dateString) => {
    setAccountAuApiExpiryDate(newDate);
  };

  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };

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
        console.log(response.data.user);
        if (response.data.user.account_company_info) {
          setAccountCompanyInfo(response.data.user.account_company_info);
        }
        if (response.data.user.account_au_api) {
          setAccountAuApi(response.data.user.account_au_api);
        }
        if (response.data.user.account_au_api_auto_update) {
          setAccountAuApiAutoupdate(response.data.user.account_au_api_auto_update * 1);
        }

        setAccountAuApiExpiryDate(dayjs(response.data.user.account_au_api_expiry_date));    

        if (response.data.user.account_sp_api_client_id) {
          setAccountSpApiClientId(response.data.user.account_sp_api_client_id);
        }
        if (response.data.user.account_sp_api_client_secret) {
          setAccountSpApiClientSecret(response.data.user.account_sp_api_client_secret);
        }
        if (response.data.user.account_sp_api_application_id) {
          setAccountSpApiApplicationId(response.data.user.account_sp_api_application_id);
        }
        if (response.data.user.account_sp_api_refresh_token) {
          setAccountSpApiRefreshToken(response.data.user.account_sp_api_refresh_token);
        }
        if (response.data.user.account_stock) {
          setAccountStock(response.data.user.account_stock);
        }
        if (response.data.user.account_img_count) {
          setAccountImgCount(response.data.user.account_img_count);
        }
        if (response.data.user.account_fba_count) {
          setAccountFbaCount(response.data.user.account_fba_count);
        }
        if (response.data.user.account_store) {
          setAccountStore(response.data.user.account_store);
        }
        if (response.data.user.account_mail) {
          setAccountMail(response.data.user.account_mail);
        }
        if (response.data.user.account_mail_contact) {
          setAccountMailContact(response.data.user.account_mail_contact);
        }
        if (response.data.user.account_mail_head) {
          setAccountMailHead(response.data.user.account_mail_head);
        }
        if (response.data.user.account_mail_txt) {
          setAccountMailTxt(response.data.user.account_mail_txt);
        }
        if (response.data.user.account_delivery) {
          setAccountDelivery(response.data.user.account_delivery);
        }
        if (response.data.user.account_mail_server) {
          setAccountMailServer(response.data.user.account_mail_server);
        }
      })
      .catch((error) => {
        if (error.status == 401 || error.status == 500) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });
  }
  const formatDate = (date) => {
    if (!date) return '';
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  const save = async () => {
    const requestData = {

      account_company_info: account_company_info,
      account_au_api: account_au_api,
      account_au_api_auto_update: account_au_api_auto_update,
      account_sp_api_client_id: account_sp_api_client_id,
      account_sp_api_client_secret: account_sp_api_client_secret,

      account_sp_api_application_id: account_sp_api_application_id,
      account_sp_api_refresh_token: account_sp_api_refresh_token,
      account_stock: account_stock,
      account_fba_count: account_fba_count,
      account_store: account_store,

      account_mail: account_mail,
      account_mail_contact: account_mail_contact,
      account_mail_head: account_mail_head,
      account_mail_txt: account_mail_txt,
      account_delivery: account_delivery,

      account_mail_server: account_mail_server,
      account_img_count: account_img_count,
      account_au_api_expiry_date: formatDate(new Date(account_au_api_expiry_date))

    };
    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}users/imgAccountSave`, requestData, {
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
  useEffect(() => {
    getData();
  }, []);

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
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> 会員番号</Typography>
                      <Grid item sx={{ width: '70%' }}>
                        <TextField
                          label="会員番号"
                          id="outlined-start-adornment"
                          sx={{ width: '100%' }}
                          value={account_company_info}
                          onChange={handleChange_account_company_info}
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
                          value={account_au_api}
                          onChange={handleChange_account_au_api}
                        /><br></br>
                        <Typography variant="h7" sx={{ paddingLeft: '5px', }}> 有効期限にご注意ください。</Typography>
                      </Grid>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> APIキー自動更新</Typography>
                      <Grid item>
                        <Switch checkedChildren="オン" unCheckedChildren="オフ" checked={account_au_api_auto_update === 1} onChange={onChangeAgree} /><br></br>
                      </Grid>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> APIキー有効期限</Typography>
                      <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker label="月選択" value={account_au_api_expiry_date} views={['year', 'month', 'day']} onChange={handleChange_date} />
                          </DemoContainer>
                        </LocalizationProvider>
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
                          value={account_sp_api_client_id}
                          onChange={handleChange_account_sp_api_client_id}
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
                          value={account_sp_api_client_secret}
                          onChange={handleChange_account_sp_api_client_secret}
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
                          value={account_sp_api_application_id}
                          onChange={handleChange_account_sp_api_application_id}
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
                          value={account_sp_api_refresh_token}
                          onChange={handleChange_account_sp_api_refresh_token}
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
                          slotProps={{
                            input: {
                              startAdornment: <InputAdornment position="end"></InputAdornment>,
                              type: "number",
                            },
                          }}
                          value={account_stock}
                          onChange={handleChange_account_stock}
                        /><br></br>
                        <Typography variant="h7" sx={{ paddingLeft: '5px', }}>
                          出品済み商品への適用は、商品ごとに販売状態が変化したか受注を処理した時に行われます。
                        </Typography><br></br><br></br>
                      </Grid>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> 最大画像枚数</Typography>
                      <Grid item sx={{ width: '70%' }}>
                        <TextField
                          label="最大画像枚数"
                          id="outlined-start-adornment"
                          sx={{ width: '100%' }}
                          slotProps={{
                            input: {
                              startAdornment: <InputAdornment position="end"></InputAdornment>,
                              type: "number",
                            },
                          }}
                          value={account_img_count}
                          onChange={handleChange_account_img_count}
                        /><br></br>
                        <Typography variant="h7" sx={{ paddingLeft: '5px', }}> 出品済み商品へは適用されません。</Typography><br></br><br></br>
                      </Grid>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> 必須FBA出品者数</Typography>
                      <Grid item sx={{ width: '70%' }}>
                        <TextField
                          label="必須FBA出品者数"
                          id="outlined-start-adornment"
                          sx={{ width: '100%' }}
                          slotProps={{
                            input: {
                              startAdornment: <InputAdornment position="end"></InputAdornment>,
                              type: "number",
                            },
                          }}
                          value={account_fba_count}
                          onChange={handleChange_account_fba_count}
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
                          value={account_store}
                          onChange={handleChange_account_store}
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
                          value={account_mail}
                          onChange={handleChange_account_mail}
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
                          value={account_mail_contact}
                          onChange={handleChange_account_mail_contact}
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
                          value={account_mail_head}
                          onChange={handleChange_account_mail_head}
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
                          value={account_mail_txt}
                          onChange={handleChange_account_mail_txt}
                          sx={{ width: '100%' }}
                        /><br></br>
                      </Grid>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> 宅配便の配送業者の既定値
                      </Typography>
                      <FormControl sx={{ width: '200px' }}>
                        <InputLabel id="account-delivery">宅配便の配送業者の既定値</InputLabel>
                        <Select
                          //メール便の配送業者の既定値
                          labelId="account-delivery"
                          id="account-delivery-select"
                          value={account_delivery}
                          label="宅配便の配送業者の既定値"
                          onChange={handleChange_account_delivery}
                        >
                          {service_list.map((option) => (
                            <MenuItem key={option.value} value={option.value} name={option.label}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '120px' }}> メール便の配送業者の既定値
                      </Typography>
                      <FormControl sx={{ width: '200px' }}>
                        <InputLabel id="account-mail-server">メール便の配送業者の既定値</InputLabel>
                        <Select
                          //メール便の配送業者の既定値
                          labelId="account-mail-server"
                          id="account-mail-server-select"
                          value={account_mail_server}
                          label="メール便の配送業者の既定値"
                          onChange={handleChange_account_mail_server}
                        >
                          {service_list.map((option) => (
                            <MenuItem key={option.value} value={option.value} name={option.label}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
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
