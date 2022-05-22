import {
  Alert,
  Box,
  Button,
  Divider,
  FormControlLabel,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

const IndexPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mailAddress, setMailAddress] = useState("");
  const [interview, setInterview] = useState("");
  const [interviewDate, setInterviewDate] = useState<Date | any>(null);
  const [interviewMemo, setInterviewMemo] = useState("");
  const [errorMessageList, setErrorMessageList] = useState<string[]>([]);
  const [isFormDone, setIsFormDone] = useState(false);

  useEffect(() => {
    const handleMessage = (_event, args) => alert(args);
    global.ipcRenderer.addListener("message", handleMessage);
    return () => {
      global.ipcRenderer.removeListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    console.log({ interviewDate });
  }, [interviewDate]);

  const sendForm = () => {
    const errorMessages: string[] = [];
    if (lastName.length === 0) {
      errorMessages.push("名字を入力してください。");
    }

    if (firstName.length === 0) {
      errorMessages.push("名前を入力してください。");
    }
    if (!(phoneNumber.length === 9 || phoneNumber.length === 10)) {
      errorMessages.push("電話番号は0901234XXXXの形式で入力してください。");
    }
    if (!mailAddress.match(/.+@.+\..+/)) {
      errorMessages.push("正しい形式のメールアドレスを入力してください。");
    }
    if (!interview) {
      errorMessages.push("面接フェーズを記入してください。");
    }
    if (errorMessages.length !== 0) {
      setErrorMessageList(errorMessages);
      return;
    }
    setIsFormDone((prev) => !prev);
  };

  return (
    <Layout>
      <Box style={{ margin: "60px" }}>
        {errorMessageList.map((errorMessage) => {
          return (
            <Alert severity="error" style={{ marginTop: "8px" }}>
              {errorMessage}
            </Alert>
          );
        })}
        {!isFormDone ? (
          <>
            <Typography
              variant="h1"
              style={{ fontSize: "30px", margin: "30px 0px 30px 30px" }}
            >
              候補者情報入力フォーム
            </Typography>
            <Divider light style={{ marginTop: "20px" }} />
            <Box style={{ marginTop: "60px" }}>
              <InputLabel required={true}>氏名</InputLabel>
              <div>
                <TextField
                  variant="outlined"
                  placeholder="code4biz"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{ width: "40%" }}
                />
                <TextField
                  variant="outlined"
                  placeholder="太郎"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{ marginLeft: "10%", width: "40%" }}
                />
              </div>
            </Box>
            <Box style={{ display: "flex", marginTop: "60px" }}>
              <Box style={{ width: "40%" }}>
                <InputLabel required={true}>電話番号</InputLabel>
                <TextField
                  variant="outlined"
                  placeholder="0001110000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Box>
              <Box style={{ marginLeft: "10%", width: "40%" }}>
                <InputLabel required={true}>メールアドレス</InputLabel>
                <TextField
                  variant="outlined"
                  placeholder="test@example.co.jp"
                  value={mailAddress}
                  onChange={(e) => setMailAddress(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Box>
            </Box>
            <Box style={{ marginTop: "60px" }}>
              <InputLabel id="demo-radio-buttons-group-label">
                面接フェーズ
              </InputLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={interview}
                onChange={(e) => setInterview(e.target.value)}
              >
                <FormControlLabel
                  value="初回面談"
                  control={<Radio />}
                  label="初回面談"
                />
                <FormControlLabel
                  value="1次面接"
                  control={<Radio />}
                  label="1次面接"
                />
                <FormControlLabel
                  value="2次面接"
                  control={<Radio />}
                  label="2次面接"
                />
                <FormControlLabel
                  value="最終面接"
                  control={<Radio />}
                  label="最終面接"
                />
              </RadioGroup>
            </Box>
            <Box style={{ marginTop: "60px" }}>
              <InputLabel id="demo-radio-buttons-group-label">
                面接日時
              </InputLabel>
              <DesktopDatePicker
                inputFormat="yyyy/MM/dd"
                value={interviewDate}
                onChange={setInterviewDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
            <Box style={{ marginTop: "60px" }}>
              <InputLabel>面接メモ</InputLabel>
              <TextField
                multiline
                rows={4}
                placeholder="type here..."
                value={interviewMemo}
                onChange={(e) => setInterviewMemo(e.target.value)}
                style={{ width: "40%" }}
              />
            </Box>
            <Divider light style={{ marginTop: "20px" }} />
            <Button
              variant="contained"
              onClick={() => sendForm()}
              style={{
                width: "150px",
                padding: "15px",
                backgroundColor: "#17BD5B",
                marginTop: "30px",
                textAlign: "center",
              }}
            >
              登録する
            </Button>
          </>
        ) : (
          <>
            <Typography
              variant="h1"
              style={{ fontSize: "30px", margin: "30px 0px 30px 30px" }}
            >
              候補者情報入力フォームを完了しました。
            </Typography>
            <Paper style={{ padding: "30px" }}>
              <Box>
                <Box style={{ marginTop: "10px" }}>
                  氏名：{`${lastName} ${firstName}`}
                </Box>
                <Box style={{ marginTop: "10px" }}>電話番号：{phoneNumber}</Box>
                <Box style={{ marginTop: "10px" }}>
                  メールアドレス：{mailAddress}
                </Box>
                <Box style={{ marginTop: "10px" }}>
                  面接フェーズ：{interview}
                </Box>
                <Box style={{ marginTop: "10px" }}>
                  面接日時：
                  {interviewDate instanceof Date
                    ? format(interviewDate, "yyyy-MM-dd")
                    : ""}
                </Box>
                <Box style={{ marginTop: "10px" }}>
                  面接メモ：{interviewMemo}
                </Box>
              </Box>
            </Paper>
            <Button
              variant="contained"
              onClick={() => setIsFormDone((isForm) => !isForm)}
              style={{
                width: "150px",
                padding: "15px",
                backgroundColor: "#17BD5B",
                marginTop: "30px",
                marginBottom: "60px",
                textAlign: "center",
              }}
            >
              戻る
            </Button>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default IndexPage;
