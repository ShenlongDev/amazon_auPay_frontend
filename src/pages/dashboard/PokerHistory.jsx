import React, { useState } from 'react';
// material-ui
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Box from '@mui/material/Box';
// project import
import { useEffect } from "react";
import { LineChart } from '@mui/x-charts';
import { json } from 'react-router';
// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function PokerDetailAI() {
  // Porker Info =========================================================================================================
  const stage_list = [
    {
      value: '0',
      label: 'Preflop'
    },
    {
      value: '1',
      label: 'Flop'
    },
    {
      value: '2',
      label: 'Turn'
    },
    {
      value: '3',
      label: 'River'
    },
  ]
  const [sel_porker, setSelPorker] = useState(0);
  const [porker_list, setPorkerList] = useState([]);
  const [data_list, setDataList] = useState([]);
  const [dataset, setDataset] = useState([{ x: '10', y: '10' }, { x: '20', y: '20' }]);
  const [xAxis, setXAxis] = useState([{ x: '10', y: '10' }, { x: '20', y: '20' }]);

  const setSelPorkerInfo = async (info) => {
    const requestData = {
      pid: info.id
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}get_pokers_result`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          let data = response.data;
          setDataList(data);

          let rewardAry = response.data;
          // UTG:54.6:254.6\nHJ:-6:194\nCO:0:200\nBTN:0:200\nSB:-48:152\nBB:-6:194
          let rewards = [info.mystack];
          let xa = [0];
          //
          for(let i = 0; i < rewardAry.length; i++){
            let reward = rewardAry[i].rewards;
            reward = reward.split("\n");

            for(let j = 0; j < reward.length; j++){
              let r = reward[j].split(":");
              
              if(info.my_position == r[0]){                
                rewards.push(r[2])
                xa.push(i+1);
              }
            }
          }
          setDataset(rewards);
          setXAxis(xa);

        }
      })
      .catch((error) => {
        if (error.status == 401 || error.status == 422) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });
  }  //Global 
  const formatLabel = (label) => {
    return label.replace(/([A-Za-z])/g, '<strong style="color:#ff9800">$1</strong>')
      .replace(/-/g, '<span style="color:red;">-</span>');
  };
  const getData = async () => {
    const requestData = {
      userId: '1'
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}get_pokers`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
         
          setPorkerList(response.data);
          setSelPorker(response.data[0].id);   
          setSelPorkerInfo(response.data[0]);   
        }
      })
      .catch((error) => {
        if (error.status == 401 || error.status == 422) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });
  }

  useEffect(() => {
    getData();
  }, []);


  return (

    <Grid container rowSpacing={4.5} columnSpacing={2.75} >
      <Grid item xs={12} md={12} lg={12} gap={2}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">試合管理 / 履歴分析</Typography>
            <Typography variant="caption" color="secondary" noWrap>
              試合履歴を分析します。
            </Typography>
          </Grid>
        </Grid>

        <Grid item alignItems="center">
          <Grid container mt={2}>
            <Stack >
              <Typography variant="caption" color="secondary" noWrap>
                試合設定*
              </Typography>
              <TextField
                id="standard-select-currency"
                size="small"
                select
                value={sel_porker}
                onChange={(e) => { setSelPorker(e.target.value); setSelPorkerInfo(porker_list.find(poker => poker.id == e.target.value)) }}
                sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '200px' } }}
              >
                {porker_list.map((option) => (
                  <MenuItem key={`plist${option.id}`} value={option.id} name={option.poker_name}>
                    {option.poker_name}
                  </MenuItem>
                ))}
              </TextField>

            </Stack>
          </Grid>
        </Grid>
        <Grid item alignItems="center" gap={0} mt={1}>
          <LineChart
            xAxis={[{ data: xAxis }]}
            series={[
              {
                data: dataset,
              },
            ]}
            sx={{ with: '100%' }}
            height={300}
          />
          {data_list.map((option, i) => (
            option.data ?

              <Box key={i}>
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
                        <TableCell sx={{ backgroundColor: '#EEE' }} colSpan={3}>  Round{i + 1} </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ backgroundColor: '#EEE' }} colSpan={3}>
                          TableCard : {option.tcard}
                          <br />
                          MyCard : {option.mcard}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        JSON.parse(option.data) && JSON.parse(option.data).map((data, index) => {
                          const formattedLabel = formatLabel(data.actions);
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              tabIndex={-1}
                              key={stage_list[data.stage].label}
                            >
                              <TableCell sx={{ backgroundColor: '#EEE' }} width={'100px'}> {stage_list[data.stage].label}</TableCell>
                              <TableCell dangerouslySetInnerHTML={{ __html: formattedLabel }} />
                            </TableRow>
                          );
                        })}
                      <TableRow>
                        <TableCell sx={{ backgroundColor: '#EEE' }} >Result</TableCell>
                        <TableCell colSpan={3}>  {option.rewards} </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              : ''

          ))}

        </Grid>

      </Grid >

    </Grid >

  );
}
