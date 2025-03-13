import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { AlertOutlined, HistoryOutlined } from '@ant-design/icons';
// project import
import MainCard from 'components/MainCard';
// assets
import { useEffect } from "react";

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
    if (window.confirm("削除しますか？")) {
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
            // alert("ログインをお願いします。");
            // window.location.href = "./login";
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
            // alert("ログインをお願いします。");
            // window.location.href = "./login";
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
          // alert("ログインをお願いします。");
          // window.location.href = "login";
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
          // alert("ログインをお願いします。");
          // window.location.href = "login";
        }
      });

  }

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      // alert("ログインをお願いします。");
      // window.location.href = "login";
    }
    getInitData();
  }, []);


  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} >
      <Grid item xs={12} md={12} lg={12} >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">財務管理 / 注文処理</Typography>
            <Typography variant="caption" color="secondary" noWrap>
              注文処理状況を表示します。
            </Typography>
          </Grid>
          <Grid item />
        </Grid>

        <MainCard sx={{ mt: 2 }}>
          <Grid container justifyContent="space-between">
            <Grid item sx={{ width: '100%' }}>
              <Stack spacing={3}>
                <Grid container justifyContent="space-between" gap={2} alignItems="center" sx={{ marginTop: '5px !important', }}>

                  <Grid item sx={{ display: 'flex', gap: 1, width: '100%' }} >
                    <Grid item xs={12} md={3} lg={3}>
                      新規受付
                    </Grid>
                    <Grid item xs={12} md={9} lg={9} sx={{ display: 'flex' }}>
                      Wow! manager で受注メール作成 ( 9 )
                    </Grid>
                  </Grid>
                  <Grid item sx={{ display: 'flex', gap: 1, width: '100%' }} >
                    <Grid item xs={12} md={3} lg={3}>
                      処理中
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
                      宅配便 ( 0 )
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
                      メール便 ( 0 )
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
                      全て ( 0 )
                    </Grid>
                  </Grid>
                  <Grid item sx={{ display: 'flex', gap: 1, width: '100%' }} >
                    <Grid item xs={12} md={3} lg={3}>
                      処理済み
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
                      宅配便 ( 0 )
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
                      メール便 ( 0 )
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
                      全て ( 0 )
                    </Grid>
                  </Grid>
                  <Grid item sx={{ display: 'flex', gap: 1, width: '100%' }} >
                    <Grid item xs={12} md={3} lg={3}>
                      保留
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
                      宅配便 ( 0 )
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
                      メール便 ( 0 )
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
                      全て ( 0 )
                    </Grid>
                  </Grid>
                  <Grid item sx={{ display: 'flex', gap: 1, width: '100%' }} >
                    <Button size="big" variant="contained" sx={{ textTransform: 'capitalize' }} onClick={() => handlePokerAdd()}  >
                      <AlertOutlined />&nbsp;&nbsp;発送通知
                    </Button>
                    <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#faad14' }} onClick={() => handlePokerAdd()} >
                      <HistoryOutlined />&nbsp;&nbsp;発送通知履歴
                    </Button>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>

          </Grid>
        </MainCard>
      </Grid>

    </Grid>

  );
}
