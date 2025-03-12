import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';


function createData(p, r) {
  return { p, r};
}

const rows = [
  createData( "Player 1",  -48),
  createData("Player 2", -6),
  createData( "Player 3",  54.6),
  createData("Player 4",  -6),
];

export default function ResultTable() {

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
              <TableCell sx={{backgroundColor:'#EEE'}} colSpan={2}>Result</TableCell>
            </TableRow> 
            <TableRow>
              <TableCell sx={{backgroundColor:'#EEE'}}>Player</TableCell>
              <TableCell sx={{backgroundColor:'#EEE'}}>Rewards</TableCell>
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
                    <TableCell> {row.p}</TableCell>
                    <TableCell sx={{textAlign:'right'}}>{row.r}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}