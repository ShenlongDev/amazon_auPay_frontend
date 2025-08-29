import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import axios from 'axios';
import { Pagination } from 'antd';
import { CheckOutlined, KeyOutlined, CloudUploadOutlined, DeleteOutlined, CloudDownloadOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { width } from '@mui/system';

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
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState([]);

  const [asin, setAsin] = useState('');
  const [white_asin_total, setWhiteAsinTotal] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleChange = (event) => {
    setPageSize(event.target.value);
  };
  const alldel = async () => {
    if (window.confirm("『削除』確認をお願いします。")) {

      if (selectedRows.length > 0) {
        const requestData = {
          user_id: localStorage.getItem("user_id"),
          sels: selectedRows
        };

        await axios.post(`${import.meta.env.VITE_PUBLIC_URL}users/getwhiteasinall`, requestData, {
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
  }

  const seldel = async () => {
    if (window.confirm("『削除』確認をお願いします。")) {

      if (selectedRows.length > 0) {
        const requestData = {
          user_id: localStorage.getItem("user_id"),
          sels: selectedRows
        };

        await axios.post(`${import.meta.env.VITE_PUBLIC_URL}users/getwhiteasinsel`, requestData, {
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
  }

  const handleChangeAsin = (event) => {
    const value = event.target.value;
    setAsin(value);
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
  const handleSelectAll = (event) => {
    const ids = rows.map(row => row.id);
    if (event.target.checked) {
      setSelectedRows(ids);
    } else {
      setSelectedRows([]);
    }
  };

  const getData = async (page, size) => {
    const requestData = {
      userId: localStorage.getItem("user_id"),
      page: page,
      pageSize: size,
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}users/getwhiteasin`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then(async (response) => {
        // console.log(response.data.email);           
        setRows(response.data.whiteasin);
        setWhiteAsinTotal(response.data.totalCount)
      })
      .catch((error) => {
        if (error.status == 401 || error.status == 500) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });
  }

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    getData(page, pageSize)
  };

  const del = async (id) => {

    if (window.confirm("『削除』確認をお願いします。")) {

      const requestData = {
        user_id: localStorage.getItem("user_id"),
        sel_id: id
      };

      await axios.post(`${import.meta.env.VITE_PUBLIC_URL}users/getwhiteasindel`, requestData, {
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

  const add = async () => {

    const requestData = {
      user_id: localStorage.getItem("user_id"),
      asin: asin
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}users/getwhiteasinadd`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then(async (response) => {
        // console.log(response.data.email);           
        // setRows(response.data.user);
        getData(currentPage, pageSize);
      })
      .catch((error) => {
        if (error.status == 401 || error.status == 500) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });
  }


  useEffect(() => {
    getData(currentPage, pageSize);
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
              <Typography variant="h5">設定管理 / ホワイトASIN設定</Typography>
              <Typography variant="caption" color="secondary" noWrap>
                ホワイトASIN設定します。
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
                  placeholder="ASIN"
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
                <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#e3342f', height: '41px' }}
                  onClick={alldel}
                >
                  <DeleteOutlined />&nbsp;&nbsp;全体削除
                </Button>
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
                <Grid container justifyContent="space-between" mt={3} >
                  <Grid item >
                    <Grid container gap={1} alignItems={'center'}>
                      <Typography variant="h7" sx={{ marginRight: '25px' }}>
                        ホワイト ASIN の商品は NG ワード、NG ブランド、NG カテゴリを無視します。
                      </Typography>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'}>
                      <Typography variant="h7" sx={{ marginRight: '25px' }}>
                        ASINを入力してください。
                      </Typography>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'}>
                      <Typography variant="h7" sx={{ marginRight: '25px' }}>
                        複数入力する場合は改行かスペース区切りで入力してください。100000件まで入力できます。
                      </Typography>
                    </Grid>
                    <Grid container gap={1} alignItems={'center'} mt={2} >
                      <TextField sx={{ width: '100%' }}
                        id="outlined-multiline-static"
                        label="ASIN"
                        placeholder="ASIN ASIN ASIN"
                        onChange={handleChangeAsin}
                        multiline
                        rows={5}
                        value={asin}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <br></br>
                <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', marginRight: '3px' }} onClick={add}>
                  <PlusOutlined />&nbsp;&nbsp;追加
                </Button>
                <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', marginRight: '3px', backgroundColor: '#237804' }} >
                  <CloudUploadOutlined />&nbsp;&nbsp;CSVインポート
                </Button>
                <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', marginRight: '3px', backgroundColor: '#d48806' }} >
                  <CloudDownloadOutlined />&nbsp;&nbsp;CSVエクスポート
                </Button>
              </AccordionDetails>
            </Accordion>
            <Grid container justifyContent="space-between">
              <Grid item sx={{ width: '100%' }}>
                <Stack spacing={3} mt={2}>

                  <Grid container justifyContent="space-between" gap={2} alignItems="center" sx={{ marginTop: '5px !important', }}>
                    <Pagination mt-2
                      total={white_asin_total}
                      showSizeChanger
                      showQuickJumper
                      showTotal={(total) => `合計数： ${total}`}
                      current={currentPage}
                      pageSize={pageSize}
                      pageSizeOptions={[10, 50, 100, 250]}
                      onChange={handlePageChange}
                    />

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
                          <TableCell sx={{ backgroundColor: '#EEE' }}>ASIN</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }} align="center">検索</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE' }} align="center">編集</TableCell>
                          <TableCell sx={{ backgroundColor: '#EEE', width: '150px' }} align="center">
                            <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#e3342f', height: '41px' }}
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
                                <TableCell> {row.asin}</TableCell>
                                <TableCell align="center">
                                  <a href='#' >検索</a>
                                </TableCell>
                                <TableCell align="center">
                                  <a href='#' >編集</a>
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
