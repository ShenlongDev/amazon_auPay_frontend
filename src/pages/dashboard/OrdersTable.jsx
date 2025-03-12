import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { EditOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';


function createData(menu, value) {
  return { menu, value};
}

const base_rows = [
  createData("Player Stacks", 'Player 1 : 0, Player 2 : 0, Player 3 : 0, Player 4 : 0, Player 5: 0, Player 6 : 0'),
  createData("Blinds", 'SB : 1, SB  : 2'),
  createData("Rake", '5% 3bb cap'),
];

export default function OrderTable({poker_info}) {
  
  const [rows, setRows] = useState(base_rows);  

  function getRows(){  
    console.log(poker_info);
    if(poker_info.pstacks){
      let psArray = poker_info.pstacks.replace(/'/g, '"');
      psArray = JSON.parse(psArray);
      let pos = poker_info.positions.replace(/'/g, '"');
      pos = JSON.parse(pos);
      
      let stacksTxt = "My : " + poker_info.mystack +" , ";
      for(let i = 0; i < psArray.length; i++){
        stacksTxt += pos[i] + " : " + psArray[i] + " , ";
      }
      
      base_rows[0].value = stacksTxt; 
      base_rows[1].value = "SB : " + poker_info.sblind +" ,  SB : " + poker_info.bblind; 
      base_rows[2].value = poker_info.rake + "% +"+ poker_info.capp + "bb cap";
    }
    
  }
  getRows();  

  useEffect(() => {
    setRows(base_rows)
  }, [base_rows]);

  
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

          <TableBody>
            {
            // stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              rows && rows.map((row, index) => {
                            
              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={index}
                >
                  <TableCell sx={{backgroundColor:"#EEE"}}> {row.menu}</TableCell>
                  <TableCell>{row.value}</TableCell>                  
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}