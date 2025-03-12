import { useState } from 'react';
// material-ui
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import MenuItem from '@mui/material/MenuItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import UniqueVisitorCard from './UniqueVisitorCard';
import SaleReportCard from './SaleReportCard';
import OrdersTable from './OrdersTable';

// assets
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';


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

const player_list = [
  {
    value: '1',
    label: 'User01'
  },
  {
    value: '2',
    label: 'User02'
  },
  {
    value: '3',
    label: 'User03'
  },{
    value: '4',
    label: 'User04'
  },{
    value: '5',
    label: 'User05'
  }
];

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


// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const [value, setValue] = useState('today');
  const [my_position, setMyPosition] = useState('SB');
  const [p1_position, setPosition1] = useState('SB');
  const [p2_position, setPosition2] = useState('SB');
  const [p3_position, setPosition3] = useState('SB');
  const [p4_position, setPosition4] = useState('SB');
  const [p5_position, setPosition5] = useState('SB');

  const [user1, setUser1] = useState(1);
  const [user2, setUser2] = useState(2);
  const [user3, setUser3] = useState(3);
  const [user4, setUser4] = useState(4);
  const [user5, setUser5] = useState(5);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">試合</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack>
                  <Typography variant="h5" noWrap>
                    設定
                  </Typography>
                  <Typography variant="caption" color="secondary" noWrap>
                    Typical replay within 5 min
                  </Typography>
                </Stack>
              </Grid>

              <Grid item>
                <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                  <Avatar alt="Remy Sharp" src={avatar1} />
                  <Avatar alt="Travis Howard" src={avatar2} />
                  <Avatar alt="Cindy Baker" src={avatar3} />
                  <Avatar alt="Agnes Walker" src={avatar4} />
                </AvatarGroup>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between" alignItems="center">

              <Grid item >
                <Stack>
                  <Typography variant="caption" color="secondary" noWrap>
                    マイ
                  </Typography>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    select
                    value={my_position}
                    onChange={(e) => setValue(e.target.value)}
                    sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem' } }}
                  >
                    {position_list.map((option) => (
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
                    Stack
                  </Typography>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem' } }}
                  >
                  </TextField>
                </Stack>
              </Grid>
              <Grid item >
                <Stack>
                  <Typography variant="caption" color="secondary" noWrap>
                    S.Blind
                  </Typography>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem' } }}
                  >
                  </TextField>
                </Stack>
              </Grid>
              <Grid item>
                <Stack>
                  <Typography variant="caption" color="secondary" noWrap>
                    B.Blind
                  </Typography>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem', width: '3.5rem' } }}
                  >
                  </TextField>
                </Stack>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack>
                  <Typography variant="h6" noWrap>
                    Player 1
                  </Typography>
                </Stack>
              </Grid>
              <Grid item sx={{ display: 'flex', gap: 1 }}>
                <Grid item >
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    select
                    value={user1}
                    onChange={(e) => setUser1(e.target.value)}
                    sx={{ '& .MuiInputBase-input': { py: 0.75,  fontSize: '0.875rem', width: '3.5rem' }}}
                  >
                    {player_list.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    select
                    value={p1_position}
                    onChange={(e) => setPosition1(e.target.value)}
                    sx={{ '& .MuiInputBase-input': { py: 0.75,  fontSize: '0.875rem', width: '3.5rem' }}}
                  >
                    {position_list.map((option) => (
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
                    Player 2
                  </Typography>
                </Stack>
              </Grid>
              <Grid item sx={{ display: 'flex', gap: 1 }}>
                <Grid item >
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    select
                    value={user2}
                    onChange={(e) => setUser2(e.target.value)}
                    sx={{ '& .MuiInputBase-input': { py: 0.75,  fontSize: '0.875rem', width: '3.5rem' }}}
                  >
                    {player_list.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    select
                    value={p2_position}
                    onChange={(e) => setPosition2(e.target.value)}
                    sx={{ '& .MuiInputBase-input': { py: 0.75,  fontSize: '0.875rem', width: '3.5rem' }}}
                  >
                    {position_list.map((option) => (
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
                    Player 3
                  </Typography>
                </Stack>
              </Grid>
              <Grid item sx={{ display: 'flex', gap: 1 }}>
                <Grid item >
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    select
                    value={user3}
                    onChange={(e) => setUser3(e.target.value)}
                    sx={{ '& .MuiInputBase-input': { py: 0.75,  fontSize: '0.875rem', width: '3.5rem' }}}
                  >
                    {player_list.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    select
                    value={p3_position}
                    onChange={(e) => setPosition3(e.target.value)}
                    sx={{ '& .MuiInputBase-input': { py: 0.75,  fontSize: '0.875rem', width: '3.5rem' }}}
                  >
                    {position_list.map((option) => (
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
                    Player 4
                  </Typography>
                </Stack>
              </Grid>
              <Grid item sx={{ display: 'flex', gap: 1 }}>
                <Grid item >
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    select
                    value={user4}
                    onChange={(e) => setUser4(e.target.value)}
                    sx={{ '& .MuiInputBase-input': { py: 0.75,  fontSize: '0.875rem', width: '3.5rem' }}}
                  >
                    {player_list.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    select
                    value={p4_position}
                    onChange={(e) => setPosition4(e.target.value)}
                    sx={{ '& .MuiInputBase-input': { py: 0.75,  fontSize: '0.875rem', width: '3.5rem' }}}
                  >
                    {position_list.map((option) => (
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
                    Player 5
                  </Typography>
                </Stack>
              </Grid>
              <Grid item sx={{ display: 'flex', gap: 1 }}>
                <Grid item >
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    select
                    value={user5}
                    onChange={(e) => setUser5(e.target.value)}
                    sx={{ '& .MuiInputBase-input': { py: 0.75,  fontSize: '0.875rem', width: '3.5rem' }}}
                  >
                    {player_list.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField
                    id="standard-select-currency"
                    size="small"
                    select
                    value={p5_position}
                    onChange={(e) => setPosition5(e.target.value)}
                    sx={{ '& .MuiInputBase-input': { py: 0.75,  fontSize: '0.875rem', width: '3.5rem' }}}
                  >
                    {position_list.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>

            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
              新規試合
            </Button>
          </Stack>
        </MainCard>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List
            component="nav"
            sx={{
              px: 0,
              py: 0,
              '& .MuiListItemButton-root': {
                py: 1.5,
                '& .MuiAvatar-root': avatarSX,
                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
              }
            }}
          >
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar sx={{ color: 'success.main', bgcolor: 'success.lighter' }}>
                  <GiftOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">User01</Typography>} secondary="Today, 2:00 AM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $1,430
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    43%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>
                  <MessageOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">User02</Typography>} secondary="5 August, 1:45 PM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $302
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    8%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ color: 'error.main', bgcolor: 'error.lighter' }}>
                  <SettingOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="7 hours ago" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $682
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    16%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
        </MainCard>

      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Recent Orders</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>

      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Analytics Report</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            <ListItemButton divider>
              <ListItemText primary="Company Finance Growth" />
              <Typography variant="h5">+45.14%</Typography>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary="Company Expenses Ratio" />
              <Typography variant="h5">0.58%</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Business Risk Cases" />
              <Typography variant="h5">Low</Typography>
            </ListItemButton>
          </List>
          <ReportAreaChart />
        </MainCard>
      </Grid>

      {/* row 4 */}
      <Grid item xs={12} md={7} lg={8}>
        <SaleReportCard />
      </Grid>

    </Grid>
  );
}
