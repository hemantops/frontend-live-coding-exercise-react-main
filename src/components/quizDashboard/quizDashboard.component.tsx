import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';

// Material UI imports
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
  Container, Badge, Typography, IconButton, Toolbar, Box, CssBaseline, Grid,
  FormControlLabel, FormLabel, Radio, RadioGroup, FormControl, Button, Paper, Link, MenuItem, Menu
} from '@mui/material/';

// Icons import
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { QUESTIONS } from "../../questions";

import SubmissionModal from "../common/submissionModal.component";

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://Tendable.com/">
      Tendable
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const defaultTheme = createTheme();

const QuizDashboard = (props: any) => {
  const { quizState, setQuizState } = props;
  const [questionList, setQuestionsList] = useState([] as any);
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const handleOpen = () => setOpenSubmitModal(true);
  const handleClose = () => setOpenSubmitModal(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = () => {
    
    let per = (quizState.avgPercentage + (100 * questionList?.filter((o: any) => o.answer === "Yes")?.length / questionList?.length)) / (quizState.totalAppearance + 1);
    let appear = quizState.totalAppearance + 1;
    localStorage.setItem("Quiz-Storage", JSON.stringify({ avgPercentage: per, totalAppearance: appear }));
    setQuizState({ avgPercentage: per, totalAppearance: appear });
    handleOpen();
  }

  useEffect(() => {
    buildData();
  }, [])

  const buildData = () => {
    
    let qList = [];
    for (let key in QUESTIONS) {
      qList.push({ id: key, question: QUESTIONS[key], attempted: false, answer: "" });
    }
    setQuestionsList(qList);
  }

  const onSelectionChange = (event: ChangeEvent<HTMLInputElement>, value: string) => {
    let id = value.split(",")[0], answer = value.split(",")[1];
    
    let qList: any = questionList?.map((obj: any) =>
      obj.id === id ? { ...obj, answer: answer, attempted: true } : obj
    );
    
    setQuestionsList(qList)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar
            sx={{
              pr: '24px', 
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Quiz Board
            </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Badge badgeContent={2} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem >Average%: {quizState.avgPercentage}</MenuItem>
                <MenuItem >Total Login: {quizState.totalAppearance}</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container justifyContent="center" spacing={3}>
              {questionList?.length > 0 ?
                questionList.map((o: any) => <Grid item xs={12} >
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 120,
                    }}
                  >
                    <Typography>{o.question}
                      {o.attempted ? <CheckCircleIcon sx={{ float: "right", color: "green" }} /> : null}
                    </Typography>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label" sx={{
                        '&.Mui-focused': {
                          color: "green",
                        },
                      }}>Answer</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        onChange={onSelectionChange}
                      >
                        <FormControlLabel disabled={o.attempted ? true : false} value={`${o.id},Yes`} control={<Radio />} label="Yes" />
                        <FormControlLabel disabled={o.attempted ? true : false} value={`${o.id},No`} control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                ) : null}
              <Grid item xs={2} >
                <Button variant="contained" color='success' sx={{ width: "100%" }}
                  disabled={
                    questionList?.length === questionList?.filter((o: any) => o.attempted === true)?.length
                      ? false : true
                  }
                  onClick={handleSubmit}
                >Submit
                </Button>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
        <SubmissionModal questionList={questionList} openSubmitModal={openSubmitModal}
          handleOpen={handleOpen} handleClose={handleClose} buildData={buildData} />
      </Box>
    </ThemeProvider>
  );
}

export default QuizDashboard;