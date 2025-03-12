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
import { AppstoreAddOutlined, EditOutlined, DeleteFilled } from '@ant-design/icons';
// project import
import MainCard from 'components/MainCard';
// assets
import { useEffect } from "react";
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

// action style
const postion_list_6 = ["UTG", "HJ", "CO", "BTN", "SB", "BB"];
const postion_list_5 = ["HJ", "CO", "BTN", "SB", "BB"];
const postion_list_4 = ["CO", "BTN", "SB", "BB"];
const postion_list_3 = ["BTN", "SB", "BB"];
const postion_list_2 = ["BTN", "BB"];


// ==============================|| DASHBOARD - DEFAULT ||============================== //
export default function DashboardDefault() {
  // Pokers
  const [my_position, setMyPosition] = useState('BB');
  const [player_cnt, setPlayerCnt] = useState(6);
  const [poker_id, setSetPokerId] = useState(0);
  const [plays_list, setPlaysList] = useState([]);
  const [poker_name, setPokerName] = useState('試合');
  const [poker_list, setPokerList] = useState([]);
  const [sblind, setSBlind] = useState(1);
  const [bblind, setBBlind] = useState(2);
  const [mystack, setMyStack] = useState(200);
  const [rake, setRake] = useState(5);
  const [capp, setCapp] = useState(6);
  const [users, setUsers] = useState(Array(player_cnt).fill(''));
  const [pstacks, setPStacks] = useState(Array(player_cnt).fill('200'));
  const [position_list, setPositionList] = useState(postion_list_6);

  const handleUserChange = (index, value) => {
    const newUsers = [...users];
    newUsers[index] = value;
    setUsers(newUsers);
  };

  function setPositonList_(val) {
    if (val == 2) setPositionList(postion_list_2);
    if (val == 3) setPositionList(postion_list_3);
    if (val == 4) setPositionList(postion_list_4);
    if (val == 5) setPositionList(postion_list_5);
    if (val == 6) setPositionList(postion_list_6);
  }

  const setPlayerCnt_ = (val) => {
    setPositonList_(val);
    let new_play = [];

    for (let i = 0; i < val; i++) {
      new_play.push(plays_list[i].id);
    }
    setPlayerCnt(val);
    setUsers(new_play);
    setPStacks(Array(val * 1).fill(200));

  };

  const handlePstackChange = (index, value) => {
    const newPStacks = [...pstacks];
    newPStacks[index] = value;
    setPStacks(newPStacks);
  };
  //Stack計算部分
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
  //Validate チェック
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

    for (let i = 0; i < users.length; i++) {
      if (users[i] == "")
        newErrors.users = '選手の名前を設定する必要があります。';
    }
    for (let i = 0; i < pstacks.length; i++) {
      if (pstacks[i] == "")
        newErrors.positipstacksons = '選手のStackを設定する必要があります。';
    }

    return Object.keys(newErrors).length === 0;

  };
  
  const handlePokerDel = (selid) => async () => {  
    if(window.confirm("削除しますか？")){
      const requestData = {
        selid: selid
      };

      await axios.post(`${import.meta.env.VITE_PUBLIC_URL}del_porker`, requestData, {

        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
        .then((response) => {

          if (response.status == 200) {
            alert("削除が完了しました。");
            getInitData();
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

  const handlePokerSel = (sel_poker_info) => () => {
    console.log(sel_poker_info);
    if (sel_poker_info.bblind) setBBlind(sel_poker_info.bblind);
    if (sel_poker_info.capp) setCapp(sel_poker_info.capp);
    if (sel_poker_info.my_position) setMyPosition(sel_poker_info.my_position);
    if (sel_poker_info.mystack) setMyStack(sel_poker_info.mystack);
    if (sel_poker_info.player_cnt) setPlayerCnt(sel_poker_info.player_cnt);
    if (sel_poker_info.poker_name) setPokerName(sel_poker_info.poker_name);
    if (sel_poker_info.rake) setRake(sel_poker_info.rake);
    if (sel_poker_info.sblind) setSBlind(sel_poker_info.sblind);

    setSetPokerId(sel_poker_info.id);
    setPositonList_(sel_poker_info.player_cnt)
    
    let _pstacks = sel_poker_info.pstacks.replace(/'/g, '"');
    _pstacks = JSON.parse(_pstacks);
    setPStacks(_pstacks);

    let _users = sel_poker_info.users.replace(/'/g, '"');
    _users = JSON.parse(_users);
   
    setUsers(_users);

    // const newUsers = [...users];
    // newUsers[index] = value;
    // setUsers(newUsers);

  }
  //試合保管
  const handlePokerAdd = async () => {

    if (validateForm()) {

      let nstacks = [...pstacks];
      nstacks.unshift(mystack, "200");

      const requestData = {
        poker_name: poker_name,
        my_position: my_position,
        player_cnt: player_cnt,
        sblind: sblind,
        bblind: bblind,
        mystack: mystack,
        users: users,
        positions: position_list,
        pstacks: pstacks,
        nstacks: nstacks,
        rake: rake,
        capp: capp,
        selid: poker_id
      };

      await axios.post(`${import.meta.env.VITE_PUBLIC_URL}add_porker`, requestData, {

        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
        .then((response) => {

          if (response.status == 200) {
            alert("登録が完了しました。");
            setSetPokerId(0);
            getInitData();
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

  //ユーザー情報を取得
  async function getInitData() {

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

        if (response.status == 200) {
          setPlaysList(response.data);

          let new_play = [];
          for (let i = 0; i < response.data.length; i++) {
            new_play.push(response.data[i].id);
          }
          setUsers(new_play);
        }
      })
      .catch((error) => {

        if (error.status == 401 || error.status == 422) {
          alert("ログインをお願いします。");
          window.location.href = "login";
        }
      });

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}get_pokers`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then((response) => {

        if (response.status == 200) {
          // setPlaysList(response.data);
          setPokerList(response.data);
        }
      })
      .catch((error) => {

        if (error.status == 401 || error.status == 422) {
          alert("ログインをお願いします。");
          window.location.href = "login";
        }
      });

  }

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      alert("ログインをお願いします。");
      window.location.href = "login";
    }
    getInitData();
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
          <Grid container justifyContent="space-between" gap={2}>
            <Grid item xs={12} md={6} lg={6}>
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
                        sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '25px' } }}
                      >
                        {position_list.map((option) => (
                          <MenuItem key={option} value={option} >
                            {option}
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
                        onChange={(e) => { setPlayerCnt_(e.target.value); }}
                        sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '25px' } }}
                      >
                        {Array.from({ length: 5 }, (_, i) => {
                          return (
                            <MenuItem key={i + 1} value={i + 2}>
                              {i + 2}
                            </MenuItem>
                          );
                        })}
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
                        sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '50px' } }}
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
                        sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '50px' } }}
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
                        sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '30px' } }}
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
                        sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '30px' } }}
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

                {position_list.map((option, i) => (

                  <Grid container justifyContent="space-between" alignItems="center" sx={{ marginTop: '5px !important' }} key={i}>
                    <Grid item>
                      <Stack>
                        <Typography variant="h6" noWrap>
                          {option}
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
                          onChange={(e) => handleUserChange(i, e.target.value)}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '75px' } }}
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

                ))}
                <Grid container justifyContent="space-between" alignItems="center" sx={{ marginTop: '5px !important' }}>
                  <Button size="big" variant="contained" sx={{ textTransform: 'capitalize' }} onClick={() => handlePokerAdd()} disabled={!validateForm()} >
                    <AppstoreAddOutlined />&nbsp;&nbsp;追加する
                  </Button>
                  <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#faad14' }} onClick={() => handlePokerAdd()} disabled={!validateForm()} >
                    <EditOutlined />&nbsp;&nbsp;修正する
                  </Button>
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5} lg={5} >
              <Grid item ><Typography variant="h5">試合リスト*</Typography></Grid>
              {poker_list.map((option) => (
                <Grid container justifyContent="space-between" gap={2} mt={2} key={option.id}>
                  <Grid item><a href='#' onClick={handlePokerSel(option)}>{option.poker_name}</a></Grid>
                  <Grid>
                    {new Date(option.created_at).toISOString().slice(0, 10)}
                    <DeleteFilled onClick={handlePokerDel(option.id)}/>
                  </Grid>
                </Grid>
              ))}
            </Grid>

          </Grid>
        </MainCard>
      </Grid>
              
    </Grid>

  );
}
