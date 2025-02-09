import React, { useState } from "react";
import { Button, Container, Box, type ButtonOwnProps } from "@mui/material";
import { evaluate } from "mathjs";

const MATH_OPERATORS_TRANSFORMED: { [key: string]: string } = {
  "*": "×",
  "/": "÷",
};

const EMPTY_ITEM = { label: "", color: undefined };

const RoundButtonStyles = {
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  padding: 0,
  fontSize: "1.5rem",
};

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>("");

  const handleButtonClick = (value: string) => {
    if (value === "=") {
      handleEvaluate();
      return;
    }

    if (value === "AC") {
      handleClear();
      return;
    }

    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
    // setResult("");
  };

  const handleEvaluate = () => {
    try {
      setInput(evaluate(input).toString());
    } catch {
      // if (error instanceof Error) {
      //   setResult(error.message);
      // } else {
      //   setResult("An unknown error occurred");
      // }
    }
  };

  return (
    <Container sx={{ width: "328px", boxSizing: "border-box" }}>
      <Box
        sx={{
          fontSize: "1.5rem",
          height: "29px",
          marginBottom: 2,
          padding: 1,
          whiteSpace: "nowrap",
          overflow: "auto",
          textAlign: "right",
          border: "1px solid rgba(0,0,0,0.23)",
          fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
          '&::-webkit-scrollbar': {
            width: '0px',
            height: '0px',
          },
        }}
      >
        {input
          .split("")
          .map((item) =>
            MATH_OPERATORS_TRANSFORMED?.[item]
              ? MATH_OPERATORS_TRANSFORMED[item]
              : item
          )}
      </Box>
      <Box sx={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {[
          { label: "AC", color: "info" },
          EMPTY_ITEM,
          EMPTY_ITEM,
          { label: "/", color: "primary" },
          { label: "7", color: "secondary" },
          { label: "8", color: "secondary" },
          { label: "9", color: "secondary" },
          { label: "*", color: "primary" },
          { label: "4", color: "secondary" },
          { label: "5", color: "secondary" },
          { label: "6", color: "secondary" },
          { label: "-", color: "primary" },
          { label: "1", color: "secondary" },
          { label: "2", color: "secondary" },
          { label: "3", color: "secondary" },
          { label: "+", color: "primary" },
          EMPTY_ITEM,
          { label: "0", color: "secondary" },
          { label: ".", color: "secondary" },
          { label: "=", color: "primary" },
        ].map((item) => {
          if (item.label === "") {
            return <div style={{ width: "64px" }}></div>;
          }
          return (
            <Button
              variant="contained"
              color={(item.color as ButtonOwnProps["color"]) || "info"}
              sx={RoundButtonStyles}
              onClick={() => handleButtonClick(item.label)}
            >
              {MATH_OPERATORS_TRANSFORMED[item.label] || item.label}
            </Button>
          );
        })}
      </Box>
    </Container>
  );
};

export default Calculator;
