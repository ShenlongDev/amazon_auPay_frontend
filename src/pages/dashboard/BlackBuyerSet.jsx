import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { DeleteOutlined, KeyOutlined, CloudDownloadOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
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

  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectAll = (event) => {
    const ids = rows.map(row => row.id);
    if (event.target.checked) {
      setSelectedRows(ids);
    } else {
      setSelectedRows([]);
    }
  };

  const getData = async () => {
    const requestData = {
      userId: localStorage.getItem("user_id")
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}users/getbuyer`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then(async (response) => {
        // console.log(response.data.email);           
        setRows(response.data.user);
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

  const [age, setAge] = useState('');

  const handleChange = (event) => {
    // setAge(event.target.);
  };


  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = '試合名は必須です。';
    }
    return Object.keys(newErrors).length === 0;

  };
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
    setIsValid(validateEmail(value));
  };

  const [isValidPhone, setIsValidPhone] = useState(true);
  const validatePhone = (phone) => {
    const regex = /^(0\d{1,2}-\d{3,4}-\d{4}|\d{10,11})$/;
    return regex.test(phone);
  };
  const handleChangePhone = (event) => {
    const value = event.target.value;
    setPhone(value);
    setIsValidPhone(validatePhone(value));
  };

  const update = async () => {
    const requestData = {
      user_id: localStorage.getItem("user_id"),
      sel_id: localStorage.getItem("sel_id"),
      name: name,
      phone: phone,
      address: address,
      email: email
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}users/getbuyerupdate`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then(async (response) => {
        // console.log(response.data.email);           
        // setRows(response.data.user);
        getData();
      })
      .catch((error) => {
        if (error.status == 401 || error.status == 500) {
          alert("ログインをお願いします。");
          // window.location.href = "./login";
        }
      });
  }
  const add = async () => {
    const requestData = {
      user_id: localStorage.getItem("user_id"),
      name: name,
      phone: phone,
      address: address,
      email: email
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}users/getbuyeradd`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then(async (response) => {
        // console.log(response.data.email);           
        // setRows(response.data.user);
        getData();
      })
      .catch((error) => {
        if (error.status == 401 || error.status == 500) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });
  }
  const editRow = async (row) => {
    setName(row.name);
    setAddress(row.address);
    setPhone(row.phone);
    setEmail(row.email);
    localStorage.setItem("sel_id", row.id)
  }
  const alldel = async () => {
    if (window.confirm("『削除』確認をお願いします。")) {


      const requestData = {
        user_id: localStorage.getItem("user_id"),
        sels: selectedRows
      };

      await axios.post(`${import.meta.env.VITE_PUBLIC_URL}users/getbuyerall`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
        .then(async (response) => {
          // console.log(response.data.email);           
          // setRows(response.data.user);
          getData();
        })
        .catch((error) => {
          if (error.status == 401 || error.status == 500) {
            alert("ログインをお願いします。");
            window.location.href = "./login";
          }
        });

    }
  }
  const del = async (id) => {

    if (window.confirm("『削除』確認をお願いします。")) {

      const requestData = {
        user_id: localStorage.getItem("user_id"),
        sel_id: id
      };

      await axios.post(`${import.meta.env.VITE_PUBLIC_URL}users/getbuyerdel`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
        .then(async (response) => {
          // console.log(response.data.email);           
          // setRows(response.data.user);
          getData();
        })
        .catch((error) => {
          if (error.status == 401 || error.status == 500) {
            alert("ログインをお願いします。");
            window.location.href = "./login";
          }
        });
    }

  }

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} >

        <Grid item xs={12} md={12} lg={12} >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">設定管理 / ブラック購入者設定</Typography>
              <Typography variant="caption" color="secondary" noWrap>
                ブラック購入者設定します。
              </Typography>
            </Grid>
            <Grid display={'flex'} gap={2}>
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
            <Grid container justifyContent="space-between" >
              <Grid item>
                <TextField
                  label="ワード"
                  placeholder="氏名, 住所, 電話番号, メールアドレス"
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
            <Accordion sx={{ marginTop: 1 }}>

              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Grid container justifyContent="space-between" >

                  <Grid item alignContent={'center'}>
                    <Typography variant="h7"> <PlusOutlined /> 編集画面 </Typography>
                  </Grid>
                </Grid>

              </AccordionSummary>
              <AccordionDetails>
                <Grid container justifyContent="space-between" mt={3}>
                  <Grid item>
                    <Grid container gap={1} alignItems={'center'}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '100px' }}> 氏名</Typography>
                      <TextField
                        label="氏名"
                        value={name}
                        id="outlined-start-adornment"
                        onChange={(event) => setName(event.target.value)}
                        sx={{ width: '250px' }}
                      />
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '100px' }}> 住所</Typography>
                      <TextField
                        label="住所"
                        id="outlined-start-adornment"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        sx={{ width: '250px' }}
                      />
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '100px' }}> 電話番号</Typography>
                      <TextField
                        label="電話番号"
                        id="outlined-start-adornment"
                        sx={{ width: '250px' }}
                        onChange={handleChangePhone}
                        value={phone}
                        error={!isValidPhone}
                        helperText={!isValidPhone ? '無効な電話番号です' : ''}
                      />
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '100px' }}> メールアドレス</Typography>
                      <TextField
                        label="メールアドレス"
                        id="outlined-start-adornment"
                        value={email}
                        onChange={handleChangeEmail}
                        error={!isValid}
                        sx={{ width: '250px' }}
                        helperText={!isValid ? '無効なメールアドレスです' : ''}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <br></br>

                <Grid container>
                  <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', marginRight: '3px' }}
                    disabled={!validateForm()} onClick={add}>
                    <PlusOutlined />&nbsp;&nbsp;追加
                  </Button>
                  <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#52c41a' }} disabled={!validateForm()}
                    onClick={update}>
                    <ReloadOutlined />&nbsp;&nbsp;修正
                  </Button>
                </Grid>

              </AccordionDetails>
            </Accordion>
            <Grid container justifyContent="space-between">
              <Grid item sx={{ width: '100%' }}>
                <Stack spacing={3}>
                  <Grid container justifyContent="space-between" gap={2} alignItems="center" sx={{ marginTop: '5px !important', }}>

                    <Table aria-labelledby="tableTitle">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ backgroundColor: '#EEE' }}>
                            <input
                              type="checkbox"
                              onChange={handleSelectAll}
                              checked={selectedRows.length === rows.length}
                            />
                          </TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }}>氏名</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }}>住所</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }}>電話番号</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }}>メールアドレス</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE', width: '100px' }} align="center">編集</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE', width: '150px' }} align="center">
                            <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#e3342f', height: '41px' }}
                              onClick={alldel}
                            >
                              <DeleteOutlined />&nbsp;&nbsp;選択削除
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          // stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                          rows.map((row, index) => {

                            return (
                              <TableRow
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                tabIndex={-1}
                                key={index}
                              >
                                <TableCell>
                                  <input
                                    type="checkbox"
                                    checked={selectedRows.includes(row.id)}
                                    onChange={() => handleCheckboxChange(row.id)}
                                  />

                                </TableCell>
                                <TableCell> {row.name}</TableCell>
                                <TableCell> {row.address}</TableCell>
                                <TableCell>{row.phone} </TableCell>
                                <TableCell>{row.email} </TableCell>
                                <TableCell align="center">
                                  <a href='#' onClick={() => editRow(row)}>編集</a>
                                </TableCell>
                                <TableCell align="center">
                                  <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#e3342f' }}
                                    onClick={() => del(row.id)}>
                                    <DeleteOutlined />&nbsp;&nbsp;削除
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
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
