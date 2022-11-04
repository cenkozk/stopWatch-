import "./App.css";
import React from "react";
import { Box, Stack } from "@mui/system";
import { Button, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PauseIcon from "@mui/icons-material/Pause";
import DataRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Drawer from "react-bottom-drawer";
import { motion } from "framer-motion";
import Timer from "tiny-timer";

function App() {
  const fontSerrat = "'Montserrat', sans-serif";
  const [isVisible, setIsVisible] = React.useState(false);
  const [isTimeRunning, setIsTimeRunning] = React.useState(false);
  const [timer, setTimer] = React.useState(new Timer({ interval: 1000, stopwatch: true }));
  const [timeText, setTimeText] = React.useState("00:00:00");
  const [timeData, setTimeData] = React.useState([]);
  const [doesFloatingButtonClosed, setDoesFBC] = React.useState(false);

  const gradients = [
    { backgroundColor: "#F4D03F", backgroundImage: "linear-gradient(132deg, #F4D03F 0%, #16A085 100%)" },
    { backgroundColor: "#74EBD5", backgroundImage: "linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)" },
    { backgroundColor: " #FAACA8", backgroundImage: "linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)" },
    { backgroundColor: "#FBDA61", backgroundImage: "linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)" },
    { backgroundColor: "#FA8BFF", backgroundImage: "linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)" },
    { backgroundColor: "#8EC5FC", backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)" },
    { backgroundColor: "#4158D0", backgroundImage: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)" },
    { backgroundColor: "#FBAB7E", backgroundImage: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)" },
    { backgroundColor: "#FAD961", backgroundImage: "linear-gradient(90deg, #FAD961 0%, #F76B1C 100%)" },
  ];

  function getGradient() {
    var num = Math.floor(Math.random() * (8 - 0 + 1) + 0);
    console.log(num);
    return gradients[num];
  }

  const onClose = React.useCallback(() => {
    setIsVisible(false);
    console.log("ok1");
    console.log(doesFloatingButtonClosed);
    if (doesFloatingButtonClosed == true) {
      console.log("ok");
      timer.resume();
      setIsTimeRunning(true);
      setDoesFBC(false);
    }
  }, []);

  function StartTimer() {
    timer.start(8553600000);
    timer.on("tick", (ms) => {
      function msToTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        return ("0" + hrs).slice(-2) + ":" + ("0" + mins).slice(-2) + ":" + ("0" + secs).slice(-2);
      }
      var msTo = msToTime(ms);
      setTimeText(msTo);
    });
  }

  const onClickMainButton = () => {
    if (timer.status != "running" && timer.status === "stopped") {
      StartTimer();
    }
    if (timer.status === "paused") {
      timer.resume();
    }
    if (timer.status === "running" && isTimeRunning) {
      timer.pause();
    }
    setIsTimeRunning((prev) => !prev);
  };

  function clickChildSave(event) {
    event.stopPropagation();

    //Generate date.
    function padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    }
    function formatDate(date) {
      return [padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate()), date.getFullYear()].join("/");
    }
    var fullDate = formatDate(new Date());
    var stopWatchTime = timeText;
    var timeDataObj = { d: fullDate, t: stopWatchTime };
    setTimeData((prev) => [...prev, timeDataObj]);
  }
  function clickChildDelete(event) {
    event.stopPropagation();
    console.log("childDelete");
    timer.stop();
    setIsTimeRunning(false);
    setTimeText("00:00:00");
  }

  const item = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
      },
    },
  };

  return (
    <Box className="mainApp">
      <Box sx={{ height: "100vh", justifyContent: "center", alignItems: "center", display: "flex" }}>
        <Stack sx={{ justifyContent: "center", alignItems: "center", width: "80%" }}>
          <Typography
            sx={{
              fontFamily: fontSerrat,
              fontWeight: "700",
              alignItems: "center",
              textAlign: "center",
              fontSize: "18vw",
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "-.03em",
            }}
          >
            {timeText}
          </Typography>
          <Box
            onClick={onClickMainButton}
            component={motion.div}
            initial={{ scale: 0.5, rotation: 0 }}
            animate={{
              borderRadius: isTimeRunning ? "40px" : "140px",
              width: isTimeRunning ? "170px" : "140px",
              scale: isTimeRunning ? 1.2 : 1,
              rotation: 90,
            }}
            whileTap={{ scale: 1.25 }}
            transition={{ type: "spring", damping: 7, stiffness: 100, restDelta: 0.001, duration: 0.5 }}
            className="mainButton"
            sx={{
              position: "relative",
              width: "140px",
              height: "140px",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50px",
              marginBottom: "50px",
              marginTop: "50px",
            }}
          >
            {isTimeRunning ? <PauseIcon sx={{ color: "#2e2f41", width: "60px", height: "60px" }} /> : <PlayArrowIcon sx={{ color: "#2e2f41", width: "60px", height: "60px" }} />}
            <Box
              onClick={clickChildSave}
              className="saveButton"
              component={motion.div}
              initial={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                damping: 7,
                stiffness: 100,
                restDelta: 0.001,
                duration: 0.5,
              }}
              whileFocus={{ scale: 1.2, rotate: 30 }}
              whileHover={{ scale: 1.1, rotate: 30 }}
              whileTap={{ scale: 1.4, rotate: 90 }}
              sx={{
                width: "70px",
                height: "70px",
                backgroundColor: "#9ffe97",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "1000px",
                position: "absolute",
                left: "-15%",
                bottom: "-20%",
              }}
            >
              <CheckIcon sx={{ color: "#2e2f41", width: "30px", height: "30px" }} />
            </Box>
            <Box
              onClick={clickChildDelete}
              className="deleteButton"
              component={motion.div}
              initial={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                damping: 7,
                stiffness: 100,
                restDelta: 0.001,
                duration: 0.5,
              }}
              whileFocus={{ scale: 1.2, rotate: -30 }}
              whileHover={{ scale: 1.1, rotate: -30 }}
              whileTap={{ scale: 1.4, rotate: -90 }}
              sx={{
                width: "70px",
                height: "70px",
                backgroundColor: "#ff7f7f",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "1000px",
                position: "absolute",
                right: "-15%",
                bottom: "-20%",
              }}
            >
              <CloseIcon sx={{ color: "#2e2f41", width: "30px", height: "30px" }} />
            </Box>
          </Box>
        </Stack>
      </Box>
      {!isVisible && (
        <Button
          onClick={() => {
            setIsVisible(true);
            setDoesFBC((prev) => true);
            setIsTimeRunning(false);
            timer.pause();
          }}
          sx={{
            position: "absolute",
            right: "30px",
            bottom: "30px",
            textTransform: "none",
            backgroundColor: "white",
            fontFamily: fontSerrat,
            fontWeight: "700",
            borderRadius: "30px",
            color: "black",
            height: "60px",
            boxShadow: "none",
            "&:hover": { backgroundColor: "white" },
          }}
          variant="contained"
          component={motion.div}
          initial={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            damping: 7,
            stiffness: 100,
            restDelta: 0.001,
            duration: 0.5,
          }}
          whileFocus={{ scale: 1.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.4 }}
        >
          StopWatches
        </Button>
      )}
      <Drawer isVisible={isVisible} onClose={onClose} className="drawer">
        {timeData.length != 0 ? (
          timeData.map((e) => (
            <Box
              sx={{
                margin: "20px",
                borderRadius: "30px",
                width: "85vw",
                ...getGradient(),
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Stack direction="row" sx={{ margin: "20px" }}>
                <DataRangeIcon sx={{ marginRight: "5px" }} />
                <Typography sx={{ fontFamily: fontSerrat, fontSize: "18px" }}>{e.d}</Typography>
              </Stack>
              <Stack direction="row" sx={{ margin: "20px" }}>
                <AccessTimeFilledIcon sx={{ marginRight: "5px" }} />
                <Typography sx={{ fontFamily: fontSerrat, fontSize: "18px" }}>{e.t}</Typography>
              </Stack>
            </Box>
          ))
        ) : (
          <div />
        )}
      </Drawer>
    </Box>
  );
}

export default App;
