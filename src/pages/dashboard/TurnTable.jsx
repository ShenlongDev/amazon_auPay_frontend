import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';

function createData(positison, bet, stack) {
  return { positison, bet, stack };
}

let rows = [];


export default function TurnTable({ turn, tcard1, tcard2, tcard3, tcard4, tcard_type1, tcard_type2, tcard_type3, tcard_type4 }) {

  if(turn.actions){    
   

    let actions = turn.actions.replace(/'/g, '"');
    actions = JSON.parse(actions);  
    let pos = turn.pos.replace(/'/g, '"');
    pos = JSON.parse(pos);     
    let stacks = turn.stacks.replace(/'/g, '"');
    stacks = JSON.parse(stacks);     
    let bets = turn.bets.replace(/'/g, '"');
    bets = JSON.parse(bets);  

    rows = [];
    for(let i = 0; i < actions.length; i++){
      let b = '';
      if(bets[i])b = bets[i];
      rows.push(createData(pos[i], actions[i]+ " " +  b , stacks[i], turn.id));
    }

  }else{
    rows = [];   
  }

  return (
    <Box>
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
              <TableCell sx={{ backgroundColor: '#EEE' }}> Turn</TableCell>
              <TableCell sx={{ backgroundColor: '#EEE' }}></TableCell>
              <TableCell sx={{ backgroundColor: '#EEE' }}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#EEE' }} colSpan={3}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  Community Cards :
                  <img src={`/assets/images/card/${tcard_type1}.png`} height={20} />
                  {tcard1}
                  <img src={`/assets/images/card/${tcard_type2}.png`} height={20} />
                  {tcard2}
                  <img src={`/assets/images/card/${tcard_type3}.png`} height={20} />
                  {tcard3}
                  <img src={`/assets/images/card/${tcard_type4}.png`} height={20} />
                  {tcard4}
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#EEE' }}>Port:</TableCell>
              <TableCell sx={{ backgroundColor: '#EEE' }}>{turn.ports}</TableCell>
              <TableCell sx={{ backgroundColor: '#EEE' }}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#EEE' }}>Pos</TableCell>             
              <TableCell sx={{ backgroundColor: '#EEE' }}>Action</TableCell>
              <TableCell sx={{ backgroundColor: '#EEE' }}>Stacks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              // stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              rows.map((row, index) => {

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    tabIndex={-1}
                    key={index}
                  >
                    <TableCell> {row.positison}</TableCell>                  
                    <TableCell>{row.bet}</TableCell>
                    <TableCell sx={{textAlign:'right'}}>{row.stack} </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}