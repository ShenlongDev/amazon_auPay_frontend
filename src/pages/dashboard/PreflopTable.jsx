import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';

function createData(positison, bet, stack, id) {
  return { positison,bet, stack, id };
}

let rows = [];

export default function PreflopTable({preflop}) {


  if(preflop.actions){
    
    // let prefopinfo = JSON.parse(JSON.stringify(preflop.actions));
    console.log(preflop);

    let actions = preflop.actions.replace(/'/g, '"');
    actions = JSON.parse(actions);  
    let pos = preflop.pos.replace(/'/g, '"');
    pos = JSON.parse(pos); 
    
    let stacks = preflop.stacks.replace(/'/g, '"');
    stacks = JSON.parse(stacks);     

    let bets = preflop.bets.replace(/'/g, '"');
    bets = JSON.parse(bets);  

    rows = [];
    for(let i = 0; i < actions.length; i++){
      let b = '';
      if(bets[i])b = bets[i];
      rows.push(createData(pos[i], actions[i]+ " " +  b , stacks[i], preflop.id));
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
              <TableCell sx={{backgroundColor:'#EEE'}} colSpan={3}> Preflop</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{backgroundColor:'#EEE'}}>Pos</TableCell>
              <TableCell sx={{backgroundColor:'#EEE'}}>Action</TableCell>
              <TableCell sx={{backgroundColor:'#EEE'}}>Stacks</TableCell>
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
                    <TableCell>{row.positison}</TableCell>                   
                    <TableCell>{row.bet}</TableCell>
                    <TableCell sx={{textAlign:'right'}}>{row.stack}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}