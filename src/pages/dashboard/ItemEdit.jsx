import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckOutlined, KeyOutlined, CloudDownloadOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
// project import
import MainCard from 'components/MainCard';
// assets
import { useEffect } from "react";



// ==============================|| DASHBOARD - DEFAULT ||============================== //
export default function DashboardDefault() {

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {

    }

  }, []);


  return (
    <>

      <Grid container rowSpacing={4.5} columnSpacing={2.75} >

        <Grid item xs={12} md={12} lg={12} >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">商品登録 / 商品登録</Typography>
              <Typography variant="caption" color="secondary" noWrap>
                商品登録を表示します。
              </Typography>
            </Grid>

            <Grid display={'flex'} gap={2}>
              
              <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', marginRight: '3px' }} >
                <CloudDownloadOutlined />&nbsp;&nbsp;CSV出力
              </Button>             
            </Grid>
          </Grid>

          <MainCard sx={{ mt: 2 }}>         
           
            <Grid container justifyContent="space-between">
              <Grid item sx={{ width: '100%' }}>
                <Stack spacing={3}>
                  <Grid container justifyContent="space-between" gap={2} alignItems="center" sx={{ marginTop: '5px !important', }}>

                    <Grid container justifyContent="space-between" mt={2}>
                      <Grid item >
                        <Grid container >
                          
                          <Grid item width={150}>
                            <Button size="big" variant="contained" sx={{ textTransform: 'capitalize', backgroundColor: '#52c41a', height: '41px' }}>
                              <CheckOutlined />&nbsp;&nbsp;確認
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>                     
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>

            </Grid>
          </MainCard>
        </Grid>

      </Grid>
    </>
  );
}
