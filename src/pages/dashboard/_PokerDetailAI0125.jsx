import React, { useState } from 'react';
// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';

// project import
import { useEffect } from "react";
import { RedoOutlined, DeleteColumnOutlined, SaveOutlined, CrownOutlined } from '@ant-design/icons';
import { Radio } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import { width } from '@mui/system';

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
const positionLists = {
  6: ["UTG", "HJ", "CO", "BTN", "SB", "BB"],
  5: ["HJ", "CO", "BTN", "SB", "BB"],
  4: ["CO", "BTN", "SB", "BB"],
  3: ["BTN", "SB", "BB"],
  2: ["BTN", "BB"]
};
const btn = [["Check", "#4caf50"], ["Call", "#2196f3"], ["Fold", "#ffc107"], ["Bet", "#3f51b5"], ["Raise", "#ff9800"], ["AllIN", "#f44336"], ["AI", "#52c41a"]];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function PokerDetailAI() {
  // Porker Info
  const [sel_porker, setSelPorker] = useState(0);
  const [sel_porkerInfo, setSelPorkerInfo] = useState({});
  const [porker_list, setPorkerList] = useState([]);
  const [sel_sb, setSelSb] = useState(0);
  const [sel_bb, setSelBb] = useState(0);
  const [sel_my_pos, setSelMyPos] = useState('SB');
  const [sel_my_stack, setSelMyStack] = useState(200);
  const [sel_player, setSelPlayer] = useState(0);
  const [sel_rake, setSelRake] = useState(0);
  const [sel_capp, setSelCapp] = useState(0);

  const setSelPorkerInfo_ = async (info) => {
    setSelPorkerInfo(info);
    setSelSb(info.sblind);
    setSelBb(info.bblind);
    setSelPlayer(info.player_cnt);
    setSelMyPos(info.my_position);
    setSelMyStack(info.mystack);
    setSelRake(info.rake);
    setSelCapp(info.capp);
    setSelBetMax(info.mystack);
    if (info.player_cnt) {
      setSelPosList(positionLists[info.player_cnt]);
    }

    if (sel_round == 1) {

      let p_stack = [...sel_p_stack];
      for (let i = 0; i < info.player_cnt; i++) {
        p_stack[i] = info.mystack;
      }

      setSelPStack(p_stack);
      setSelPStack_(p_stack);

    } else {
      //round stack info
      const requestData = {
        pid: sel_porker,
        round: sel_round - 1,
      };

      await axios.post(`${import.meta.env.VITE_PUBLIC_URL}get_round_result`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
        .then((response) => {
          console.log(response.status);
          if (response.status == 200) {
            let rewards = response.data.rewards;
            rewards = rewards.split("\n");
            const new_stack = [];
            for (let i = 0; i < rewards.length; i++) {
              let reward = rewards[i].split(":");
              new_stack[i] = reward[2];
            }

            setSelPStack(new_stack);
            setSelPStack_(new_stack);
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

  // Round Info
  const [sel_round, setSelRound] = useState(1);
  // const [sel_roundInfo, setSelRoundInfo] = useState({});
  const setSelRoundInfo_ = async () => {

    if (sel_round > 1) {
      const requestData = {
        pid: sel_porker,
        round: sel_round - 1,
      };
      await axios.post(`${import.meta.env.VITE_PUBLIC_URL}get_round_result`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
        .then((response) => {
          console.log(response.status);
          if (response.status == 200) {

            let rewards = response.data.rewards;
            rewards = rewards.split("\n");
            const new_stack = [];
            for (let i = 0; i < rewards.length; i++) {
              let reward = rewards[i].split(":");
              new_stack[i] = reward[2];
            }

            setSelPStack(new_stack);
            setSelPStack_(new_stack);
          }
        })
        .catch((error) => {
          if (error.status == 501) {
            alert("以前のRoundの試合データはありません。");           
          }
          if (error.status == 401 || error.status == 422) {
            alert("ログインをお願いします。");
            window.location.href = "./login";
          }
        });
    }else{
      const new_stack = [];
      for (let i = 0; i < sel_pos_list.length; i++) {
        new_stack[i] = sel_my_stack;
      }
      setSelPStack(new_stack);
      setSelPStack_(new_stack);
    }
  }


  const handleRoundAdd = async () => {
    if (sel_porker == 0) {
      alert("試合を選択する必要があります。");
      return false;
    }
    if (!window.confirm("Roundとカード情報を保存しますか？")) {
      return false;
    }



    const requestData = {
      pid: sel_porker,
      round: sel_round,
      mcard: mcard,
      tcard: tcard
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
          alert("保存されました。");
          selDetail(0);
        }
      })
      .catch((error) => {
        if (error.status == 300) {
          alert("試合を選択する必要があります");
          return false;
        }

        if (error.status == 601) {
          alert("Roundがすでに存在します。");
          return false;
        }

        if (error.status == 401 || error.status == 422) {
          alert("ログインをお願いします。");
          window.location.href = "./login";

        }
      });

  }
  const handleRoundDel = async () => {

    if (!window.confirm("削除しますか？")) {
      return false;
    }
    const requestData = {
      pid: sel_porker,
      round: sel_round,
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}round_del`, requestData, {

      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          alert("削除されました。");
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
  const validateForm = () => {
    const newErrors = {};
    if (sel_porker <= 0) {
      newErrors.sel_poker = 'sel_poker';
    }

    return Object.keys(newErrors).length === 0;

  };

  //Detail Info
  const [sel_row, setSelRow] = useState(1);
  const [sel_stage, setSelStage] = useState(0);
  const [sel_pos, setSelPos] = useState('BTN');
  const [sel_win, setSelWin] = useState('BTN');
  const [sel_bet, setSelBet] = useState(6);
  const [sel_bet_max, setSelBetMax] = useState('100');
  const [sel_bet_min, setSelBetMin] = useState(0);
  const [sel_port, setSelPort] = useState(0);
  const [sel_action, setSelAction] = useState('Call');
  const [sel_pos_list, setSelPosList] = useState(positionLists[2]);
  const [betText, setBetText] = useState(['', '', '', '']);
  const [sel_mark, setSelMark] = useState([{ value: 0, label: '0' }, { value: 200, label: '200' }]);
  const [sel_result, setSelRusult] = useState('');

  const setResultSave = async () => {
    const requestData = {
      pid: sel_porker,
      round: sel_round,
      data: sel_result,
      win: sel_win,
    };

    if (!window.confirm("保存しますか？")) {
      return false;
    }
    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}add_round_result`, requestData, {
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
        if (error.status == 401 || error.status == 422) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });
  }
  const setStageSave = async (sel) => {
    const requestData = {
      pid: sel_porker,
      round: sel_round,
      stage: sel,
      data: betText[sel]
    };

    if (!window.confirm("保存しますか？")) {
      return false;
    }
    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}add_stage_ai`, requestData, {
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
        if (error.status == 401 || error.status == 422) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });
  }
  const setGetRoundResult = async (sel) => {

    const requestData = {
      pid: sel_porker,
      round: sel_round,
      stage: sel,
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}get_round_result`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {

          setSelRusult(response.data.rewards);
          setSelWin(response.data.win);
        }
      })
      .catch((error) => {
        if (error.status == 401 || error.status == 422) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });

  }
  const setStageLoad = async (sel) => {
    const requestData = {
      pid: sel_porker,
      round: sel_round,
      stage: sel,
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}get_stage_ai`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          let bt = [...betText]
          bt[sel] = response.data.actions;
          setBetText(bt);
        }
      })
      .catch((error) => {
        if (error.status == 401 || error.status == 422) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });
  }


  const betMaxMin = (stage, pos, val) => {
    const index = sel_pos_list.indexOf(pos);

    let bet = betText[stage];
    let min = sel_bet_min;
    let max = sel_bet_max;

    if (bet) {
      bet = bet.split("\n");
      max = sel_p_stack[index];

      for (let i = 0; i < bet.length; i++) {

        if (bet[i]) {
          let b = bet[i].split(":");

          if (b[0].trim() == pos && b[1].trim().length > 2) {

            max = max * 1 - b[2] * 1;
            if (min * 1 < val * 1) {
              min = val * 1;
            }
          } else {

            if (b[2] >= min) {
              min = b[2] * 1;
              if (min * 1 < val * 1) {
                min = val * 1;
              }
            }
          }
        }

      }

      max = max - val;

    } else {
      // return false;
      max = max - val;
      min = val;
    }
    // let mark = [];   

    // mark[0] = {value:min*1, label: min};   
    // mark[1] = {value:max*1, label: max};   
    console.log("pos", pos)
    console.log("max", max)

    setSelMark([
      { value: min * 1, label: min },
      { value: max * 1, label: max }
    ])
    setSelBet(min * 1);
    setSelBetMax(max * 1);
    setSelBetMin(min * 1);

    return max;

  }

  const [sel_p_stack, setSelPStack] = useState([]);
  const [sel_p_stack_, setSelPStack_] = useState([]);

  const setSelPort_ = () => {

    let port = 0;

    for (let i = 0; i < 4; i++) {
      let bet = betText[i];

      if (bet) {
        bet = bet.split("\n");
        for (let i = 0; i < bet.length; i++) {
          if (bet[i]) {
            let b = bet[i].split(":");
            if (b[2]) port = port * 1 + b[2] * 1;
          }
        }
      }
    }
    setSelPort(port - sel_sb * 1 - sel_bb * 1);
  }

  const setStageInit_ = (stage) => {
    let port = 0;
    if (sel_round == 1) {
      if (stage == 0) {
        setSelPStack(sel_p_stack_)
      } else {
        let min = 0;
        let stack = [...sel_p_stack_];

        for (let j = 0; j < sel_pos_list.length; j++) {

          for (let i = 0; i < stage; i++) {
            let bet = betText[i];

            if (bet) {
              bet = bet.split("\n");
              for (let i = 0; i < bet.length; i++) {
                if (bet[i]) {

                  let b = bet[i].split(":");
                  if (sel_pos_list[j] == b[0].trim() && b[1].trim().length > 2) {
                    if (b[2]) stack[j] = stack[j] - b[2];
                  }

                  if (min < b[2] * 1) min = b[2];

                  if (b[2]) port = port * 1 + b[2] * 1;

                }
              }
            }
          }
        }

        setSelPort(port);
        setSelBetMin(min);
        setSelPStack(stack);

      }


    } else {

    }
  }

  const setStageInit = (stage, pos) => {
    if (stage == 0) {

      const newBetText = [...betText];
      newBetText[0] = "SB:SB:" + sel_sb + ":" + (sel_p_stack[sel_p_stack.length - 2] - sel_sb) + "\n" + "BB:BB:" + sel_bb + ":" + (sel_p_stack[sel_p_stack.length - 1] - sel_bb);
      setBetText(newBetText);
    }

    setStageInit_(stage);

  }

  const setSelStage_ = (sel) => {

    if (!betText[sel]) {

      const index = sel_pos_list.indexOf(sel_pos);

      setStageInit(sel, sel_pos);

      setSelBetMin(0);
      setSelBetMax(sel_p_stack[index]);

      setSelMark([
        { value: sel_bet_min, label: sel_bet_min },
        { value: sel_p_stack[index], label: sel_p_stack[index] }
      ])
    } else {
      betMaxMin(sel, sel_pos, 0);
    }

  }
  const setSelPos_ = (sel) => {
    if (!betText[sel_stage]) {
      const index = sel_pos_list.indexOf(sel);
      setStageInit(sel_stage, sel);
      setSelBetMin(0);

      setSelBetMax(Number(sel_p_stack[index]));

      setSelMark([
        { value: sel_bet_min, label: sel_bet_min },
        { value: sel_p_stack[index], label: sel_p_stack[index] }
      ])
    } else {
      betMaxMin(sel_stage, sel, 0);
    }
  }

  const setAction = (sel) => () => {

    const index = sel_pos_list.indexOf(sel_pos);
    let selstack = sel_p_stack[index];

    setSelAction(sel);
    const newBetText = [...betText];

    let txt = "";
    if (betText[sel_stage]) {
      txt = betText[sel_stage] + "\n";
    }
    let bet = 0;
    let stack = 0;

    stack = sel_bet_max;
    if (sel == "Call") {

      if (sel_bet_max * 1 >= sel_bet * 1) {
        bet = sel_bet_min;
        stack = betMaxMin(sel_stage, sel_pos, bet)
      } else {
        alert("ベット値が不足しています。");
        return false;
      }


    }
    if (sel == "Raise" || sel == "Bet") {

      if (sel_bet_max * 1 >= sel_bet * 1) {
        bet = sel_bet;
        stack = betMaxMin(sel_stage, sel_pos, bet)
      } else {
        alert("ベット値が不足しています。");
        return false;
      }

    }
    if (sel == "AllIN") {

      if (sel_bet_max * 1 >= sel_bet_min * 1) {
        bet = sel_bet_max;
        stack = betMaxMin(sel_stage, sel_pos, bet)
      } else {
        alert("ベット値が不足しています。");
        return false;
      }
    }

    if (sel == "AI" && sel_pos != sel_my_pos) {
      alert("自分のポジションでのみクリックできます。");
      return false;
    }

    if (sel_stage == 0 && sel == "Fold") {
      if (sel_pos == "SB") {
        stack = selstack - sel_sb;
      }

      if (sel_pos == "BB") {
        stack = selstack - sel_bb;
      }
    }

    newBetText[sel_stage] = txt + sel_pos + ":" + sel + ":" + bet + ":" + stack;

    setBetText(newBetText);

    setSelPort_();
    // const i = sel_pos_list.indexOf(sel_pos);

    // if(i < sel_player-1){ 
    //   setSelPos(sel_pos_list[i + 1]);
    //   setSelPos_(sel_pos_list[i + 1]);
    // }else{
    //   setSelPos(sel_pos_list[0]);
    //   setSelPos_(sel_pos_list[0]);
    // }

  }

  const setSelBetText = (value, index) => {
    const newBetText = [...betText];
    newBetText[index] = value;
    setBetText(newBetText);
  };



  // Card Info
  const [mcard, setMcard] = useState('H6,D7');
  const [mcardAry, setMcardAry] = useState([['H', '6'], ['D', '7']]);
  const [tcard, setTcard] = useState('H6,D7,C6,SK,H10');
  const [tcardAry, setTcardAry] = useState([['H', '6'], ['D', '7'], ['C', '6'], ['S', 'K'], ['H', '10']]);

  const setCard_ = (val) => {

    let card = checkCard(val);
    if (card.length == 2) {
      setMcardAry(card);
    } else if (card.length > 2 && card.length < 6) {
      setTcardAry(card);
    }
  }

  //Global Function
  function setRoundEnd() {
    let port = 0;
    let one_allin = 0;
    let bet_allin = 0;

    for (let i = 0; i < 4; i++) {
      let bet = betText[i];

      if (bet) {
        bet = bet.split("\n");
        for (let i = 0; i < bet.length; i++) {
          if (bet[i]) {
            let b = bet[i].split(":");
            if (b[2]) {
              port = port * 1 + b[2] * 1;
            }
            if (b[1] == "AllIN") {
              one_allin++;
              bet_allin = b[2];
            }
          }
        }
      }
    }
    port = port - sel_sb * 1 - sel_bb * 1;
    if (one_allin == 1) port = port - bet_allin;

    setSelPort(port);
    // alert(pse);
    setStageInit_(4);

    setSelPort(port);

    let resultTxt = "";
    console.log("sel_p_stack_", sel_p_stack_);
    console.log("sel_p_stack", sel_p_stack);
    let result_stack = [];

    for (let i = 0; i < sel_pos_list.length; i++) {

      if (i > 0) resultTxt += "\n";
      resultTxt += sel_pos_list[i] + ":";
      if (sel_pos_list[i] == sel_win) {
        if (one_allin == 1) {

          resultTxt += (((bet_allin * 100 + port * (100 - sel_rake)) - sel_p_stack_[i] * 100) / 100) + ":" + (bet_allin * 1 + Math.round(port * (100 - sel_rake) / 10, 2) / 10);
          result_stack[i] = (bet_allin * 1 + Math.round(port * (100 - sel_rake) / 10, 2) / 10);
        } else {
          resultTxt += ((port * (100 - sel_rake) / 100) - sel_p_stack_[i]) + ":" + (port * (100 - sel_rake) / 100 + sel_p_stack[i]);
          result_stack[i] = (port * (100 - sel_rake) / 100 + sel_p_stack[i]);
        }
      } else {
        resultTxt += (sel_p_stack[i] - sel_p_stack_[i]) + ":" + sel_p_stack[i];
        result_stack[i] = sel_p_stack[i];
      }
    }

    // console.log("resultTxt", result_stack);
    setSelRusult(resultTxt);

  }

  function checkCard(val) {
    let cardAry = [];
    let cAry = val.split(",");
    for (let i = 0; i < cAry.length; i++) {
      let c = [];
      c[0] = (cAry[i][0]);
      c[1] = (cAry[i][1]);
      cardAry.push(c);
    }

    return cardAry;
  }

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
            <Typography variant="h5">試合管理 / 詳細作成</Typography>
            <Typography variant="caption" color="secondary" noWrap>
              試合詳細情報を作成します。
            </Typography>
          </Grid>
        </Grid>
        <Grid container gap={3}>
          <Grid item alignItems="center">
            <Grid container mt={2}>
              <Stack >
                <Typography variant="caption" color="secondary" noWrap>
                  Round設定*
                </Typography>
                <TextField
                  id="standard-select-currency"
                  size="small"
                  select
                  value={sel_porker}
                  onChange={(e) => { setSelPorker(e.target.value); setSelPorkerInfo_(porker_list.find(poker => poker.id == e.target.value)) }}
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
            <Grid item mt={2}>
              <Stack  >
                <Typography variant="caption" color="secondary" noWrap>
                  試合設定*
                </Typography>
                <Grid container gap={1}>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    select
                    value={sel_round}
                    onChange={(e) => { setSelRound(e.target.value) }}
                    sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '118px' } }}
                  >
                    {Array.from({ length: 100 }, (_, i) => {
                      return (
                        <MenuItem key={i} value={i + 1}>
                          Round {i + 1}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                  <Button size="small" variant="contained" sx={{ textTransform: 'capitalize',  }} onClick={() => setSelRoundInfo_()} disabled={!validateForm()}>
                    <RedoOutlined />&nbsp;ロード
                  </Button>
                </Grid>
              </Stack>
            </Grid>
            <Grid item mt={5} >
              <Stack width={'100%'}>
                <Grid item>
                  <img src={`/assets/images/card/H.png`} height={20} /> H <img src={`/assets/images/card/D.png`} height={20} />D &nbsp;
                  <img src={`/assets/images/card/C.png`} height={20} /> C <img src={`/assets/images/card/S.png`} height={20} />S
                </Grid>
                <Typography variant="caption" color="secondary" noWrap>
                  カード入力形式 : H5,D3
                </Typography>
              </Stack>

            </Grid>
            <Grid item mt={2} >
              <Typography variant="caption" color="secondary" noWrap>
                マイバンド*
              </Typography>
              <Grid container alignItems="center" gap={2}  >
                <Grid item>
                  <Grid container alignItems="center">
                    {mcardAry.map((option, index) => (
                      <Grid key={`clist${index}`} fontSize={18}>
                        <img src={`/assets/images/card/${option[0]}.png`} height={20} />&nbsp;{option[1]}&nbsp;
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    value={mcard}
                    onChange={(e) => { setMcard(e.target.valu), setCard_(e.target.value) }}
                    sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '60px' } }}
                  >
                  </TextField>
                </Grid>
              </Grid>

            </Grid>
            <Grid container mt={2} >
              <Stack width={'100%'}>
                <Typography variant="caption" color="secondary" noWrap>
                  テーブルカード*
                </Typography>

                <Grid item>
                  <Grid container alignItems="center">
                    {tcardAry.map((option, index) => (
                      <Grid key={`ctlist${index}`} fontSize={18}>
                        <img src={`/assets/images/card/${option[0]}.png`} height={20} />&nbsp;{option[1]}&nbsp;
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    value={tcard}
                    onChange={(e) => { setTcard(e.target.value), setCard_(e.target.value) }}
                    sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '220px' } }}
                  >
                  </TextField>
                </Grid>


              </Stack>

            </Grid>
            <Grid container mt={2} gap={1}>

              <Button variant="contained" sx={{ textTransform: 'capitalize' }} onClick={() => handleRoundAdd()} disabled={!validateForm()}>
                <SaveOutlined />&nbsp;Roundデータ保存
              </Button>
              <Button variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#FF0000' }} onClick={() => handleRoundDel()} disabled={!validateForm()}>
                <DeleteColumnOutlined /> 削除
              </Button>

            </Grid>
          </Grid>

          <Grid item alignItems="center" gap={0}  >
            <Grid container alignItems="center" gap={0} >
              <Grid backgroundColor={"#FF0000"} color={"#fff"} p={1}>SB</Grid>
              <Grid backgroundColor={"#CCCCCC"} p={1}>{sel_sb}</Grid>
              <Grid backgroundColor={"#FF0000"} color={"#fff"} p={1}>BB</Grid>
              <Grid backgroundColor={"#CCCCCC"} p={1}>{sel_bb}</Grid>
              <Grid backgroundColor={"#FF0000"} color={"#fff"} p={1}>My</Grid>
              <Grid backgroundColor={"#CCCCCC"} p={1}>{sel_my_pos}</Grid>
              <Grid backgroundColor={"#FF0000"} color={"#fff"} p={1}>選手</Grid>
              <Grid backgroundColor={"#CCCCCC"} p={1}>{sel_player * 1}人</Grid>
              <Grid backgroundColor={"#FF0000"} color={"#fff"} p={1}>Rake</Grid>
              <Grid backgroundColor={"#CCCCCC"} p={1}>{sel_rake}% +{sel_capp}bb cap</Grid>
              <Grid backgroundColor={"#FF0000"} color={"#fff"} p={1}>Stack</Grid>
              <Grid backgroundColor={"#CCCCCC"} p={1}>{sel_my_stack}</Grid>
              <Grid backgroundColor={"#FF0000"} color={"#fff"} p={1}>Port</Grid>
              <Grid backgroundColor={"#52c41a"} p={1} sx={{ width: '50px', textAlign: 'right' }}>{sel_port}</Grid>
            </Grid>
            {/* Radio confign */}
            <Grid mt={1}>
              <RadioGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                name="sel_stage"
                sx={{ alignItems: 'center' }}
                value={sel_stage}
                onChange={(e) => { setSelStage(e.target.value); setSelStage_(e.target.value); }}

              >
                {stage_list.map((option, i) => (
                  <React.Fragment key={`stagelist${i}`}>
                    <Radio value={i} id={`sel_stage_${i}`} disabled={!validateForm()} />{option.label}
                  </React.Fragment>
                ))}

              </RadioGroup>
            </Grid>
            {/* <Grid >
              <RadioGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                name="sel_row"
                sx={{ alignItems: 'center' }}
                value={sel_row}
                onChange={(e) => { setSelRow(e.target.value); }}
              >
                {Array.from({ length: 10 }, (_, i) => {
                  return (
                    <>
                      <Radio key={i} value={i + 1} id={`sel_row_${i}`} />{i + 1}行
                    </>
                  );
                })}
              </RadioGroup>
            </Grid> */}
            <Grid mt={1}>
              <RadioGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                name="sel_pos"
                sx={{ alignItems: 'center' }}
                value={sel_pos}
                onChange={(e) => { setSelPos(e.target.value); setSelPos_(e.target.value); }}
              >
                {sel_pos_list.map((option, i) => (
                  <React.Fragment key={`poslist${i}`}>
                    <Radio key={`poslist${i}`} value={option} id={`sel_posw_${i}`} disabled={!validateForm()} />{option} ({sel_p_stack[i]})
                  </React.Fragment>
                ))}

              </RadioGroup>
            </Grid>
            <Grid container gap={2} mt={2}>
              <Grid item >
                {btn.map((option, i) => (
                  <Grid p={0.5} key={`actionlist${i}`}>
                    <Button variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: option[1], width: '83px' }}
                      onClick={setAction(option[0])} disabled={!validateForm()}>
                      {option[0]}
                    </Button>
                  </Grid>
                ))}
              </Grid>

              <Grid container item mt={1.5} gap={2} xs={10} sm={10} md={10} lg={10} >
                <Slider
                  aria-label="Always visible"
                  value={sel_bet}
                  step={1}
                  marks={sel_mark}
                  max={Number(sel_bet_max)}
                  min={Number(sel_bet_min)}
                  onChange={(e) => { setSelBet(e.target.value) }}
                  valueLabelDisplay="on"
                  disabled={!validateForm()}

                />
                {stage_list.map((option, i) => (
                  <Grid item key={`plist${i}`}>
                    <Grid item>
                      <TextField
                        label={option.label}
                        multiline
                        rows={8}
                        variant="outlined"
                        value={betText[i]}
                        sx={{ width: '170px' }}
                        onChange={(e) => { setSelBetText(e.target.value, i) }}
                      />

                    </Grid>
                    <Grid container alignItems="center" justifyContent="space-between" mt={1}>
                      <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}
                        onClick={() => setStageSave(i)} disabled={!validateForm()} >
                        <SaveOutlined></SaveOutlined>保存
                      </Button>
                      <Button size="small" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: "#52c41a" }}
                        onClick={() => setStageLoad(i)} disabled={!validateForm()} >
                        <RedoOutlined></RedoOutlined>ロード
                      </Button>
                    </Grid>
                  </Grid>
                ))}
                <Grid item>
                  <Stack  >
                    <Typography variant="caption" color="secondary" noWrap>
                      Winner*
                    </Typography>
                    <Grid container gap={1}>
                      <TextField
                        id="standard-select-currency"
                        size="small"
                        select
                        value={sel_win}
                        onChange={(e) => { setSelWin(e.target.value) }}
                        sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '40px' } }}
                      >
                        {sel_pos_list.map((option, i) => (
                          <MenuItem key={i} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                      <Button size="small" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#f44336' }} onClick={() => setRoundEnd()} disabled={!validateForm()}>
                        <CrownOutlined />&nbsp;完了
                      </Button>
                    </Grid>
                  </Stack>
                </Grid>
                <Grid item>
                  <Grid item>
                    <TextField
                      label="Result"
                      multiline
                      rows={8}
                      variant="outlined"
                      value={sel_result}
                      sx={{ width: '170px' }}
                      onChange={(e) => { setSelRusult(e.target.value) }}
                    />

                  </Grid>
                  <Grid container alignItems="center" justifyContent="space-between" mt={1}>
                    <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}
                      onClick={() => setResultSave()} disabled={!validateForm()} >
                      <SaveOutlined></SaveOutlined>保存
                    </Button>
                    <Button size="small" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: "#52c41a" }}
                      onClick={() => setGetRoundResult({ sel_round })} disabled={!validateForm()} >
                      <RedoOutlined></RedoOutlined>ロード
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid >

    </Grid >

  );
}
