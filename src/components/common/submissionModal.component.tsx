import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import "../../index.css";
import { Button } from '@mui/material';

const SubmissionModal = (props: any) => {
    const { questionList, handleOpen, handleClose, openSubmitModal, buildData } = props;

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openSubmitModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openSubmitModal}>
                    <Box className="modal-style" sx={{
                        justifyContent: "center",
                        display: "grid"
                    }}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Congratulations!!!
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Your total score is {(100 * questionList?.filter((o: any) => o.answer === "Yes")?.length / questionList?.length)}
                        </Typography>
                        <Button variant='outlined' color="success" onClick={() => {
                            handleClose();
                            buildData();
                            window.location.reload();
                        }}>
                            Close & Start New
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}


export default SubmissionModal;