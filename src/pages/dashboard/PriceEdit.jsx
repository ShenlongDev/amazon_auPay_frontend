import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { CheckOutlined, DeleteOutlined, CloudDownloadOutlined, ReloadOutlined, PlusOutlined, CloudUploadOutlined } from '@ant-design/icons';
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
import { setIn } from 'immutable';

// ==============================|| DASHBOARD - DEFAULT ||============================== //
export default function DashboardDefault() {
  const [mail_add_fee, setMailAddFee] = useState(0);
  const [delivery_add_fee, setDeliveryAddFee] = useState(0);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [in_price, setInPrice] = useState(0);
  const [add_pro, setAddPro] = useState(0);
  const [add_price, setAddPrice] = useState(0);


  const handleSelectAll = (event) => {
    const ids = rows.map(row => row.id);
    if (event.target.checked) {
      setSelectedRows(ids);
    } else {
      setSelectedRows([]);
    }
  };
  const add = async () => {

    const requestData = {
      user_id: localStorage.getItem("user_id"),
      in_price: in_price,
      add_pro: add_pro,
      add_price: add_price,
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}users/priceeditadd`, requestData, {
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
  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };
  const update = async () => {
    const requestData = {
      user_id: localStorage.getItem("user_id"),
      sel_id: localStorage.getItem("sel_id"),
      in_price: in_price,
      add_pro: add_pro,
      add_price: add_price,
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}users/priceeditupdate`, requestData, {
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

  const validateForm = () => {
    const newErrors = {};
    if (!in_price) {
      newErrors.name = '試合名は必須です。';
    }
    return Object.keys(newErrors).length === 0;

  };

  const getData = async () => {
    const requestData = {
      userId: localStorage.getItem("user_id")
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}users/getpriceedit`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then(async (response) => {
        // console.log(response.data.email);           
        // setRows(response.data.user);
        setRows(response.data.editprice)
        setDeliveryAddFee(response.data.userinfo[0].delivery_add_fee);
        setMailAddFee(response.data.userinfo[0].mail_add_fee);
      })
      .catch((error) => {
        if (error.status == 401 || error.status == 500) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });
  }

  const seldel = async () => {
    if (window.confirm("『削除』確認をお願いします。")) {


      const requestData = {
        user_id: localStorage.getItem("user_id"),
        sels: selectedRows
      };

      await axios.post(`${import.meta.env.VITE_PUBLIC_URL}users/priceeditseldel`, requestData, {
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

      await axios.post(`${import.meta.env.VITE_PUBLIC_URL}users/priceeditdel`, requestData, {
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

  useEffect(() => {
    getData();
  }, []);

  const editRow = async (row) => {
    setInPrice(row.in_price || 0);
    setAddPro(row.add_pro || 0);
    setAddPrice(row.add_price || 0);
    localStorage.setItem("sel_id", row.id)
  }

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
                宅配便追加上乗せ固定値 : {delivery_add_fee} 円 | メール便追加上乗せ固定値： {mail_add_fee} 円
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
                    <Grid container gap={1} alignItems={'center'}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '100px' }}> 仕入価格</Typography>
                      <TextField
                        label="仕入価格"
                        id="outlined-start-adornment"
                        sx={{ width: '250px' }}
                        value={in_price}
                        onChange={(event) => setInPrice(event.target.value)}
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
                        value={add_pro}
                        onChange={(event) => setAddPro(event.target.value)}

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
                        value={add_price}
                        onChange={(event) => setAddPrice(event.target.value)}
                        slotProps={{
                          input: {
                            startAdornment: <InputAdornment position="end">円</InputAdornment>,
                            type: "number",
                          },
                        }}
                      />
                    </Grid>
                    <br></br>
                    <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', marginRight: '3px' }}
                      disabled={!validateForm()} onClick={add}>
                      <PlusOutlined />&nbsp;&nbsp;追加
                    </Button>
                    <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#52c41a', marginRight: '3px' }} disabled={!validateForm()}
                      onClick={update}>
                      <ReloadOutlined />&nbsp;&nbsp;修正
                    </Button>
                    <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', marginRight: '3px', backgroundColor: '#d48806' }} >
                      <CloudUploadOutlined />&nbsp;&nbsp;CSVインポート
                    </Button>
                    <br></br>
                    価格設定を指定のファイルで置き換えます。現在の設定は全て消去されます。
                  </Grid>
                  <Grid item mt={2}>
                    <Grid container gap={1} alignItems={'center'}>
                      <Typography variant="h7" sx={{ marginRight: '25px', width: '100px' }}> 宅配便追加上乗せ固定値</Typography>
                      <TextField
                        label="宅配便追加上乗せ固定値"
                        id="outlined-start-adornment"
                        sx={{ width: '250px' }}
                        value={delivery_add_fee}
                        onChange={(event) => setMailAddFee(event.target.value)}
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
                        value={mail_add_fee}
                        onChange={(event) => setDeliveryAddFee(event.target.value)}
                        slotProps={{
                          input: {
                            startAdornment: <InputAdornment position="end">円</InputAdornment>,
                            type: "number",
                          },
                        }}
                      />
                    </Grid>
                    <br></br>
                    <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', marginRight: '3px', backgroundColor: '#237804' }} >
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
                          <TableCell sx={{ backgroundColor: '#EEE' }}>仕入価格(円)</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }}>上乗せ比率(%)</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }}>上乗せ固定値(円)</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE', width: '100px' }} align="center">編集</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE', width: '150px' }} align="center">
                            <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#e3342f', }}
                              onClick={seldel}
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
                                <TableCell> {row.in_price}</TableCell>
                                <TableCell> {row.add_pro}</TableCell>
                                <TableCell>{row.add_price} </TableCell>
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
