import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { RedoOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import axios from 'axios';

function createData(p, tcard_type1, tcard1, tcard_type2, tcard2) {
  return { p, tcard_type1, tcard1, tcard_type2, tcard2 };
}

let rows = [];

export default function PlayCardTable({ poker_info, round_info, mcard_type1, mcard_type2, mcard1, mcard2 }) {

  if (poker_info.positions) {


    let positions = poker_info.positions.replace(/'/g, '"');
    positions = JSON.parse(positions);

    rows = [];

    for (let i = 0; i < positions.length; i++) {
      if (positions[i] == poker_info.my_position) {
        rows.push(createData(positions[i], mcard_type1, mcard1, mcard_type2, mcard2));
      } else {
        rows.push(createData(positions[i], '', '', '', ''));
      }

    }

    console.log("playcard:", rows);

  }

  const [pcard, setPCard] = useState([]);

  const [pcardval, setPCardVal] = useState([]);
  const [pcardtype, setPCardType] = useState([]);
  const [pcardval1, setPCardVal1] = useState([]);
  const [pcardtype1, setPCardType1] = useState([]);

  const setCard = (val, index) => {

    const newCard = [...pcard];
    newCard[index] = val.toUpperCase();
    setPCard(newCard);

    const newType = [...pcardtype];
    const newVal = [...pcardval];
    const newType1 = [...pcardtype1];
    const newVal1 = [...pcardval1];

    let cardTxt = "HDSC";
    let valTxt = "2345678910AJQK";

    if (val.length == 4) {

      let newVal_ = val.toUpperCase();
      if (!cardTxt.includes(newVal_[0])) return false;
      if (!cardTxt.includes(newVal_[2])) return false;
      if (!valTxt.includes(newVal_[1])) return false;
      if (!valTxt.includes(newVal_[3])) return false;

      newType[index] = newVal_[0];
      newVal[index] = newVal_[1];
      newType1[index] = newVal_[2];
      newVal1[index] = newVal_[3];

      setPCardVal(newVal);
      setPCardType(newType);
      setPCardVal1(newVal1);
      setPCardType1(newType1);
    } else {

      newType[index] = '';
      newVal[index] = '';
      newType1[index] = '';
      newVal1[index] = '';
      setPCardVal(newVal);
      setPCardType(newType);
      setPCardVal1(newVal1);
      setPCardType1(newType1);

    }
  }

  const getcard = async () => {

    const requestData = {
      round: round_info.id,
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}pcard_get`, requestData, {

      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          
          if (response.data.pcard && JSON.parse(response.data.pcard).length > 0) {

            let data = JSON.parse(response.data.pcard);           
            
            const newCard = [...pcard];

            const newType = [...pcardtype];
            const newVal = [...pcardval];
            const newType1 = [...pcardtype1];
            const newVal1 = [...pcardval1];

            let cardTxt = "HDSC";
            let valTxt = "2345678910AJQK";

            let positions = poker_info.positions.replace(/'/g, '"');
            positions = JSON.parse(positions);
            

            for (let i = 0; i < positions.length; i++) {
             
              if (data[i] && data[i].length == 4) {

                let newVal_ = data[i].toUpperCase();

                // if (!cardTxt.includes(newVal_[0])) return false;
                // if (!cardTxt.includes(newVal_[2])) return false;
                // if (!valTxt.includes(newVal_[1])) return false;
                // if (!valTxt.includes(newVal_[3])) return false;

                newType[i] = newVal_[0];
                newVal[i] = newVal_[1];
                newType1[i] = newVal_[2];
                newVal1[i] = newVal_[3];

                newCard[i] = data[i];
              } else {
                newType[i] = '';
                newVal[i] = '';
                newType1[i] = '';
                newVal1[i] = '';
                newCard[i] = '';

                newCard[i] = '';
              }

            }
            
            setPCard(newCard);
            setPCardVal(newVal);
            setPCardType(newType);
            setPCardVal1(newVal1);
            setPCardType1(newType1);
          }
        }
      })
      .catch((error) => {
        if (error.status == 601) {

        }

        if (error.status == 401 || error.status == 422) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });


  }

  const handleCardAdd = async () => {

    const requestData = {
      pid: poker_info.id,
      round: round_info.id,
      pcard: pcard
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}pcard_save`, requestData, {

      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {

        }
      })
      .catch((error) => {
        if (error.status == 601) {

        }

        if (error.status == 401 || error.status == 422) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });
  }
  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#EEE' }} colSpan={3}>  Player Cards </TableCell>
            </TableRow>

          </TableHead>
          <TableBody>
            <TableRow
              hover
              role="checkbox"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{ backgroundColor: '#EEE' }} colSpan={3}> カード入力形式 : h5d3 Or H5D3 ~
                <img src={`/assets/images/card/H.png`} height={20} /> 5 <img src={`/assets/images/card/D.png`} height={20} /> 3
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell colSpan={3}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    H<img src={`/assets/images/card/H.png`} height={20} /> D <img src={`/assets/images/card/D.png`} height={20} />
                    C<img src={`/assets/images/card/C.png`} height={20} /> S <img src={`/assets/images/card/S.png`} height={20} />
                  </Grid>
                  <Grid item >
                    <Button size="small" variant="contained" sx={{ textTransform: 'capitalize', marginRight: '5px', backgroundColor: '#52c41a' }} onClick={() => getcard()}>
                      <RedoOutlined />リセット
                    </Button>
                    <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }} onClick={() => handleCardAdd()} >
                      <AppstoreAddOutlined></AppstoreAddOutlined>カード保存
                    </Button>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            {
              // stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              rows && rows.map((row, index) => {

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    tabIndex={-1}
                    key={index}
                  > {row.p == poker_info.my_position ?
                    <>
                      <TableCell sx={{ color: "#FF0000" }}> {row.p}(MY)</TableCell>
                      <TableCell>
                        {row.tcard_type1 != '' ?
                          <img src={`/assets/images/card/${row.tcard_type1}.png`} height={20} /> : ''
                        }
                        {row.tcard1}
                        {row.tcard_type2 != '' ?
                          <img src={`/assets/images/card/${row.tcard_type2}.png`} height={20} /> : ''
                        }
                        {row.tcard2}

                      </TableCell>
                    </>
                    :
                    <>
                      <TableCell> {row.p}</TableCell>
                      <TableCell>
                        {pcardtype[index] ?
                          <img src={`/assets/images/card/${pcardtype[index]}.png`} height={20} /> : ''
                        }
                        {pcardval[index] ? pcardval[index] : ''}
                        {pcardtype1[index] ?
                          <img src={`/assets/images/card/${pcardtype1[index]}.png`} height={20} /> : ''
                        }
                        {pcardval1[index] ? pcardval1[index] : ''}
                      </TableCell>
                      <TableCell>

                        <TextField
                          id="standard-select-currency"
                          size="small"
                          value={pcard[index]}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem', height: 25 } }}
                          onChange={(e) => { setCard(e.target.value, index); }}
                        >
                        </TextField>
                      </TableCell>
                    </>
                    }

                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}