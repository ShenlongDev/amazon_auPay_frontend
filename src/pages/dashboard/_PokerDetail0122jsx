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
import { SearchOutlined, EditOutlined, AppstoreAddOutlined, RedoOutlined, PlusOutlined, CrownOutlined, DeleteColumnOutlined } from '@ant-design/icons';


// icons
const icons = {
  SearchOutlined, EditOutlined, AppstoreAddOutlined, RedoOutlined, PlusOutlined
};

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
const postion_list_6 = ["UTG", "HJ", "CO", "BTN", "SB", "BB"];
const postion_list_5 = ["HJ", "CO", "BTN", "SB", "BB"];
const postion_list_4 = ["CO", "BTN", "SB", "BB"];
const postion_list_3 = ["BTN", "SB", "BB"];
const postion_list_2 = ["BTN", "BB"];

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
  // {
  //   value: 'SB',
  //   label: 'SB'
  // },
  // {
  //   value: 'BB',
  //   label: 'BB'
  // },
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
  const [sel_round, setSelRound] = useState(1);
  const [sel_round_info, setSelRoundInfo] = useState([]);
  const [sel_poker, setSelPoker] = useState(0);
  const [sel_poker_info, setSelPokerInfo] = useState('試合');
  const [mcard_type1, setMCardType1] = useState('H');
  const [mcard_type2, setMCardType2] = useState('H');
  const [tcard_type1, setTCardType1] = useState('H');
  const [tcard_type2, setTCardType2] = useState('H');
  const [tcard_type3, setTCardType3] = useState('H');
  const [tcard_type4, setTCardType4] = useState('H');
  const [tcard_type5, setTCardType5] = useState('H');
  const [player_cnt, setPlayerCnt] = useState(8);
  const [users_list, setUsersList] = useState(Array(player_cnt).fill('---'));
  const [position_list, setPositonList] = useState(Array(player_cnt).fill('---'));
  const [position_sellist, setSelPositonList] = useState(Array(player_cnt).fill('---'));
  const [action_sellist, setSelActionList] = useState(Array(player_cnt).fill('---'));
  const [bet_sellist, setSelBetList] = useState(Array(player_cnt).fill(''));
  const [stacks_sellist, setSelStackLists] = useState(Array(player_cnt).fill(''));
  const [stacks_list, setStackList] = useState(Array(player_cnt).fill(''));
  const [nowPort, setNowPort] = useState(0);
  const [nowBet, setNowBet] = useState(0);
  const [beforPort, setBeforePort] = useState(0);
  const [beforeBet, setBeforeBet] = useState(0);
  const [beforPostion, setBeforePostion] = useState(Array(player_cnt).fill(''));
  const [beforeStack, setBeforeStack] = useState(Array(player_cnt).fill(''));

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

  const [sel_sb, setSelSb] = useState(1);
  const [sel_bb, setSelBb] = useState(2);

  const [my_pos, setMyPos] = useState('UTG');
  const [sel_ps, setSelPs] = useState(2);
  const [sel_rake, setSelRake] = useState(5);
  const [sel_capp, setSelCapp] = useState(6);
  const [winpos, setWinpos] = useState(0);
  // GOLBAL
  const validateForm = () => {
    const newErrors = {};
    if (sel_poker <= 0) {
      newErrors.sel_poker = 'sel_poker';
    }

    return Object.keys(newErrors).length === 0;

  };

  const setPosInfo = async (val, index) => {

    const newPos = [...position_sellist];
    newPos[index] = val;
    setSelPositonList(newPos);

    if (val == "---") {
      const newBets = [...bet_sellist];
      const newStacks = [...stacks_sellist];
      const newAction = [...action_sellist];

      newBets[index] = 0;
      newStacks[index] = "---";
      newAction[index] = "---";

      setSelActionList(newAction);
      setSelStackLists(newStacks);
      setSelBetList(newBets);

      let maxBet = sel_bb;
      let sumBet = 0;
      for (let n = 0; n < newBets.length; n++) {
        if (!isNaN(newBets[n] * 1)) {
          if (newBets[n] > maxBet) maxBet = newBets[n];

          sumBet += newBets[n] * 1;
        }
      }

      setNowBet(maxBet);
      setNowPort(sumBet);

    }
  };

  const setActionInfo = async (val, index) => {
    const newAction = [...action_sellist];

    if (position_sellist[index] == "---") {
      alert((index) + "行ポジションを選択した後、アクションを選択してください");
      newAction[index] = "---";
      setSelActionList(newAction);
      return false;
    }

    newAction[index] = val;
    setSelActionList(newAction);

    let i = position_sellist.indexOf(position_sellist[index]);

    const newBets = [...bet_sellist];
    const newStacks = [...stacks_sellist];

    if (stage == 0) {

      if (val == "Call" || val == "Raise" || val == "Bet") {

        newBets[index] = nowBet;
        newStacks[index] = stacks_list[i] * 1 - nowBet * 1;
        setSelBetList(newBets);
        setSelStackLists(newStacks);

      }

      if (val == "Fold") {
        newBets[index] = 0;
        newStacks[index] = stacks_list[i];

        if (position_sellist[index] == "SB") {
          newStacks[index] = stacks_list[i] * 1 - sel_sb * 1;
        }
        if (position_sellist[index] == "BB") {
          newStacks[index] = stacks_list[i] * 1 - sel_bb * 1;
        }

        setSelBetList(newBets);
        setSelStackLists(newStacks);

      }
      if (val == "ALLIN") {
        newBets[index] = stacks_list[i];
        newStacks[index] = 0;
        setSelBetList(newBets);
        setSelStackLists(newStacks);
      }

      let maxBet = sel_bb;
      let sumBet = 0;

      for (let n = 0; n < newBets.length; n++) {
        if (!isNaN(newBets[n] * 1)) {
          if (newBets[n] > maxBet) maxBet = newBets[n];

          sumBet += newBets[n] * 1;
        }
      }

      if (position_sellist[index] == "SB") {
        sumBet = sumBet - sel_sb * 1;
      }
      // alert(position_sellist[index])
      // if (position_sellist[index] == "BB") {
      //   sumBet = sumBet - sel_bb * 1;
      // }

      setNowBet(maxBet);
      setNowPort(sumBet);

    } else {
      let i = beforPostion.indexOf(position_sellist[index]);
      stacks_sellist[index] = beforeStack[i];
      // if (!stacks_sellist[index]) {
      //   let i = position_sellist.indexOf(position_sellist[index]);
      //   stacks_sellist[index] = stacks_sellist[i];
      // }

      if (val == "Call") {

        newBets[index] = nowBet;
        newStacks[index] = stacks_sellist[index] * 1 - nowBet * 1;
        setSelBetList(newBets);
        setSelStackLists(newStacks);

      }
      if (val == "Check") {
        newBets[index] = 0;
        newStacks[index] = stacks_sellist[index];
        setSelBetList(newBets);
        setSelStackLists(newStacks);
      }
      if (val == "Fold") {
        newBets[index] = 0;
        newStacks[index] = stacks_sellist[index];
        setSelBetList(newBets);
        setSelStackLists(newStacks);
      }
      if (val == "Bet") {
        newBets[index] = 0;
        newStacks[index] = stacks_sellist[index];
        setSelBetList(newBets);
        setSelStackLists(newStacks);
      }
      if (val == "ALLIN") {
        newBets[index] = stacks_sellist[index];
        newStacks[index] = 0;
        setSelBetList(newBets);
        setSelStackLists(newStacks);
      }

      let maxBet = beforeBet * 1;
      let sumBet = beforPort * 1;

      for (let n = 0; n < newBets.length; n++) {
        if (!isNaN(newBets[n] * 1)) {
          if (newBets[n] > maxBet) maxBet = newBets[n];

          sumBet += newBets[n] * 1;
        }
      }
      setNowBet(maxBet);
      setNowPort(sumBet);
    }
  }

  const setStackInfo = async (val, index) => {

    const newBets = [...bet_sellist];
    newBets[index] = val;
    setSelBetList(newBets);

    let i = position_list.indexOf(position_sellist[index]);

    const newStacks = [...stacks_sellist];

    if (stage == 0) {
      if (val * 1 > sel_bb * 1) {
        newStacks[index] = stacks_list[i] - val;
        setSelStackLists(newStacks);
      }
    } else {
      i = beforPostion.indexOf(position_sellist[index]);
      newStacks[index] = beforeStack[i] - val;
      setSelStackLists(newStacks);
    }

    let maxBet = sel_bb;
    let sumBet = 0;
    if (stage > 0) {
      maxBet = beforeBet * 1;
      sumBet = beforPort * 1;
    }
    for (let n = 0; n < newBets.length; n++) {
      if (!isNaN(newBets[n] * 1)) {
        if (newBets[n] > maxBet) maxBet = newBets[n];

        sumBet += newBets[n] * 1;
      }
    }
    setNowBet(maxBet);
    setNowPort(sumBet);

  }

  const handleRoundSearch = async () => {

    setPreflop({});
    setFlop({});
    setTurn({});
    setRiver({});

    const requestData = {
      pid: sel_poker,
      round: sel_round
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

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}get_round`, requestData, {

      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {

          setSelRoundInfo(response.data);

          let mc = response.data.mcard.split(",");
          setMCardType1(mc[0].split(":")[0]);
          setMCard1(mc[0].split(":")[1]);
          setMCardType2(mc[1].split(":")[0]);
          setMCard2(mc[1].split(":")[1]);

          let tc = response.data.tcard.split(",");

          setTCardType1(tc[0].split(":")[0]);
          setTCard1(tc[0].split(":")[1]);
          setTCardType2(tc[1].split(":")[0]);
          setTCard2(tc[1].split(":")[1]);
          setTCardType3(tc[2].split(":")[0]);
          setTCard3(tc[2].split(":")[1]);
          setTCardType4(tc[3].split(":")[0]);
          setTCard4(tc[3].split(":")[1]);
          setTCardType5(tc[4].split(":")[0]);
          setTCard5(tc[4].split(":")[1]);
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
  const handleStageReset = async () => {
    // let s = 0
    // if(stage)s = stage;
    // selDetail(s);
    selDetail();
  }
  const handleStageAdd = async () => {


    let user = [];


    for (let i = 0; i < position_sellist.length; i++) {

      if (position_sellist[i] != "---") {

        let index = position_list.indexOf(position_sellist[i]);
        user.push(users_list[index]);
      }
    }

    const requestData = {
      pid: sel_poker,
      rid: sel_round,
      stage: stage,
      pos: position_sellist.filter(item => item !== "---").filter(item => item !== '"---"'),
      users: user,
      actions: action_sellist.filter(item => item !== "---").filter(item => item !== '"---"'),
      bets: bet_sellist.filter(item => item !== "---").filter(item => item !== '"---"'),
      stacks: stacks_sellist.filter(item => item !== "---").filter(item => item !== '"---"'),
      port: nowPort,
      bet: nowBet,
    };

    console.log(requestData);

    if (!window.confirm("保存しますか？")) {
      return false;
    }

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}add_stage`, requestData, {

      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          alert("保存されました。");
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

  const selDetail = async () => {
    const requestData = {
      pid: sel_poker,
      rid: sel_round,
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

          let positions = sel_poker_info.positions.replace(/'/g, '"');
          positions = JSON.parse(positions);
          positions.push('---')
          positions.unshift(sel_poker_info.my_position);
          setPositonList(positions);

          let users = sel_poker_info.users.replace(/'/g, '"');
          users = JSON.parse(users);
          setUsersList(users);

          let pstacks = sel_poker_info.nstacks.replace(/'/g, '"');
          pstacks = JSON.parse(pstacks);
          setStackList(pstacks);

          if (stage > -1) {

            const data = response.data[stage * 1];

            let pos = data.pos.replace(/'/g, '"');
            if (pos != "") pos = JSON.parse(pos);

            setPlayerCnt(users_list.length + 2);

            setSelPositonList(Array(player_cnt).fill('---'));
            setSelActionList(Array(player_cnt).fill('---'));
            setSelBetList(Array(player_cnt).fill(''));
            setSelStackLists(Array(player_cnt).fill(''));

            if (stage > 0) {

              setBeforePort(response.data[stage * 1 - 1].ports)
              setBeforeBet(response.data[stage * 1 - 1].bet)
              setNowBet(response.data[stage * 1 - 1].bet)
              setNowPort(response.data[stage * 1 - 1].ports)

            } else {
              // setNowBet(response.data[stage * 1 - 1].bet)
              // setNowPort(response.data[stage * 1 - 1].ports)  
            }

            const newPos = [...position_sellist];

            for (let i = 0; i < player_cnt; i++) {

              if (pos[i]) {
                newPos[i] = pos[i];
              } else {
                newPos[i] = "---";
              }
            }

            setSelPositonList(newPos);

            let stacks = data.stacks.replace(/'/g, '"');
            stacks = JSON.parse(stacks);

            if (stage > 0) {
              setBeforePostion(pos);
              setBeforeStack(stacks);
            }

            const newStack = [...stacks_sellist];

            for (let i = 0; i < player_cnt; i++) {

              if (stacks[i]) {
                newStack[i] = stacks[i];
              } else {
                newStack[i] = '"---"';
              }
            }

            setSelStackLists(newStack);

            let actions = data.actions.replace(/'/g, '"');

            actions = JSON.parse(actions);

            const newAction = [...action_sellist];

            for (let i = 0; i < player_cnt; i++) {

              if (actions[i]) {
                newAction[i] = actions[i];
              } else {
                newAction[i] = "---";
              }
            }

            setSelActionList(newAction);

            let bets = data.bets.replace(/'/g, '"');
            bets = JSON.parse(bets);
            const newBets = [...bet_sellist];
            for (let i = 0; i < player_cnt; i++) {

              if (actions[i]) {
                newBets[i] = bets[i];
              } else {
                newBets[i] = '"---"';
              }
            }
            setSelBetList(newBets);

            let maxBet = sel_sb;
            let sumBet = 0;

            if (stage > 0) {

              maxBet = (response.data[stage * 1 - 1].bet) * 1;
              sumBet = (response.data[stage * 1 - 1].ports) * 1;
              for (let n = 0; n < bets.length; n++) {
                if (!isNaN(bets[n] * 1)) {
                  if (bets[n] > maxBet) maxBet = bets[n];

                  sumBet += bets[n] * 1;
                }
              }
            } else {

              for (let n = 0; n < bets.length; n++) {
                if (!isNaN(bets[n] * 1)) {
                  if (bets[n] > maxBet) maxBet = bets[n];

                  sumBet += bets[n] * 1;
                }
              }

              sumBet = sumBet - sel_bb * 1 - sel_sb * 1;

            }

            setNowBet(maxBet);
            setNowPort(sumBet);

          } else {


          }
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


  const handleRoundDel = async () => {
    if (!window.confirm("削除しますか？")) {
      return false;
    }
    const requestData = {
      pid: sel_poker,
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
  const handleRoundAdd = async () => {
    if (!window.confirm("Roundとカード情報を保存しますか？")) {
      return false;
    }
    const requestData = {
      pid: sel_poker,
      round: sel_round,
      mcard: mcard_type1 + ":" + mcard1 + "," + mcard_type2 + ":" + mcard2,
      tcard: tcard_type1 + ":" + tcard1 + "," + tcard_type2 + ":" + tcard2 + "," + tcard_type3 + ":" + tcard3 + "," + tcard_type4 + ":" + tcard4 + "," + tcard_type5 + ":" + tcard5
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

    setSelSb(info.sblind);
    setSelBb(info.bblind);
    setNowBet(info.bblind);
    setSelCapp(info.capp)
    setNowPort(info.sblind * 1 + info.bblind * 1);
    setMyPos(info.my_position);
    setSelPs(info.player_cnt)
    setSelRake(info.rake);

  }

  const setRoundInfo = (sel) => {
    if (sel_poker == 0) {
      alert("試合を選択してください！");
      return false;
    }

  }
  const handlePokerEnd = async (val) => {

    console.log(preflop);
    const end_preflop = sel_poker_info.positions.replace(/'/g, '"');
    positions = JSON.parse(positions);

    const indices = [];
    positions.forEach((position, index) => {
      if (position === "SB") {
        indices.push(index);
      }
    });

    console.log(indices); 

    return false;

    const requestData = {
      pid: sel_poker_info.id,
      rid: sel_round_info.id,
      win: val
    };


    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}qtb_save`, requestData, {

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
        if (error.status == 301) {
          return false;
        }

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
            <Typography variant="h5">試合管理 / 詳細作成</Typography>
            <Typography variant="caption" color="secondary" noWrap>
              試試合詳細情報を作成します。
            </Typography>
          </Grid>
          <Grid item />
        </Grid>
        <Grid container gap={2} >
          <Grid item md={4} lg={4} xs={12}>
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
                    <Grid item xs={12}>
                      <Stack spacing={3} container >
                        <Grid>
                          <Typography variant="h5">参加人数 : {sel_poker_info.player_cnt ? (sel_poker_info.player_cnt) + '人' : '1人'}</Typography>
                          <Typography variant="caption" color="secondary" noWrap>
                            試合設定*
                          </Typography>
                        </Grid>
                        <Grid container alignItems="center" gap={2}>
                          <Grid item >
                            <Stack>

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
                          <Typography variant="h" sx={{ color: "#ff0000" }}>
                            <b>SB : {sel_sb}, BB : {sel_bb}, Stacks : {stacks_list[0]}, My : {my_pos}, 選手 : {sel_ps * 1}人, Rake : {sel_rake}% +{sel_capp}bb cap</b>
                          </Typography>
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
                                <MenuItem key={i} value={i + 1}>
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
                                    <img src={`/assets/images/card/${option.value}.png`} height={20} />
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
                                sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem', height: 25 } }}
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
                                    <img src={`/assets/images/card/${option.value}.png`} height={20} />
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
                                sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem', height: 25 } }}
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
                                    <img src={`/assets/images/card/${option.value}.png`} height={20} />
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
                                sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem', height: 25 } }}
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
                                    <img src={`/assets/images/card/${option.value}.png`} height={20} />
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
                                sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem', height: 25 } }}
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
                                    <img src={`/assets/images/card/${option.value}.png`} height={20} />
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
                                sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem', height: 25 } }}
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
                                    <img src={`/assets/images/card/${option.value}.png`} height={20} />
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
                                sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem', height: 25 } }}
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
                                    <img src={`/assets/images/card/${option.value}.png`} height={20} />
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
                                sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem', height: 25 } }}
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
                            <EditOutlined /> Round追加&カード保存
                          </Button>
                          <Button size="small" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#FF0000' }} onClick={() => handleRoundDel()} disabled={!validateForm()}>
                            <EditOutlined /> Round削除
                          </Button>
                        </Grid>
                      </Stack>
                    </Grid>
                  </Grid>
                </MainCard>
              </AccordionDetails>
            </Accordion>
            <MainCard sx={{ mt: 2 }}>
              <Stack spacing={3} xs={12} md={6} lg={6}>
                <Grid item >
                  <Stack>
                    <Typography variant="caption" color="secondary" noWrap>
                      ステージ設定* (Bet: {nowBet}, Port: {nowPort})
                    </Typography>
                    <TextField
                      id="standard-select-currency"
                      size="small"
                      select
                      value={stage}
                      onChange={(e) => { setStage(e.target.value); handleStageReset() }}
                      sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '250px' } }}
                      disabled={!validateForm()}
                    >
                      {stage_list.map((option) => (
                        <MenuItem key={option.value} value={option.value} >
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                </Grid>
                {Array.from({ length: player_cnt }, (_, i) => {
                  return (
                    <>
                      <Grid container sx={{ gap: 2, marginTop: '5px !important' }}>
                        <Grid item >
                          <Stack>
                            {i == 0 ?
                              <Typography variant="caption" color="secondary" noWrap>
                                ポジション*
                              </Typography>
                              : ''
                            }
                            <TextField
                              id="standard-select-currency"
                              size="small"
                              select
                              value={position_sellist[i]}
                              onChange={(e) => { setPosInfo(e.target.value, i); }}
                              sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '35px' } }}
                              disabled={stage == 0 && i < 2 ? true : false}
                            >
                              {position_sellist.map((option) => (
                                <MenuItem key={option} value={option} name={option} >
                                  {option}{ }
                                </MenuItem>
                              ))}
                            </TextField>
                          </Stack>
                        </Grid>
                        <Grid item >
                          <Stack>
                            {i == 0 ?
                              <Typography variant="caption" color="secondary" noWrap>
                                アクション設定*
                              </Typography>
                              : ''}
                            <TextField
                              id="standard-select-currency"
                              size="small"
                              select
                              value={action_sellist[i]}
                              onChange={(e) => { setActionInfo(e.target.value, i); }}
                              sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '50px' } }}
                              disabled={stage == 0 && i < 2 ? true : false}
                            >
                              {action_list.map((option) => (

                                <MenuItem key={option.value} value={option.label} >
                                  {option.value}
                                </MenuItem>

                              ))}
                            </TextField>
                          </Stack>
                        </Grid>
                        <Grid item >
                          <Stack>
                            {
                              i == 0 ?
                                <Typography variant="caption" color="secondary" noWrap>
                                  Bet設定*
                                </Typography>
                                : ''}
                            <TextField
                              id="standard-select-currency"
                              size="small"
                              type='number'
                              onChange={(e) => { setStackInfo(e.target.value, i) }}
                              sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '60px' } }}
                              value={bet_sellist[i]}
                              // disabled={((stage == 0 && i < 2) || ((action_sellist[i] != "Raise" || action_sellist[i] != "Bet" )&& i > 1)) ? true : false}
                              disabled={(action_sellist[i] == "Raise" || action_sellist[i] == "Bet") ? false : true}
                            >

                            </TextField>

                          </Stack>
                        </Grid>
                        <Grid item >
                          <Stack>
                            {i == 0 ?
                              <Typography variant="caption" color="secondary" noWrap>
                                Stack設定*
                              </Typography>
                              : ''}
                            <TextField
                              id="standard-select-currency"
                              size="small"
                              type='number'
                              sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '60px' } }}
                              value={stacks_sellist[i]}
                              // onChange={(e) => { setStackInfo(e.target.value, i) }}
                              disabled
                            >
                            </TextField>

                          </Stack>
                        </Grid>
                      </Grid>
                    </>
                  );
                })}
                <Grid container gap={2} alignItems="center">
                  <Button size="small" variant="contained" sx={{ textTransform: 'capitalize', }} onClick={() => handleStageReset()} disabled={!validateForm()}>
                    <RedoOutlined></RedoOutlined> ロード
                  </Button>
                  <Button size="small" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#faad14' }} onClick={() => handleStageAdd()} disabled={!validateForm()}>
                    <EditOutlined></EditOutlined>保管する
                  </Button>

                  <Button size="small" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#52c41a' }} onClick={() => handleStageAdd()} disabled={!validateForm()}>
                    <EditOutlined></EditOutlined>AI
                  </Button>
                </Grid>

              </Stack>
            </MainCard>
          </Grid>
          <Grid item md={7.5} lg={7.5} xs={12}>
            <MainCard >
              <Stack spacing={3}>
                <Grid item>
                  <Typography variant="h5">{sel_poker_info.poker_name ? sel_poker_info.poker_name : '試合選択*'} : Round {sel_round}</Typography>
                </Grid>
                <Grid container sx={{ gap: 2 }}>

                  <Grid item xs={12} md={12} lg={12}>
                    <MainCard sx={{ mt: 2 }} content={false}>
                      <OrdersTable poker_info={sel_poker_info} />
                    </MainCard>
                  </Grid>

                  <Grid item xs={12} md={5.5} lg={5.5}>
                    <MainCard sx={{ mt: 2 }} content={false}>
                      <PlayCardTable poker_info={sel_poker_info} round_info={sel_round_info} mcard_type1={mcard_type1} mcard_type2={mcard_type2} mcard1={mcard1} mcard2={mcard2} />
                    </MainCard>
                  </Grid>

                  <Grid item xs={12} md={6} lg={6}>
                    <MainCard sx={{ mt: 2 }} content={false}>
                      <PreflopTable preflop={preflop} />
                    </MainCard>
                  </Grid>

                  <Grid item xs={12} md={5.5} lg={5.5}>
                    <MainCard sx={{ mt: 2 }} content={false}>
                      <FlopTable flop={flop} poker_info={sel_poker_info} tcard1={tcard1} tcard2={tcard2} tcard3={tcard3} tcard_type1={tcard_type1} tcard_type2={tcard_type2} tcard_type3={tcard_type3} />
                    </MainCard>
                  </Grid>


                  <Grid item xs={12} md={6} lg={6}>
                    <MainCard sx={{ mt: 2 }} content={false}>
                      <TurnTable turn={turn} poker_info={sel_poker_info} tcard1={tcard1} tcard2={tcard2} tcard3={tcard3} tcard4={tcard4} tcard_type1={tcard_type1} tcard_type2={tcard_type2} tcard_type3={tcard_type3} tcard_type4={tcard_type4} />
                    </MainCard>
                  </Grid>
                  <Grid item xs={12} md={7} lg={7}>
                    <MainCard sx={{ mt: 2 }} content={false}>
                      <RiverTable river={river} poker_info={sel_poker_info} tcard1={tcard1} tcard2={tcard2} tcard3={tcard3} tcard4={tcard4} tcard5={tcard5}
                        tcard_type1={tcard_type1} tcard_type2={tcard_type2} tcard_type3={tcard_type3} tcard_type4={tcard_type4} tcard_type5={tcard_type5}
                        round_info={sel_round_info}
                      />
                    </MainCard>
                  </Grid>

                  <Grid container alignItems="center" mt={2} gap={2}>
                    <TextField
                      id="standard-select-currency"
                      size="small"
                      select
                      value={winpos}
                      onChange={(e) => { setWinpos(e.target.value); }}
                      sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '50px' } }}
                    >
                      {postion_list_6.map((option, index) => (

                        <MenuItem key={index} value={option} >
                          {option}
                        </MenuItem>

                      ))}
                    </TextField>
                    <Button variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#faad14', }} onClick={() => handlePokerEnd(0)}>
                      <CrownOutlined /> 試合完了
                    </Button>
                    {/* <Button variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#ff0000', }} onClick={() => handlePokerEnd(1)}>
                      <DeleteColumnOutlined /> 負け
                    </Button> */}
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <MainCard sx={{ mt: 2 }} content={false}>
                      <ResultTable />
                    </MainCard>
                  </Grid>
                </Grid>
              </Stack>
            </MainCard>
          </Grid>
        </Grid>

      </Grid>

    </Grid >

  );
}
