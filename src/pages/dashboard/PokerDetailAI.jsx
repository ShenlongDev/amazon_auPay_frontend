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
  // Porker Info =========================================================================================================
  const [sel_porker, setSelPorker] = useState(0);
  const [porker_list, setPorkerList] = useState([]);
  const [sel_sb, setSelSb] = useState(0);
  const [sel_bb, setSelBb] = useState(0);
  const [sel_my_pos, setSelMyPos] = useState('SB');
  const [sel_my_stack, setSelMyStack] = useState(200);
  const [sel_player, setSelPlayer] = useState(0);
  const [sel_rake, setSelRake] = useState(0);
  const [sel_capp, setSelCapp] = useState(0);
  const setSelPorkerInfo_ = async (info) => {

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
    const requestData = {
      pid: info.id,
    };
    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}get_round_list`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          setRoundList(response.data);
        }
      })
      .catch((error) => {
        if (error.status == 401 || error.status == 422) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });

  }

  // Round Info =========================================================================================================
  const [sel_round, setSelRound] = useState(1);
  const [round_list, setRoundList] = useState([]);

  const setSelRoundInfo_ = async (sel) => {
    // alert(sel);
    if (sel > 1) {
      const requestData = {
        pid: sel_porker,
        round: sel - 1,
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
    } else {
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
          setRoundList(response.data);
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

  //Detail Info =========================================================================================================
  const [sel_stage, setSelStage] = useState(0);
  const [sel_pos, setSelPos] = useState('BTN');
  const [sel_win, setSelWin] = useState('BTN');
  const [sel_bet, setSelBet] = useState(6);
  const [sel_bet_max, setSelBetMax] = useState('100');
  const [sel_bet_min, setSelBetMin] = useState(0);
  const [sel_port, setSelPort] = useState(0);
  const [sel_pos_list, setSelPosList] = useState(positionLists[2]);
  const [sel_now_pos_list, setSelNowPosList] = useState(positionLists[2]);
  const [betText, setBetText] = useState(['', '', '', '']);
  const [sel_mark, setSelMark] = useState([{ value: 0, label: '0' }, { value: 200, label: '200' }]);
  const [sel_result, setSelRusult] = useState('');
  const [sel_p_stack, setSelPStack] = useState([]);
  const [sel_p_stack_, setSelPStack_] = useState([]);

  // Card Info =========================================================================================================
  const [mcard, setMcard] = useState('H6,D7');
  const [mcardAry, setMcardAry] = useState([['H', '6'], ['D', '7']]);
  const [tcard, setTcard] = useState('H6,D7,C6,SK,H10');
  const [tcardAry, setTcardAry] = useState([['H', '6'], ['D', '7'], ['C', '6'], ['S', 'K'], ['H', '10']]);

  const setCard_ = (val) => {

    let card = checkCard(val);

    setTcardAry(card);

  }

  const setMyCard_ = (val) => {

    let card = checkCard(val);
    setMcardAry(card);

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
  // Detail info DB
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
          setStageInit_(4);
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
          setStageInit_(sel);
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
          setStageInit_(sel);
        }
      })
      .catch((error) => {
        if (error.status == 401 || error.status == 422) {
          alert("ログインをお願いします。");
          window.location.href = "./login";
        }
      });
  }
  // Detail info Logic
  const setStageInit_ = (stage) => {

    let port = 0;
    let min = 0;
    let stack = [...sel_p_stack_];
    let now_post = [1,1,1,1,1,1];

    for (let j = 0; j < sel_pos_list.length; j++) {
     
      for (let k = 0; k < (stage * 1 + 1); k++) {

        let bet = betText[k];

        if (bet) {
          bet = bet.split("\n");

          for (let i = 0; i < bet.length; i++) {
            if (bet[i]) {

              let b = bet[i].split(":");

              if (sel_pos_list[j] == b[0].trim() && b[1].trim().length > 2) {
                if (b[2]) stack[j] = (stack[j] * 10 - b[2] * 10) / 10;

                // if (b[0] == "SB" && b[1] == "Fold"){                  
                //   stack[j] = sel_p_stack_[j] * 1 - sel_sb*1;
                // }
                // if (b[0] == "BB" && b[1] == "Fold"){                  
                //   stack[j] = sel_p_stack_[j] * 1 - sel_bb*1
                // }

              }

              if (min < b[2] * 1) min = b[2];

              if (b[1] != "SB" && b[1] != "BB" && j == 0) {
                if (b[2]) port = port * 1 + b[2] * 1;
              }
             
              if(k == 0){
                if (b[0] == "SB" && b[1] == "Fold" && sel_pos_list[j]=="SB"){ 
                  port = port * 1 + sel_sb*1;
                  stack[j] = sel_p_stack_[j] * 1 - sel_sb*1;
                }
                if (b[0] == "BB" && b[1] == "Fold"  && sel_pos_list[j]=="BB"){ 
                  port = port * 1 + sel_bb*1;
                  //stack[j] = sel_p_stack_[j] * 1 - sel_bb*1
                }
              }

              if(b[1] == "Fold" && sel_pos_list[j] == b[0]){             
                now_post[j] = 0;
              }
            }
          }
        } else {
          if (stage == 0 && j == 0) {
            // setStageInit();
          }
        }
      }
    }
 
    setSelNowPosList(now_post);
    
    setSelPort(port);
    setSelBetMin(min);
    setSelPStack(stack);
  }
  const setStageInit = () => {

    const newBetText = [...betText];
    newBetText[0] = "SB:SB:" + sel_sb + ":" + (sel_p_stack[sel_p_stack.length - 2] - sel_sb) + "\n" + "BB:BB:" + sel_bb + ":" + (sel_p_stack[sel_p_stack.length - 1] - sel_bb);
    setBetText(newBetText);

    setSelBetMin(sel_bb);
    setSelBet(sel_bb);
    setSelPort(sel_bb * 1 + sel_sb * 1);
    setSelPos(sel_pos_list[0]);
  }
  const setSelStage_ = (sel) => {
    setStageInit_(sel);
    let next_pos = 3;
    if(sel_pos_list.length == 5) next_pos = 2;
    if(sel_pos_list.length == 4) next_pos = 1;
    if(sel_pos_list.length == 3) next_pos = 0;
    if(sel_pos_list.length == 2) next_pos = 1;
    let s_pos = getNextPos(next_pos);
  
    const index = sel_pos_list.indexOf(sel_pos);  
    
    setSelBetMax(sel_p_stack[index]);
    setSelMark([
      { value: sel_bet_min, label: sel_bet_min },
      { value: sel_p_stack[index], label: sel_p_stack[index] }
    ])

  }
  const setSelPos_ = (sel) => {
    setStageInit_(sel_stage)
    const index = sel_pos_list.indexOf(sel);
    setSelBetMax(sel_p_stack[index]);
    setSelMark([
      { value: sel_bet_min, label: sel_bet_min },
      { value: sel_p_stack[index], label: sel_p_stack[index] }
    ])

  }
  const setAction = (sel) => () => {
   
    setStageInit_(sel_stage);

    const index = sel_pos_list.indexOf(sel_pos);
    let selstack = sel_p_stack[index];

    const newBetText = [...betText];

    let txt = "";
    if (betText[sel_stage]) {
      txt = betText[sel_stage] + "\n";
    }

    let bet = 0;

    if (sel == "Call") {
      if (sel_bet_max * 1 >= sel_bet * 1) {
        bet = sel_bet;
        selstack = selstack - sel_bet;
      } else {
        alert("ベット値が不足しています。");
        return false;
      }
    }

    if (sel == "Raise" || sel == "Bet") {
      if (sel_bet_max * 1 >= sel_bet * 1) {
        bet = sel_bet;
        selstack = selstack - bet;
      } else {
        alert("ベット値が不足しています。");
        return false;
      }
    }

    if (sel == "AllIN") {
      if (sel_bet_max * 1 >= sel_bet_min * 1) {
        bet = sel_bet_max;
        selstack = 0;
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
        selstack = selstack - sel_sb;
      }

      if (sel_pos == "BB") {
        selstack = selstack - sel_bb;
      }

    }

    if(sel == "Check" ){
      bet = sel_bet_min;
      selstack = selstack - bet;
      setSelBetMin(bet);
    }
    
    newBetText[sel_stage] = txt + sel_pos + ":" + sel + ":" + bet + ":" + selstack;

    setBetText(newBetText);

    // setStageInit_(sel_stage);
    setSelBetMin(bet);
    setSelPort(sel_port * 1 + bet * 1);
    const new_stack = [...sel_p_stack];
    new_stack[index] = selstack;
    setSelPStack(new_stack);

    getNextPos(index)

  }
  const getNextPos = (sel) =>{
    let now = sel;
    if (sel > sel_pos_list.length - 2) {
      // setSelPos(sel_pos_list[0]);
      now = 0;
    } else {
      // setSelPos(sel_pos_list[sel + 1]);
      now = now*1+1;
    }
    if(sel_now_pos_list[now] == 0){
      getNextPos(now)
    }else{     
      setSelPos(sel_pos_list[now]);
      return now;
    }
  }
  const setSelBetText = (value, index) => {
    const newBetText = [...betText];
    newBetText[index] = value;
    setBetText(newBetText);
  };

  function setRoundEnd() {
  
    let port = 0;
    let one_allin = 0;
    let bet_allin = 0;


    let bet = betText[0];
    if (betText[1]) bet = betText[1];
    if (betText[2]) bet = betText[2];
    if (betText[3]) bet = betText[3];

    if (bet) {
      bet = bet.split("\n");
      for (let i = 0; i < bet.length; i++) {
        if (bet[i]) {
          let b = bet[i].split(":");
          if (b[1] == "AllIN" || b[1] == "Bet" || b[1] == "Raise") {
            one_allin++;
            bet_allin = b[2];
          }
        }
      }
    }

    port = sel_port;
    // if (one_allin == 1) port = sel_port - bet_allin;

    // setSelPort(port);

    let resultTxt = "";

    let result_stack = [];

    for (let i = 0; i < sel_pos_list.length; i++) {

      if (i > 0) resultTxt += "\n";
      resultTxt += sel_pos_list[i] + ":";

      if (sel_pos_list[i] == sel_win) {
        if (one_allin == 1) {
          result_stack[i] = (bet_allin * 1 + Math.round(port * (100 - sel_rake) / 10, 2) / 10);
          // resultTxt += (((bet_allin * 100 + port * (100 - sel_rake)) - sel_p_stack_[i] * 100) / 100) + ":" + result_stack[i];

          // result_stack[i] = ;
          // result_stack[i] = (port*100 - bet_allin*100) * (100 - sel_rake) / 100;
    
          resultTxt += ((port*100 - bet_allin*100) * (100 - sel_rake)) / 10000 + ":" + ((sel_p_stack_[i]*1) + (((port*100 - bet_allin*100) * (100 - sel_rake))/ 10000));

        } else {
          resultTxt += (Math.round(port * (100 - sel_rake)) - (sel_p_stack_[i] * 100 - sel_p_stack[i] * 100)) / 100 + ":" + (port * (100 - sel_rake)  + sel_p_stack[i] * 100) / 100;
          // result_stack[i] = (port * (100 - sel_rake)  + sel_p_stack[i] * 100) / 100;
        }
      } else {
        resultTxt += (Math.round(sel_p_stack[i] * 100) - Math.round(sel_p_stack_[i] * 100)) / 100 + ":" + sel_p_stack[i];
        // result_stack[i] = sel_p_stack[i];
      }
    }

    // console.log("resultTxt", result_stack);
    // setSelPStack(result_stack);
    setSelRusult(resultTxt);

  }
  //Global 
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
          setSelPorkerInfo_(response.data[0]);
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
        <Grid container gap={1}>
          <Grid item alignItems="center" md={4}>
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
                  Round設定
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
                  <Button size="small" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#52c41a' }} onClick={() => { setSelRoundInfo_(sel_round); setStageInit() }} disabled={!validateForm()}>
                    <RedoOutlined />&nbsp;ロード
                  </Button>
                </Grid>
                <Grid container gap={1} mt={1}>
                  {round_list && round_list.map((option, index) => (
                    <Button size="small" key={index} variant="contained"
                      sx={{ textTransform: 'capitalize', backgroundColor: option.round == sel_round ? '#ffc107' : '', width: '20px' }}
                      onClick={() => { setSelRound(option.round); setSelRoundInfo_(option.round); setStageInit() }}
                    >R {option.round}</Button>
                  ))}
                </Grid>
              </Stack>
            </Grid>
            <Grid item mt={1} >
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
                    onChange={(e) => { setMcard(e.target.valu), setMyCard_(e.target.value) }}
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
          <Grid item alignItems="center" gap={0} md={7}>
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
              <Grid backgroundColor={"#FF0000"} color={"#fff"} p={1}>Now</Grid>
              <Grid backgroundColor={"#52c41a"} p={1} sx={{ width: '50px', textAlign: 'right' }}>{sel_bet_min}</Grid>
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
                    <Radio key={`poslist${i}`} value={option} id={`sel_posw_${i}`} disabled = {sel_now_pos_list[i] == 0? true: false}
                    />{option}
                    ({sel_p_stack_[i]}/<a style={{ color: '#FF0000' }}>{sel_p_stack[i]}</a>)
                  </React.Fragment>
                ))}

              </RadioGroup>
            </Grid>

            <Grid container gap={2} mt={2}>

              <Grid item >
                <Grid item textAlign={'center'}>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    value={sel_bet}
                    type="number"
                    onChange={(e) => { setSelBet(e.target.value) }}
                    sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '60px' } }}
                  >
                  </TextField>
                </Grid>
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
                          <MenuItem key={i} value={option} disabled={sel_now_pos_list[i] == 0? true:false}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                      <Grid container>
                        <Button size="small" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#f44336', width: '85px' }} onClick={() => {setRoundEnd()}} disabled={!validateForm()}>
                          <CrownOutlined />&nbsp;完了
                        </Button>
                      </Grid>
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
