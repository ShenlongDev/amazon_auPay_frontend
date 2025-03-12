import { useState } from 'react';
// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';


// project import
import MainCard from 'components/MainCard';
import OrdersTable from './OrdersTable';
import PlayCardTable from './PlayCardTable';
import PreflopTable from './PreflopTable';
import FlopTable from './FlopTable';
import TurnTable from './TurnTable';
import RiverTable from './RiverTable';
import ResultTable from './ResultTable';

import { useEffect } from "react";
import { SearchOutlined, EditOutlined, AppstoreAddOutlined, RedoOutlined, PlusOutlined } from '@ant-design/icons';
import { set } from 'lodash';

// icons
const icons = {
  SearchOutlined, EditOutlined, AppstoreAddOutlined, RedoOutlined, PlusOutlined
};

const position_list = [
  {
    value: '---',
    label: '---'
  },
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
    value: 'H',
    label: 'hearts'
  },
  {
    value: 'D',
    label: 'diamonds'
  },
  {
    value: 'C',
    label: 'clubs'
  },
  {
    value: 'S',
    label: 'spades'
  },
];

const action_list = [
  {
    value: '---',
    label: '---'
  },
  {
    value: 'SB',
    label: 'SB'
  },
  {
    value: 'BB',
    label: 'BB'
  },
  {
    value: 'Call',
    label: 'Call'
  },
  {
    value: 'Fold',
    label: 'Fold'
  },
  {
    value: 'Check',
    label: 'Check'
  },
  {
    value: 'Bet',
    label: 'Bet'
  },
  {
    value: 'Raise',
    label: 'Raise'
  },
  {
    value: 'ALLIN',
    label: 'ALLIN'
  },
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //


export default function PokerDetail() {

  const [poker_list, setPokerList] = useState([]);
  const [sel_round, setSelRound] = useState(0);
  const [sel_poker, setSelPoker] = useState(0);
  const [sel_poker_info, setSelPokerInfo] = useState('試合');
  const [mcard_type1, setMCardType1] = useState('H');
  const [mcard_type2, setMCardType2] = useState('H');
  const [tcard_type1, setTCardType1] = useState('H');
  const [tcard_type2, setTCardType2] = useState('H');
  const [tcard_type3, setTCardType3] = useState('H');
  const [tcard_type4, setTCardType4] = useState('H');
  const [tcard_type5, setTCardType5] = useState('H');

  const [mcard1, setMCard1] = useState('5');

  const [mcard2, setMCard2] = useState('6');
  const [tcard1, setTCard1] = useState('7');
  const [tcard2, setTCard2] = useState('8');
  const [tcard3, setTCard3] = useState('9');
  const [tcard4, setTCard4] = useState('8');
  const [tcard5, setTCard5] = useState('9');

  const [preflop, setPreflop] = useState({});
  const [flop, setFlop] = useState({});
  const [turn, setTurn] = useState({});
  const [river, setRiver] = useState({});

  const [stage, setStage] = useState(0);

  const [pos1, setPos1] = useState('---');
  const [pos2, setPos2] = useState('---');
  const [pos3, setPos3] = useState('---');
  const [pos4, setPos4] = useState('---');
  const [pos5, setPos5] = useState('---');
  const [pos6, setPos6] = useState('---');
  const [pos7, setPos7] = useState('---');
  const [pos8, setPos8] = useState('---');

  const [u1, setU1] = useState(0);
  const [u2, setU2] = useState(-1);
  const [u3, setU3] = useState(-1);
  const [u4, setU4] = useState(-1);
  const [u5, setU5] = useState(-1);
  const [u6, setU6] = useState(-1);
  const [u7, setU7] = useState(-1);
  const [u8, setU8] = useState(-1);

  const [un1, setUn1] = useState('-----');
  const [un2, setUn2] = useState('-----');
  const [un3, setUn3] = useState('-----');
  const [un4, setUn4] = useState('-----');
  const [un5, setUn5] = useState('-----');
  const [un6, setUn6] = useState('-----');
  const [un7, setUn7] = useState('-----');
  const [un8, setUn8] = useState('-----');

  const [action1, setAction1] = useState('---');
  const [action2, setAction2] = useState('---');
  const [action3, setAction3] = useState('---');
  const [action4, setAction4] = useState('---');
  const [action5, setAction5] = useState('---');
  const [action6, setAction6] = useState('---');
  const [action7, setAction7] = useState('---');
  const [action8, setAction8] = useState('---');

  const [bet1, setBet1] = useState(0);
  const [bet2, setBet2] = useState(0);
  const [bet3, setBet3] = useState(0);
  const [bet4, setBet4] = useState(0);
  const [bet5, setBet5] = useState(0);
  const [bet6, setBet6] = useState(0);
  const [bet7, setBet7] = useState(0);
  const [bet8, setBet8] = useState(0);

  const [stack1, setStack1] = useState(0);
  const [stack2, setStack2] = useState(0);
  const [stack3, setStack3] = useState(0);
  const [stack4, setStack4] = useState(0);
  const [stack5, setStack5] = useState(0);
  const [stack6, setStack6] = useState(0);
  const [stack7, setStack7] = useState(0);
  const [stack8, setStack8] = useState(0);

  const [sel_detail, setSelDetail] = useState({});

  const [users_list, setUserList] = useState([{ name: '-----', id: -1 }, { name: 'My', id: 1000 }]);
  // GOLBAL
  const validateForm = () => {
    const newErrors = {};
    if (sel_poker <= 0) {
      newErrors.sel_poker = 'sel_poker';
    }

    return Object.keys(newErrors).length === 0;

  };

  const handleRoundSearch = async () => {

    setPreflop({});
    setFlop({});
    setTurn({});
    setRiver({});
    setSelPokerInfo('');
    console.log("setPreflop", preflop);

    const requestData = {
      pid: sel_poker,
      round: sel_round + 1
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}get_details`, requestData, {

      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          if (response.data.length == 4) {
            setPreflop(response.data[0]);
            setFlop(response.data[1]);
            setTurn(response.data[2]);
            setRiver(response.data[3]);
          } else {
            alert("Round詳細情報で問題が発生しました。");
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

  const handleStageAdd = async () => {
    let posAry = [];
    if (pos1 != "---") {
      posAry.push(pos1)
    }
    if (pos2 != "---") {
      posAry.push(pos2)
    }
    if (pos3 != "---") {
      posAry.push(pos3)
    }
    if (pos4 != "---") {
      posAry.push(pos4)
    }
    if (pos5 != "---") {
      posAry.push(pos5)
    }
    if (pos6 != "---") {
      posAry.push(pos6)
    }
    if (pos7 != "---") {
      posAry.push(pos7)
    }
    if (pos8 != "---") {
      posAry.push(pos8)
    }

    let uAry = [];
    let unAry = [];
    if (u1 != "---") {
      uAry.push(u1)
      unAry.push(un1)
    }
    if (u2 != "---") {
      uAry.push(u2)
      unAry.push(un2)
    }
    if (u3 != "---") {
      uAry.push(u3)
      unAry.push(un3)
    }
    if (u4 != "---") {
      uAry.push(u4)
      unAry.push(un4)
    }
    if (u5 != "---") {
      uAry.push(u5)
      unAry.push(un5)
    }
    if (u6 != "---") {
      uAry.push(u6)
      unAry.push(un6)
    }
    if (u7 != "---") {
      uAry.push(u7)
      unAry.push(un7)
    }
    if (u8 != "---") {
      uAry.push(u8)
      unAry.push(un8)
    }

    let actionAry = [];
    if (action1 != "---") {
      actionAry.push(action1)
    }
    if (action2 != "---") {
      actionAry.push(action2)
    }
    if (action3 != "---") {
      actionAry.push(action3)
    }
    if (action4 != "---") {
      actionAry.push(action4)
    }
    if (action5 != "---") {
      actionAry.push(action5)
    }
    if (action6 != "---") {
      actionAry.push(action6)
    }
    if (action7 != "---") {
      actionAry.push(action7)
    }
    if (action8 != "---") {
      actionAry.push(action8)
    }

    let betAry = [];
    if (bet1 > 0) {
      betAry.push(bet1)
    }
    if (bet2 > 0) {
      betAry.push(bet2)
    }
    if (bet3 > 0) {
      betAry.push(bet3)
    }
    if (bet4 > 0) {
      betAry.push(bet4)
    }
    if (bet5 > 0) {
      betAry.push(bet5)
    }
    if (bet6 > 0) {
      betAry.push(bet6)
    }
    if (bet7 > 0) {
      betAry.push(bet7)
    }
    if (bet8 > 0) {
      betAry.push(bet8)
    }

    let stackAry = [];
    if (stack1 > 0) {
      stackAry.push(stack1)
    }
    if (stack2 > 0) {
      stackAry.push(stack2)
    }
    if (stack3 > 0) {
      stackAry.push(stack3)
    }
    if (stack4 > 0) {
      stackAry.push(stack4)
    }
    if (stack5 > 0) {
      stackAry.push(bet3)
    }
    if (stack6 > 0) {
      stackAry.push(stack6)
    }
    if (stack7 > 0) {
      stackAry.push(stack7)
    }
    if (stack8 > 0) {
      stackAry.push(stack8)
    }

    const requestData = {
      pid: sel_poker,
      rid: sel_round + 1,
      stage: stage,
      pos: posAry,
      users: uAry,
      users_name: unAry,
      actions: actionAry,
      bets: betAry,
      stacks: stackAry,
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}add_stage`, requestData, {

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
          alert("Roundがすでに存在します。");
        }

        if (error.status == 401 || error.status == 422) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });

  }
  const selDetail = async (sel) => {

    const requestData = {
      pid: sel_poker,
      rid: sel_round + 1,
      stage: sel
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}get_detail`, requestData, {

      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then((response) => {

        console.log(response.status);
        if (response.status == 200) {
          // console.log(response.data[0]);
          const data = response.data[0];

          let actions = data.actions.replace(/'/g, '"');
          actions = JSON.parse(actions);

          let pos = data.pos.replace(/'/g, '"');
          pos = JSON.parse(pos);
          pos[0] ? setPos1(pos[0]) : setPos1("---");
          pos[1] ? setPos2(pos[1]) : setPos2("---");
          pos[2] ? setPos3(pos[2]) : setPos3("---");
          pos[3] ? setPos4(pos[3]) : setPos4("---");
          pos[4] ? setPos5(pos[4]) : setPos5("---");
          pos[5] ? setPos6(pos[5]) : setPos6("---");
          pos[6] ? setPos7(pos[6]) : setPos7("---");
          pos[7] ? setPos8(pos[7]) : setPos8("---");

          let users = data.users.replace(/'/g, '"');
          users = JSON.parse(users);
          users[0] ? setU1(users[0]) : setU1(-1);
          users[1] ? setU2(users[1]) : setU2(-1);
          users[2] ? setU3(users[2]) : setU3(-1);
          users[3] ? setU4(users[3]) : setU4(-1);
          users[4] ? setU5(users[4]) : setU5(-1);
          users[5] ? setU6(users[5]) : setU6(-1);
          users[6] ? setU7(users[6]) : setU7(-1);
          users[7] ? setU8(users[7]) : setU8(-1);
          
                  
          let user_name = data.users_name.replace(/'/g, '"');
          
          user_name = JSON.parse(user_name);
          

          user_name[0] ? setUn1(user_name[0]) : setUn1("-----");
          user_name[1] ? setUn2(user_name[1]) : setUn2("-----");
          user_name[2] ? setUn3(user_name[2]) : setUn3("-----");
          user_name[3] ? setUn4(user_name[3]) : setUn4("-----");
          user_name[4] ? setUn5(user_name[4]) : setUn5("-----");
          user_name[5] ? setUn6(user_name[5]) : setUn6("-----");
          user_name[6] ? setUn7(user_name[6]) : setUn7("-----");
          user_name[7] ? setUn8(user_name[7]) : setUn8("-----");

          let action = data.actions.replace(/'/g, '"');
          action = JSON.parse(action);
          action[0] ? setAction1(action[0]) : setAction1("---");
          action[1] ? setAction2(action[1]) : setAction2("---");
          action[2] ? setAction3(action[2]) : setAction3("---");
          action[3] ? setAction4(action[3]) : setAction4("---");
          action[4] ? setAction5(action[4]) : setAction5("---");
          action[5] ? setAction6(action[5]) : setAction6("---");
          action[6] ? setAction7(action[6]) : setAction7("---");
          action[7] ? setAction8(action[7]) : setAction8("---");

          let stacks = data.stacks.replace(/'/g, '"');
          stacks = JSON.parse(stacks);

          stacks[0] ? setStack1(stacks[0]) : setStack1(0);
          stacks[1] ? setStack2(stacks[1]) : setStack2(0);
          stacks[2] ? setStack3(stacks[2]) : setStack3(0);
          stacks[3] ? setStack4(stacks[3]) : setStack4(0);
          stacks[4] ? setStack5(stacks[4]) : setStack5(0);
          stacks[5] ? setStack6(stacks[5]) : setStack6(0);
          stacks[6] ? setStack7(stacks[6]) : setStack7(0);
          stacks[7] ? setStack8(stacks[7]) : setStack8(0);

          let bets = data.bets.replace(/'/g, '"');
          bets = JSON.parse(bets);
          bets[0] ? setBet1(bets[0]) : setBet1(0);
          bets[1] ? setBet2(bets[1]) : setBet2(0);
          bets[2] ? setBet3(bets[2]) : setBet3(0);
          bets[3] ? setBet4(bets[3]) : setBet4(0);
          bets[4] ? setBet5(bets[4]) : setBet5(0);
          bets[5] ? setBet6(bets[5]) : setBet6(0);
          bets[6] ? setBet7(bets[6]) : setBet7(0);
          bets[7] ? setBet8(bets[7]) : setBet8(0);

        }

      })
      .catch((error) => {
        if (error.status == 601) {
          alert("Roundがすでに存在します。");
        }

        if (error.status == 401 || error.status == 422) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });
  }
  const handlePokerEdit = async () => {
    localStorage.setItem("poker_info", JSON.stringify(sel_poker_info));
    window.location.href = "edit";
  }
  const handleRoundAdd = async () => {

    const requestData = {
      pid: sel_poker,
      round: sel_round + 1,
      mcard: mcard_type1 + ":" + mcard1 + "," + mcard_type2 + ":" + mcard2,
      tcard: tcard_type1 + ":" + tcard1 + "," + tcard_type2 + ":" + tcard2 + "," + tcard_type3 + ":" + tcard3 + "," + tcard_type4 + ":" + tcard4+ "," + tcard_type5+ ":" + tcard5
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}add_round`, requestData, {

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
          alert("Roundがすでに存在します。");
        }

        if (error.status == 401 || error.status == 422) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });

  }
  async function getData() {
    //Get Plays_list
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
          //setPlaysList(response.data);
          setPokerList(response.data);
        }
      })
      .catch((error) => {

        if (error.status == 401 || error.status == 422) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });

  }

  const setSelPokerInfo_ = (info) => {

    setSelPokerInfo(info);

    let names = info.users_name.replace(/'/g, '"');
    names = JSON.parse(names);
    let ids = info.users.replace(/'/g, '"');
    ids = JSON.parse(ids);

    let newUsers = [{ name: '-----', id: -1 }, { name: 'My', id: 1000 }];

    for (let i = 0; i < names.length; i++) {
      newUsers.push({ name: names[i], id: ids[i] })
    }
    console.log("userlist~~", newUsers);
    setUserList(newUsers);

  }

  const setRoundInfo = (sel) => {
    if (sel_poker == 0) {
      alert("試合を選択してください！");
      return false;
    }

  }

  useEffect(() => {
    getData();
  }, []);


  return (
    
    <Grid container rowSpacing={4.5} columnSpacing={2.75} >
      <Grid item xs={12} md={12} lg={12} >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">試合管理 / 詳細作成</Typography>
            <Typography variant="caption" color="secondary" noWrap>
              試試合詳細情報を作成します。
            </Typography>
          </Grid>
          <Grid item />
        </Grid>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">
              <Typography variant="h5">Round設定 </Typography>             
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MainCard sx={{ mt: 2 }}>
              <Grid container alignItems="center" gap={2} >
                <Grid item md={6} lg={6} xs={12}>
                  <Stack spacing={3} container >
                    <Grid container alignItems="center" gap={2}>
                      <Grid item >
                        <Stack>
                          <Typography variant="h5">参加人数 : {sel_poker_info.player_cnt ? (sel_poker_info.player_cnt*1 + 1) + '人' : '1人'}</Typography>
                          <Typography variant="caption" color="secondary" noWrap>
                            試合設定*
                          </Typography>
                          <TextField
                            id="standard-select-currency"
                            size="small"
                            select
                            value={sel_poker}
                            onChange={(e) => { setSelPoker(e.target.value); setSelPokerInfo_(poker_list.find(poker => poker.id == e.target.value)) }}
                            sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '250px' } }}
                          >
                            {poker_list.map((option) => (
                              <MenuItem key={option.id} value={option.id} name={option.poker_name}>
                                {option.poker_name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center" gap={2}>
                      <Typography variant="h6">Round設定</Typography>
                      <TextField
                        id="standard-select-currency"
                        size="small"
                        select
                        value={sel_round}
                        onChange={(e) => { setSelRound(e.target.value), setRoundInfo(e.target.value) }}
                        sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem' } }}
                      >
                        {Array.from({ length: 100 }, (_, i) => {
                          return (
                            <MenuItem key={i} value={i}>
                              Round {i + 1}
                            </MenuItem>
                          );
                        })}
                      </TextField>

                      <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }} onClick={() => handleRoundSearch()} disabled={!validateForm()}>
                        <RedoOutlined />ロード
                      </Button>

                    </Grid>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack>
                          <Typography variant="h6" noWrap>
                            My Card 1
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item sx={{ display: 'flex', gap: 1 }}>
                        <Grid item >
                          <TextField
                            id="standard-select-currency"
                            size="small"
                            select
                            value={mcard_type1}
                            onChange={(e) => setMCardType1(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '3.5rem' } }}
                          >
                            {card_type_list.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                <img src={`/assets/images/card/${option.value}.png`} width={25} />
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item>
                          <TextField
                            id="standard-select-currency"
                            size="small"
                            select
                            value={mcard1}
                            onChange={(e) => setMCard1(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem', height: 32 } }}
                          >
                            {card_list.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: '5px!important' }} justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack>
                          <Typography variant="h6" noWrap>
                            My Card 2
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item sx={{ display: 'flex', gap: 1 }}>
                        <Grid item >
                          <TextField
                            id="standard-select-currency"
                            size="small"
                            select
                            value={mcard_type2}
                            onChange={(e) => setMCardType2(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '3.5rem' } }}
                          >
                            {card_type_list.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                <img src={`/assets/images/card/${option.value}.png`} width={25} />
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item>
                          <TextField
                            id="standard-select-currency"
                            size="small"
                            select
                            value={mcard2}
                            onChange={(e) => setMCard2(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem', height: 32 } }}
                          >
                            {card_list.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: '5px!important' }} justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack>
                          <Typography variant="h6" noWrap>
                            Table Card 1
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item sx={{ display: 'flex', gap: 1 }}>
                        <Grid item >
                          <TextField
                            id="standard-select-currency"
                            size="small"
                            select
                            value={tcard_type1}
                            onChange={(e) => setTCardType1(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '3.5rem' } }}
                          >
                            {card_type_list.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                <img src={`/assets/images/card/${option.value}.png`} width={25} />
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item>
                          <TextField
                            id="standard-select-currency"
                            size="small"
                            select
                            value={tcard1}
                            onChange={(e) => setTCard1(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem', height: 32 } }}
                          >
                            {card_list.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: '5px!important' }} justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack>
                          <Typography variant="h6" noWrap>
                            Table Card 2
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item sx={{ display: 'flex', gap: 1 }}>
                        <Grid item >
                          <TextField
                            id="standard-select-currency"
                            size="small"
                            select
                            value={tcard_type2}
                            onChange={(e) => setTCardType2(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '3.5rem' } }}
                          >
                            {card_type_list.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                <img src={`/assets/images/card/${option.value}.png`} width={25} />
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item>
                          <TextField
                            id="standard-select-currency"
                            size="small"
                            select
                            value={tcard2}
                            onChange={(e) => setTCard2(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem', height: 32 } }}
                          >
                            {card_list.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: '5px!important' }} justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack>
                          <Typography variant="h6" noWrap>
                            Table Card 3
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item sx={{ display: 'flex', gap: 1 }}>
                        <Grid item >
                          <TextField
                            id="standard-select-currency"
                            size="small"
                            select
                            value={tcard_type3}
                            onChange={(e) => setTCardType3(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '3.5rem' } }}
                          >
                            {card_type_list.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                <img src={`/assets/images/card/${option.value}.png`} width={25} />
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item>
                          <TextField
                            id="standard-select-currency"
                            size="small"
                            select
                            value={tcard3}
                            onChange={(e) => setTCard3(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem', height: 32 } }}
                          >
                            {card_list.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: '5px!important' }} justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack>
                          <Typography variant="h6" noWrap>
                            Table Card 4
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item sx={{ display: 'flex', gap: 1 }}>
                        <Grid item >
                          <TextField
                            id="standard-select-currency"
                            size="small"
                            select
                            value={tcard_type4}
                            onChange={(e) => setTCardType4(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '3.5rem' } }}
                          >
                            {card_type_list.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                <img src={`/assets/images/card/${option.value}.png`} width={25} />
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item>
                          <TextField
                            id="standard-select-currency"
                            size="small"
                            select
                            value={tcard4}
                            onChange={(e) => setTCard4(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem', height: 32 } }}
                          >
                            {card_list.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: '5px!important' }} justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack>
                          <Typography variant="h6" noWrap>
                            Table Card 5
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item sx={{ display: 'flex', gap: 1 }}>
                        <Grid item >
                          <TextField
                            id="standard-select-currency"
                            size="small"
                            select
                            value={tcard_type5}
                            onChange={(e) => setTCardType5(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '3.5rem' } }}
                          >
                            {card_type_list.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                <img src={`/assets/images/card/${option.value}.png`} width={25} />
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item>
                          <TextField
                            id="standard-select-currency"
                            size="small"
                            select
                            value={tcard5}
                            onChange={(e) => setTCard5(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem', height: 32 } }}
                          >
                            {card_list.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: '5px!important' }} gap={2} alignItems="center">
                      <Button size="small" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#52c41a' }} onClick={() => handleRoundAdd()} disabled={!validateForm()}>
                        <EditOutlined /> カード更新する
                      </Button>
                      <Button size="small" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#faad14' }} onClick={() => handlePokerEdit()} disabled={!validateForm()}>
                        <EditOutlined/> 試合修正する
                      </Button>
                    </Grid>
                  </Stack>
                </Grid>

                <Stack spacing={3} xs={12} md={6} lg={6}>
                  <Grid item >
                    <Stack>
                      <Typography variant="caption" color="secondary" noWrap>
                        ステージ設定*
                      </Typography>
                      <TextField
                        id="standard-select-currency"
                        size="small"
                        select
                        value={stage}
                        onChange={(e) => { setStage(e.target.value); selDetail(e.target.value) }}
                        sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '250px' } }}
                        disabled={!validateForm()}
                      >
                        {stage_list.map((option) => (
                          <MenuItem key={option.value} value={option.value} name={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Stack>
                  </Grid>
                  <Grid container sx={{ gap: 2 }}>
                    <Grid item >

                      <Stack>
                        <Typography variant="caption" color="secondary" noWrap>
                          Blinds設定*
                        </Typography>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={pos1}
                          onChange={(e) => { setPos1(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '35px' } }}
                        >
                          {position_list.map((option) => (
                            <MenuItem key={option.value} value={option.value} name={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >

                      <Stack>
                        <Typography variant="caption" color="secondary" noWrap>
                          Player設定*
                        </Typography>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={u1}
                          onChange={(e) => { setU1(e.target.value); setUn1(users_list.find(play => play.id == e.target.value).name)}}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: "60px" } }}
                        >
                          {users_list.map((option) => (
                            <MenuItem key={option.id} value={option.id} name={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>

                    </Grid>
                    <Grid item >
                      <Stack>
                        <Typography variant="caption" color="secondary" noWrap>
                          Bet設定*
                        </Typography>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={action1}
                          onChange={(e) => { setAction1(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '50px' } }}
                        >
                          {action_list.map((option) => (
                            <MenuItem key={option.label} value={option.label} name={option.label}>
                              {option.value}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <Typography variant="caption" color="secondary" noWrap>
                          Bet設定*
                        </Typography>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          type='number'
                          onChange={(e) => { setBet1(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '60px' } }}
                          value={bet1}
                        >
                        </TextField>

                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <Typography variant="caption" color="secondary" noWrap>
                          Stack設定*
                        </Typography>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          type='number'
                          onChange={(e) => { setStack1(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '60px' } }}
                          value={stack1}
                        >
                        </TextField>

                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ gap: 2, marginTop: '5px!important' }}>
                    <Grid item >

                      <TextField
                        id="standard-select-currency"
                        size="small"
                        select
                        value={pos2}
                        onChange={(e) => { setPos2(e.target.value); }}
                        sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '35px' } }}
                      >
                        {position_list.map((option) => (
                          <MenuItem key={option.value} value={option.value} name={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>

                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={u2}
                          onChange={(e) => { setU2(e.target.value); setUn2(users_list.find(play => play.id == e.target.value).name)}}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: "60px" } }}
                        >
                          {users_list.map((option) => (
                            <MenuItem key={option.id} value={option.id} name={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={action2}
                          onChange={(e) => { setAction2(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '50px' } }}
                        >
                          {action_list.map((option) => (
                            <MenuItem key={option.label} value={option.label} name={option.label}>
                              {option.value}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          type='number'
                          onChange={(e) => { setBet2(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '60px' } }}
                          value={bet2}
                        >
                        </TextField>

                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          type='number'
                          onChange={(e) => { setStack2(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '60px' } }}
                          value={stack2}
                        >
                        </TextField>

                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ gap: 2, marginTop: '5px!important' }}>
                    <Grid item >
                      <TextField
                        id="standard-select-currency"
                        size="small"
                        select
                        value={pos3}
                        onChange={(e) => { setPos3(e.target.value); }}
                        sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '35px' } }}
                      >
                        {position_list.map((option) => (
                          <MenuItem key={option.value} value={option.value} name={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={u3}
                          onChange={(e) => { setU3(e.target.value); setUn3(users_list.find(play => play.id == e.target.value).name)}}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: "60px" } }}
                        >
                          {users_list.map((option) => (
                            <MenuItem key={option.id} value={option.id} name={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={action3}
                          onChange={(e) => { setAction3(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '50px' } }}
                        >
                          {action_list.map((option) => (
                            <MenuItem key={option.label} value={option.label} name={option.label}>
                              {option.value}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          type='number'
                          onChange={(e) => { setBet3(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '60px' } }}
                          value={bet3}
                        >
                        </TextField>

                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          type='number'
                          onChange={(e) => { setStack3(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '60px' } }}
                          value={stack3}
                        >
                        </TextField>

                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ gap: 2, marginTop: '5px!important' }} >
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={pos4}
                          onChange={(e) => { setPos4(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '35px' } }}
                        >
                          {position_list.map((option) => (
                            <MenuItem key={option.value} value={option.value} name={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={u4}
                          onChange={(e) => { setU4(e.target.value); setUn4(users_list.find(play => play.id == e.target.value).name)}}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: "60px" } }}
                        >
                          {users_list.map((option) => (
                            <MenuItem key={option.id} value={option.id} name={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={action4}
                          onChange={(e) => { setAction4(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '50px' } }}
                        >
                          {action_list.map((option) => (
                            <MenuItem key={option.label} value={option.label} name={option.label}>
                              {option.value}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          type='number'
                          onChange={(e) => { setBet4(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '60px' } }}
                          value={bet4}
                        >
                        </TextField>

                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          type='number'
                          onChange={(e) => { setStack4(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '60px' } }}
                          value={stack4}
                        >
                        </TextField>

                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ gap: 2, marginTop: '5px!important' }}>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={pos5}
                          onChange={(e) => { setPos5(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '35px' } }}
                        >
                          {position_list.map((option) => (
                            <MenuItem key={option.value} value={option.value} name={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={u5}
                          onChange={(e) => { setU5(e.target.value); setUn5(users_list.find(play => play.id == e.target.value).name)}}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: "60px" } }}
                        >
                          {users_list.map((option) => (
                            <MenuItem key={option.id} value={option.id} name={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={action5}
                          onChange={(e) => { setAction5(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '50px' } }}
                        >
                          {action_list.map((option) => (
                            <MenuItem key={option.label} value={option.label} name={option.label}>
                              {option.value}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          type='number'
                          onChange={(e) => { setBet5(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '60px' } }}
                          value={bet5}
                        >
                        </TextField>

                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          type='number'
                          onChange={(e) => { setStack5(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '60px' } }}
                          value={stack5}
                        >
                        </TextField>

                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ gap: 2, marginTop: '5px!important' }}>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={pos6}
                          onChange={(e) => { setPos6(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '35px' } }}
                        >
                          {position_list.map((option) => (
                            <MenuItem key={option.value} value={option.value} name={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={u6}
                          onChange={(e) => { setU6(e.target.value); setUn6(users_list.find(play => play.id == e.target.value).name)}}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: "60px" } }}
                        >
                          {users_list.map((option) => (
                            <MenuItem key={option.id} value={option.id} name={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={action6}
                          onChange={(e) => { setAction6(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '50px' } }}
                        >
                          {action_list.map((option) => (
                            <MenuItem key={option.label} value={option.label} name={option.label}>
                              {option.value}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          type='number'
                          onChange={(e) => { setBet6(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '60px' } }}
                          value={bet6}
                        >
                          
                        </TextField>

                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          type='number'
                          onChange={(e) => { setStack6(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '60px' } }}
                          value={stack6}
                        >
                        </TextField>

                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ gap: 2, marginTop: '5px!important' }}>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={pos7}
                          onChange={(e) => { setPos7(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '35px' } }}
                        >
                          {position_list.map((option) => (
                            <MenuItem key={option.value} value={option.value} name={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={u7}
                          onChange={(e) => { setU7(e.target.value); setUn7(users_list.find(play => play.id == e.target.value).name)}}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: "60px" } }}
                        >
                          {users_list.map((option) => (
                            <MenuItem key={option.id} value={option.id} name={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={action7}
                          onChange={(e) => { setAction7(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '50px' } }}
                        >
                          {action_list.map((option) => (
                            <MenuItem key={option.label} value={option.label} name={option.label}>
                              {option.value}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          type='number'
                          onChange={(e) => { setBet7(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '60px' } }}
                          value={bet7}
                        >
                        </TextField>

                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          type='number'
                          onChange={(e) => { setStack7(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '60px' } }}
                          value={stack7}
                        >
                        </TextField>

                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ gap: 2, marginTop: '5px!important' }}>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={pos8}
                          onChange={(e) => { setPos8(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '35px' } }}
                        >
                          {position_list.map((option) => (
                            <MenuItem key={option.value} value={option.value} name={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={u8}
                          onChange={(e) => { setU8(e.target.value); setUn8(users_list.find(play => play.id == e.target.value).name)}}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: "60px" } }}
                        >
                          {users_list.map((option) => (
                            <MenuItem key={option.id} value={option.id} name={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          select
                          value={action8}
                          onChange={(e) => { setAction8(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '50px' } }}
                        >
                          {action_list.map((option) => (
                            <MenuItem key={option.label} value={option.label} name={option.label}>
                              {option.value}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          type='number'
                          onChange={(e) => { setBet8(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '60px' } }}
                          value={bet8}
                        >
                        </TextField>

                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack>
                        <TextField
                          id="standard-select-currency"
                          size="small"
                          type='number'
                          onChange={(e) => { setStack8(e.target.value); }}
                          sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '60px' } }}
                          value={stack8}
                        >
                          
                        </TextField>

                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid container gap={2} alignItems="center">

                    <Button size="small" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#faad14' }} onClick={() => handleStageAdd()} disabled={!validateForm()}>
                      <EditOutlined></EditOutlined>ベッティング更新する
                    </Button>
                    <Button size="small" variant="contained" sx={{ textTransform: 'capitalize',  }} onClick={() => handleStageAdd()} disabled={!validateForm()}>
                      <EditOutlined></EditOutlined>AI
                    </Button>
                  </Grid>

                </Stack>

              </Grid>
            </MainCard>
          </AccordionDetails>
        </Accordion>

        <MainCard sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <Grid item>
              <Typography variant="h5">{sel_poker_info.poker_name ? sel_poker_info.poker_name : '試合選択*'} : Round {sel_round + 1}</Typography>
              <Typography variant="caption" color="secondary" noWrap>
               
              </Typography>
            </Grid>
            <Grid container sx={{ gap: 2 }}>

              <Grid item xs={12} md={12} lg={12}>
                <MainCard sx={{ mt: 2 }} content={false}>
                  <OrdersTable poker_info={sel_poker_info} />
                </MainCard>
              </Grid>

              <Grid item xs={12} md={3} lg={3}>
                <MainCard sx={{ mt: 2 }} content={false}>
                  <PlayCardTable poker_info={sel_poker_info} mcard_type1={mcard_type1} mcard_type2={mcard_type2} mcard1={mcard1} mcard2={mcard2} />
                </MainCard>
              </Grid>

              <Grid item xs={12} md={4} lg={4}>
                <MainCard sx={{ mt: 2 }} content={false}>
                  <PreflopTable preflop={preflop} />
                </MainCard>
              </Grid>

              <Grid item xs={12} md={4} lg={4}>
                <MainCard sx={{ mt: 2 }} content={false}>
                  <FlopTable flop={flop} poker_info={sel_poker_info} tcard1={tcard1} tcard2={tcard2} tcard3={tcard3} tcard_type1={tcard_type1} tcard_type2={tcard_type2} tcard_type3={tcard_type3} />
                </MainCard>
              </Grid>


              <Grid item xs={12} md={4} lg={4}>
                <MainCard sx={{ mt: 2 }} content={false}>
                  <TurnTable turn={turn} poker_info={sel_poker_info} tcard1={tcard1} tcard2={tcard2} tcard3={tcard3} tcard4={tcard4} tcard_type1={tcard_type1} tcard_type2={tcard_type2} tcard_type3={tcard_type3} tcard_type4={tcard_type4} />
                </MainCard>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <MainCard sx={{ mt: 2 }} content={false}>
                  <RiverTable river={river} poker_info={sel_poker_info} tcard1={tcard1} tcard2={tcard2} tcard3={tcard3} tcard4={tcard4} tcard5={tcard5}
                    tcard_type1={tcard_type1} tcard_type2={tcard_type2} tcard_type3={tcard_type3} tcard_type4={tcard_type4} tcard_type5={tcard_type5} />
                </MainCard>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <MainCard sx={{ mt: 2 }} content={false}>
                  <ResultTable />
                </MainCard>
              </Grid>
            </Grid>
          </Stack>
        </MainCard>
      </Grid>
      
    </Grid >

  );
}
