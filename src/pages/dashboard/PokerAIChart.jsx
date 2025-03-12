import * as React from 'react';
import Box from '@mui/material/Box';
import { Heatmap } from '@mui/x-charts-pro/Heatmap';

export default function BasicHeatmap() {
    const data = [
        [0, 0, 10],
        [0, 1, 20],
        [0, 2, 40],
        [0, 3, 90],
        [0, 4, 70],
        [0, 5, 70],
        [0, 6, 70],
        
        [1, 0, 34],
        [1, 1, 30],
        [1, 2, 10],
        [1, 3, 20],
        [1, 4, 30],
        [1, 5, 50],
        [1, 6, 10],

        [2, 0, 12],
        [2, 1, 44],
        [2, 2, 77],
        [2, 3, 88],
        [2, 4, 88],
        [2, 5, 44],
        [2, 6, 77],

        [3, 0, 10],
        [3, 1, 20],
        [3, 2, 40],
        [3, 3, 90],
        [3, 4, 70],
        [3, 5, 70],
        [3, 6, 70],
        
        [4, 0, 34],
        [4, 1, 30],
        [4, 2, 10],
        [4, 3, 20],
        [4, 4, 30],
        [4, 5, 50],
        [4, 6, 10],

        [5, 0, 12],
        [5, 1, 44],
        [5, 2, 77],
        [5, 3, 88],
        [5, 4, 88],
        [5, 5, 44],
        [5, 6, 77],

        
      ];
  return (
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <Heatmap
        xAxis={[{ data: ['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB'] }]}
        yAxis={[{ data: ['PeFlop', 'Flop', 'Turn', 'River'] }]}
        series={[{ data }]}
        margin={{ top: 5, right: 5, left: 20 }}
        height={300}
      />
    </Box>
  );
}