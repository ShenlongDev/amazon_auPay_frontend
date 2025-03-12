import { useState } from 'react';
// material-ui
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';

// project import
import MainCard from 'components/MainCard';


// assets
import { useEffect } from "react";

import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import { SearchOutlined, EditOutlined, AppstoreAddOutlined, RedoOutlined, PlusOutlined } from '@ant-design/icons';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

const position_list = [
  {
    value: 'SB',
    label: 'SB'
  },
  {
    value: 'BB',
    label: 'BB'
  },
  {
    value: 'UTG',
    label: 'UTG'
  },
  {
    value: 'HJ',
    label: 'HJ'
  },
  {
    value: 'CO',
    label: 'CO'
  },
  {
    value: 'BTN',
    label: 'BTN'
  }
];

const card_list = [
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3'
  },
  {
    value: '4',
    label: '4'
  },
  {
    value: '5',
    label: '5'
  },
  {
    value: '6',
    label: '6'
  },
  {
    value: '7',
    label: '7'
  },
  {
    value: '8',
    label: '8'
  },
  {
    value: '9',
    label: '9'
  },
  {
    value: '10',
    label: '10'
  },
  {
    value: 'J',
    label: 'J'
  },
  {
    value: 'Q',
    label: 'Q'
  },
  {
    value: 'K',
    label: 'K'
  },
  {
    value: 'A',
    label: 'A'
  },
];

const card_type_list = [
  {
    value: 'hearts',
    label: 'hearts'
  },
  {
    value: 'diamonds',
    label: 'diamonds'
  },
  {
    value: 'clubs',
    label: 'clubs'
  },
  {
    value: 'spades',
    label: 'spades'
  },
];

const player_cnt_list = [
  {
    value: '1',
    label: '1'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3'
  },
  {
    value: '4',
    label: '4'
  },
  {
    value: '5',
    label: '5'
  },
  {
    value: '6',
    label: '6'
  },
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  // Pokers
  const [selid, setSelid] = useState(0);
  const [my_position, setMyPosition] = useState('SB');
  const [player_cnt, setPlayerCnt] = useState(1);
  const [plays_list, setPlaysList] = useState([]);
  const [poker_name, setPokerName] = useState('');
  const [sblind, setSBlind] = useState(0);
  const [bblind, setBBlind] = useState(0);
  const [mystack, setMyStack] = useState(0);
  const [users, setUsers] = useState(Array(player_cnt).fill(''));
  const [userNames, setUserNames] = useState(Array(player_cnt).fill(''));
  const [positions, setPositions] = useState(Array(player_cnt).fill(''));
  const [pstacks, setPStacks] = useState(Array(player_cnt).fill(''));
  const [rake, setRake] = useState(5);
  const [capp, setCapp] = useState(6);

  const handleUserChange = (index, value, name) => {
    const newUsers = [...users];
    newUsers[index] = value;
    setUsers(newUsers);

    const newUserNames = [...userNames];
    newUserNames[index] = name.name;
    setUserNames(newUserNames);
    console.log(users);
  };
  const handlePositionChange = (index, value) => {
    const newPositions = [...positions];
    newPositions[index] = value;
    setPositions(newPositions);
  };
  const handlePstackChange = (index, value) => {
    const newPStacks = [...pstacks];
    newPStacks[index] = value;
    setPStacks(newPStacks);
  };
  const handleAllStackChange = (index, value) => {

    let val = value;
    if (index == 1) {
      val = val * 200;
    }
    if (index == 2) {
      val = val * 100;
    }

    const newPStacks = [...pstacks];
    for (let i = 0; i < newPStacks.length; i++) {
      newPStacks[i] = val;
    }
    setPStacks(newPStacks);
  }
  const validateForm = () => {
    const newErrors = {};
    if (!poker_name) {
      newErrors.poker_name = '試合名は必須です。';
    }
    if (sblind <= 0) {
      newErrors.sblind = 'S.Blindは0より大きい必要があります。';
    }
    if (bblind <= 0) {
      newErrors.bblind = 'B.Blindは0より大きい必要があります。';
    }
    if (mystack <= 0) {
      newErrors.mystack = 'Stackは0より大きい必要があります。';
    }

    for (let i = 0; i < positions.length; i++) {
      if (positions[i] == "")
        newErrors.positions = '選手のポジションを設定する必要があります。';
    }
    for (let i = 0; i < users.length; i++) {
      if (users[i] == "")
        newErrors.positions = '選手の名前を設定する必要があります。';
    }
    for (let i = 0; i < pstacks.length; i++) {
      if (pstacks[i] == "")
        newErrors.positions = '選手のStackを設定する必要があります。';
    }

    return Object.keys(newErrors).length === 0;

  };
  const handlePokerAdd = async () => {

    if (validateForm()) {
      // alert("FFF");
      const requestData = {
        poker_name: poker_name,
        my_position: my_position,
        player_cnt: player_cnt,
        sblind: sblind,
        bblind: bblind,
        mystack: mystack,
        users: users,
        positions: positions,
        pstacks: pstacks,
        userNames: userNames,
        selid: selid,
        rake:rake,
        capp:capp,
      };

      await axios.post(`${import.meta.env.VITE_PUBLIC_URL}add_porker`, requestData, {

        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
        .then((response) => {
          console.log(response.status);
          if (response.status == 200) {
            // localStorage.setItem("pid", response.data.id);
            // localStorage.setItem("pn", response.data.id);
            // localStorage.setItem("mp", response.data.my_position);
            // localStorage.setItem("sb", response.data.sblind);
            // localStorage.setItem("bb", response.data.bblind);
            // localStorage.setItem("st", response.data.mystack);
            // localStorage.setItem("pc", response.data.player_cnt);
            // setPlaysList(response.data);
            // setSubmitting(false); // Stop submitting
          }
        })
        .catch((error) => {

          if (error.status == 401 || error.status == 422) {
            alert("ログインをお願いします。");
            window.location.href = "./login";
          }
        });
    }
  }

  // GOLBAL
  async function getData() {
    //Get Plays_list
    const requestData = {
      userId: '1'
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}get_plays`, requestData, {

      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          setPlaysList(response.data);
          // setSubmitting(false); // Stop submitting
          let p_info = localStorage.getItem("poker_info");

          p_info = JSON.parse(p_info);

          console.log("pinfo", p_info);

          p_info.bblind ? setBBlind(p_info.bblind) : '';
          p_info.sblind ? setSBlind(p_info.sblind) : '';
          p_info.mystack ? setMyStack(p_info.mystack) : '';
          p_info.my_position ? setMyPosition(p_info.my_position) : '';
          p_info.player_cnt ? setPlayerCnt(p_info.player_cnt) : '';
          p_info.poker_name ? setPokerName(p_info.poker_name) : '';

          let u_postions = JSON.parse(p_info.positions);
          setPositions(u_postions);

          let u_stackss = JSON.parse(p_info.pstacks);
          setPStacks(u_stackss);

          let u_users = JSON.parse(p_info.users);
          setUsers(u_users);

          let u_users_name = JSON.parse(p_info.users_name);
          setUserNames(u_users_name);

          p_info.id ? setSelid(p_info.id) : '';

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
      <Grid item xs={12} md={12} lg={12} >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">試合管理 / 新規作成</Typography>
            <Typography variant="caption" color="secondary" noWrap>
              新規試合を作成します。

            </Typography>
          </Grid>
          <Grid item />
        </Grid>

        <MainCard sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <Grid container alignItems="center" gap={2}>
              <Typography variant="h">試合名*</Typography>
              <TextField
                id="standard-select-currency"
                size="small"
                value={poker_name}
                onChange={(e) => setPokerName(e.target.value)}
              >
              </TextField>
            </Grid>
            <Grid container alignItems="center" sx={{ marginBottom: '20px !important' }} gap={2}>

              <Grid item >
                <Stack>
                  <Typography variant="caption" color="secondary" noWrap>
                    マイ*
                  </Typography>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    select
                    value={my_position}
                    onChange={(e) => setMyPosition(e.target.value)}
                    sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem' } }}
                  >
                    {position_list.map((option) => (
                      <MenuItem key={option.value} value={option.value} >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Grid>

              <Grid item >
                <Stack>
                  <Typography variant="caption" color="secondary" noWrap>
                    選手数*
                  </Typography>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    select
                    value={player_cnt}
                    onChange={(e) => { setPlayerCnt(e.target.value); }}
                    sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem' } }}
                  >
                    {player_cnt_list.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Grid>


              <Grid item >
                <Stack>
                  <Typography variant="caption" color="secondary" noWrap>
                    S.Blind*
                  </Typography>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    type="number"
                    value={sblind}
                    onChange={(e) => { setSBlind(e.target.value); setBBlind(e.target.value * 2); setMyStack(e.target.value * 200); handleAllStackChange(1, e.target.value) }}
                    sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem' } }}
                  >
                  </TextField>
                </Stack>
              </Grid>
              <Grid item>
                <Stack>
                  <Typography variant="caption" color="secondary" noWrap>
                    B.Blind*
                  </Typography>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    type="number"
                    value={bblind}
                    onChange={(e) => { setSBlind(e.target.value / 2); setBBlind(e.target.value); setMyStack(e.target.value * 100); handleAllStackChange(2, e.target.value) }}
                    sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem' } }}
                  >
                  </TextField>
                </Stack>
              </Grid>
              <Grid item >
                <Stack>
                  <Typography variant="caption" color="secondary" noWrap>
                    Stack*
                  </Typography>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    type="number"
                    value={mystack}
                    onChange={(e) => { setMyStack(e.target.value), handleAllStackChange(3, e.target.value) }}
                    sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem' } }}
                  >
                  </TextField>
                </Stack>
              </Grid>
              <Grid item >
                <Stack>
                  <Typography variant="caption" color="secondary" noWrap>
                    Rake*
                  </Typography>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    type="number"
                    value={rake}
                    onChange={(e) => { setRake(e.target.value) }}
                    sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem' } }}
                  >
                  </TextField>
                </Stack>
              </Grid>
              <Grid item >
                <Stack>
                  <Typography variant="caption" color="secondary" noWrap>
                    Cap*
                  </Typography>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    type="number"
                    value={capp}
                    onChange={(e) => { setCapp(e.target.value) }}
                    sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem' } }}
                  >
                  </TextField>
                </Stack>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="caption" color="secondary" noWrap>
                選手情報編集*
              </Typography>
              <Grid item>
                <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                  <Avatar alt="Remy Sharp" src={avatar1} />
                  <Avatar alt="Travis Howard" src={avatar2} />
                  <Avatar alt="Cindy Baker" src={avatar3} />
                  <Avatar alt="Agnes Walker" src={avatar4} />
                </AvatarGroup>
              </Grid>
            </Grid>
            {Array.from({ length: player_cnt }, (_, i) => {
              return (
                <Grid container justifyContent="space-between" alignItems="center" sx={{ marginTop: '5px !important' }}>
                  <Grid item>
                    <Stack>
                      <Typography variant="h6" noWrap>
                        Player{i + 1}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ display: 'flex', gap: 1 }}>
                    <Grid item >
                      <TextField
                        id={`user-select-${i}`}
                        size="small"
                        select
                        value={users[i] || ''}
                        onChange={(e) => handleUserChange(i, e.target.value, plays_list.find(play => play.id == e.target.value))}
                        sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem' } }}
                      >
                        {plays_list.map((p, index) => (
                          <MenuItem key={index} value={p.id}>
                            {p.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item>
                      <TextField
                        id={`position-select-${i}`}
                        size="small"
                        select
                        value={positions[i] || ''}
                        onChange={(e) => handlePositionChange(i, e.target.value)}
                        sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem' } }}
                      >
                        {position_list.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item>
                      <TextField
                        id={`stack-select-${i}`}
                        size="small"
                        type="number"
                        value={pstacks[i] || ''}
                        onChange={(e) => handlePstackChange(i, e.target.value)}
                        sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem' } }}
                      >

                      </TextField>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}

            <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#52c41a' }} onClick={() => handlePokerAdd()} disabled={!validateForm()} >
              <EditOutlined /> &nbsp;&nbsp;試合更新する
            </Button>
          </Stack>
        </MainCard>

      </Grid>

    </Grid>

  );
}
