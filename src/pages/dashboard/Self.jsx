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
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SearchOutlined, EditOutlined, AppstoreAddOutlined, RedoOutlined, PlusOutlined, OpenAIOutlined, PlayCircleOutlined } from '@ant-design/icons';
// project import
import Draggable from 'react-draggable';
import MainCard from 'components/MainCard';


// assets
import { useEffect } from "react";

import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import { padding, width } from '@mui/system';


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
  }
];

const action_list = [
  {
    value: 'SB',
    label: 'SB'
  },
  {
    value: 'BB',
    label: 'BB'
  },
  {
    value: 'Raise',
    label: 'Raise'
  },
  {
    value: 'Call',
    label: 'Call'
  },
  {
    value: 'Check',
    label: 'Check'
  },
  {
    value: 'Flod',
    label: 'Flod'
  }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  // Pokers
  const [my_position, setMyPosition] = useState('SB');
  const [player_cnt, setPlayerCnt] = useState(1);
  const [poker_list, setPokerList] = useState([]);
  const [sel_poker_info, setSelPokerInfo] = useState('試合');
  const [sel_sb, setSelSb] = useState(1);
  const [sel_bb, setSelBb] = useState(2);
  const [sel_stack, setSelStack] = useState(200);
  const [my_pos, setMyPos] = useState('UTG');
  const [sel_poker, setSelPoker] = useState('試合');
  const [sel_round, setSelRound] = useState(1);
  const [sel_ps, setSelPs] = useState(2);
  const [sel_rake, setSelRake] = useState(0.5);
  const [sel_stage, setSelStage] = useState(0);
  const [mcard, setMcard] = useState('H:4,H:5');
  const [mcardAry, setMcardAry] = useState([["H", 5], ["H", 6]]);
  const [pcard, setPcard] = useState('H:4,H:5');
  const [pcardAry, setPcardAry] = useState([["H", 5], ["H", 6]]);

  const [poker_name, setPokerName] = useState('');
  const [sblind, setSBlind] = useState(1);
  const [bblind, setBBlind] = useState(2);
  const [mystack, setMyStack] = useState(200);
  const [sel_postion, setSelPostion] = useState('SB');
  const [sel_betting, setSelBetting] = useState(0);
  const [sel_action, setSelAction] = useState(0);
  const [rake, setRake] = useState(0.5);
  const [users, setUsers] = useState(Array(player_cnt).fill(''));
  const [userNames, setUserNames] = useState(Array(player_cnt).fill(''));
  const [positions, setPositions] = useState(Array(player_cnt).fill('SB'));
  const [pstacks, setPStacks] = useState(Array(player_cnt).fill(200));

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
  const validateRound = () => {
    const newErrors = {};
    if (!sel_poker) {
      newErrors.poker_name = '試合名は必須です。';
    }
    return Object.keys(newErrors).length === 0;
  }
  const validateBet = () => {
    const newErrors = {};
    if (!sel_poker) {
      newErrors.poker_name = '試合名は必須です。';
    }
    if (!sel_stage) {
      newErrors.poker_name = '試合名は必須です。';
    }
    return Object.keys(newErrors).length === 0;
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
    for (let i = 0; i < pstacks.length; i++) {
      if (pstacks[i] == "")
        newErrors.positions = '選手のStackを設定する必要があります。';
    }

    return Object.keys(newErrors).length === 0;

  };
  
  const handleMyDetailAdd = async () => {

  };

  const handleRoundSearch = async () => {

    const requestData = {
      pid: sel_poker,
      rid: sel_round,
      kind:'my',
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}get_round`, requestData, {

      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          setMcard(response.data.mcard);
          setCardConfig(response.data.mcard, 1);
          setPcard(response.data.tcard);
          setCardConfig(response.data.tcard, 2);
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

  const handleMyRoundAdd = async () => {
    const requestData = {
      pid: sel_poker,
      round: sel_round,    
      mcard: mcard,
      tcard: pcard,
      kind: "my",
    };

    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}add_myround`, requestData, {

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
        positions: positions,
        pstacks: pstacks,
        rake: rake,
        selid: 0
      };

      if (!window.confirm("情報を保存しますか？")) {
        return false;
      }
      await axios.post(`${import.meta.env.VITE_PUBLIC_URL}add_myporker`, requestData, {

        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
        .then((response) => {
          console.log(response.status);
          if (response.status == 200) {
            getData();
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
  const setPlayerCnt_ = (val) => {
    setPlayerCnt(val);
    setPositions(Array(player_cnt*1).fill('SB'));
    setPStacks(Array(player_cnt*1).fill(mystack));
  }
  const setCardConfig = (cards, k) => {


    cards = cards.split(",");

    let cAry = [];

    for (let i = 0; i < cards.length; i++) {
      let c = cards[i].split(":");
      if (c.length == 2) {
        cAry.push(c);
      }
    }
    if (k == 1) {
      setMcardAry(cAry);
    } else {
      setPcardAry(cAry);
    }
  }
  const setSelPokerInfo_ = (info) => {
    setSelSb(info.sblind);
    setSelBb(info.bblind);
    setMyPos(info.my_position);
    setSelStack(info.mystack);
    setSelPs(info.player_cnt)
    setSelRake(info.rake);
  }
  // GOLBAL
  async function getData() {
    const requestData = {
      uuid: 1,
    };
    await axios.post(`${import.meta.env.VITE_PUBLIC_URL}get_mpokers`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
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

  useEffect(() => {
    getData();
  }, []);


  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} >

      <Grid item xs={12} sm={6} md={6} lg={6}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">
              <Typography variant="h5">試合設定</Typography>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MainCard sx={{ mt: 2 }}>
              <Stack spacing={3}>
                <Grid container alignItems="center" sx={{ marginBottom: '0px !important' }} gap={2}>
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
                        sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '30px' } }}
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
                        onChange={(e) => { setPlayerCnt_(e.target.value); }}
                        sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '10px' } }}
                      >
                        {Array.from({ length: 6 }, (_, i) => {
                          return (
                            <MenuItem key={i} value={i + 1}>
                              {i + 1}
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
                        sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '50px' } }}
                      >
                      </TextField>
                    </Stack>
                  </Grid>
                  <Grid item >
                    <Stack>
                      <Typography variant="caption" color="secondary" noWrap>
                        Rake%*
                      </Typography>
                      <TextField
                        id="standard-select-currency"
                        size="small"
                        type="number"
                        value={rake}
                        onChange={(e) => { setRake(e.target.value) }}
                        sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '50px' } }}
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
                            P{i + 1}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item sx={{ display: 'flex', gap: 1 }}>

                        <Grid item>
                          <TextField
                            id={`position-select-${i}`}
                            size="small"
                            select
                            value={positions[i] || ''}
                            onChange={(e) => handlePositionChange(i, e.target.value)}
                            sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '30px' } }}
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
                            sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '50px' } }}
                          >

                          </TextField>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}

                <Button size="big" variant="contained" sx={{ textTransform: 'capitalize' }} onClick={() => handlePokerAdd()} disabled={!validateForm()} >
                  <AppstoreAddOutlined />&nbsp;&nbsp;試合追加する
                </Button>
              </Stack>
            </MainCard>
          </AccordionDetails>
        </Accordion>
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
              <Stack spacing={3}>
                <Grid container alignItems="center" gap={2}>
                  <Typography variant="h">試合選択*</Typography>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    select
                    value={sel_poker}
                    onChange={(e) => { setSelPoker(e.target.value); setSelPokerInfo_(poker_list.find(poker => poker.id == e.target.value)) }}
                    sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '150px' } }}
                  >
                    {poker_list.map((option) => (
                      <MenuItem key={option.id} value={option.id} name={option.poker_name}>
                        {option.poker_name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid container alignItems="center" gap={2}>
                  <Typography variant="h">
                    SB : {sel_sb}, BB : {sel_bb}, Stacks : {sel_stack}, My : {my_pos}, 選手 : {sel_ps}人, Rake : {sel_rake}%
                  </Typography>
                </Grid>
                <Grid container alignItems="center" gap={2}>
                  <Typography variant="h">回目選択*</Typography>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    type="number"
                    value={sel_round}
                    onChange={(e) => { setSelRound(e.target.value) }}
                    sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '50px' } }}
                  ></TextField>
                  <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }} onClick={() => handleRoundSearch()} disabled={!validateRound()}>
                    <RedoOutlined />ロード
                  </Button>
                  <Button size="small" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#52c41a' }} onClick={() => handleMyRoundAdd()} disabled={!validateRound()}>
                    <AppstoreAddOutlined />保存
                  </Button>
                </Grid>
                <Grid container alignItems="center" gap={1}>
                  <img src={`/assets/images/card/H.png`} height={20} /> H
                  <img src={`/assets/images/card/C.png`} height={20} /> C
                  <img src={`/assets/images/card/D.png`} height={20} /> D
                  <img src={`/assets/images/card/S.png`} height={20} /> S
                </Grid>
                <Grid container alignItems="center" gap={2}>

                  <Typography variant="h">マイバンド</Typography>

                  <Typography sx={{ display: 'flex', alignItems: 'center', height: '25px' }} gap={0.3}>
                    {mcardAry && mcardAry.map((option) => (
                      <>
                        <img src={`/assets/images/card/${option[0]}.png`} height={20} />
                        <h3>{option[1]}</h3>
                      </>
                    ))}
                  </Typography>

                  <TextField
                    id="standard-select-currency"
                    size="small"
                    value={mcard}
                    onChange={(e) => { setMcard(e.target.value); setCardConfig(e.target.value, 1) }}
                    sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '80px' } }}
                  ></TextField>
                </Grid>
                <Grid container alignItems="center" gap={2} >
                  <Typography variant="h">Tバンド</Typography>

                  <Typography sx={{ display: 'flex', alignItems: 'center', height: '25px' }} gap={0.3}>
                    {pcardAry && pcardAry.map((option) => (
                      <>
                        <img src={`/assets/images/card/${option[0]}.png`} height={20} />
                        <h3>{option[1]}</h3>
                      </>
                    ))}
                  </Typography>

                  <TextField
                    id="standard-select-currency"
                    size="small"
                    value={pcard}
                    onChange={(e) => { setPcard(e.target.value); setCardConfig(e.target.value, 2) }}
                    sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '150px' } }}
                  ></TextField>
                </Grid>
                <Grid container alignItems="center" gap={2}>
                  <Typography variant="h">ステージ</Typography>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    select
                    value={sel_stage}
                    onChange={(e) => { setSelStage(e.target.value); }}
                    sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '1rem', width: '70px' } }}
                  >
                    {stage_list.map((option) => (
                      <MenuItem key={option.value} value={option.value} name={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Stack>
            </MainCard>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} >
        <Draggable >
          <MainCard sx={{ mt: 2, width: "300px", boxShadow: "4px 4px 4px 4px #CCC" }}>
            <Grid container rowSpacing={4.5} columnSpacing={2.75} >
              <Grid item xs={12} md={12} lg={12} >
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h5">Action設定</Typography>
                    <Typography variant="caption" color="secondary" noWrap>
                      ドラッグが可能な編集画面です。
                    </Typography>
                  </Grid>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Typography variant="caption" color="secondary" noWrap>
                      ポジション選択*
                    </Typography>
                    <TextField
                      id="standard-select-currency"
                      size="small"
                      select
                      value={sel_postion}
                      onChange={(e) => setSelPostion(e.target.value)}
                      sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '30px' } }}
                    >
                      {position_list.map((option) => (
                        <MenuItem key={option.value} value={option.value} >
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid container alignItems="center" justifyContent="space-between" mt={1}>
                    <Typography variant="caption" color="secondary" noWrap>
                      ベット値*
                    </Typography>
                    <TextField
                      id="standard-select-currency"
                      size="small"
                      type='number'
                      value={sel_betting}
                      onChange={(e) => setSelBetting(e.target.value)}
                      sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '55px' } }}
                    >
                    </TextField>
                  </Grid>
                  <Grid container alignItems="center" justifyContent="space-between" mt={1}>
                    <Typography variant="caption" color="secondary" noWrap>
                      アクション設定*
                    </Typography>
                    <TextField
                      id="standard-select-currency"
                      size="small"
                      select
                      value={sel_action}
                      onChange={(e) => setSelAction(e.target.value)}
                      sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '30px' } }}
                    >
                      {action_list.map((option) => (
                        <MenuItem key={option.value} value={option.value} >
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid container alignItems="center" justifyContent="space-between" mt={1}>
                    <Button size="big" variant="contained" sx={{ textTransform: 'capitalize' }} onClick={() => handleMyDetailAdd()} disabled={!validateBet()} >
                      <PlayCircleOutlined />&nbsp;&nbsp;ベッティング
                    </Button>
                    <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#52c41a' }} disabled={!validateBet()} >
                      <OpenAIOutlined />&nbsp;&nbsp;AI
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

            </Grid>

          </MainCard>
        </Draggable>
      </Grid>

    </Grid >

  );
}
