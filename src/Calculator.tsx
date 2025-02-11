import React, { useEffect, useRef, useState } from "react";
import { Button, Box, type ButtonOwnProps, Paper } from "@mui/material";
import { evaluate } from "mathjs";

const MATH_OPERATORS_TRANSFORMED: { [key: string]: string } = {
  "*": "×",
  "/": "÷",
};

const EMPTY_ITEM = { value: "", color: undefined };

const RoundButtonStyles = {
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  padding: 0,
  fontSize: "1.5rem",
};

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const outputRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    outputRef.current?.scrollTo({
      left: outputRef.current?.scrollWidth,
    });
  }, [input]);

  return (
    <Paper
      elevation={8}
      sx={{
        width: "328px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        marginTop: "-20px",
      }}
    >
      <div>
        <Box
          ref={outputRef}
          sx={{
            fontSize: "1.5rem",
            height: "52px",
            marginBottom: 2,
            padding: 1,
            whiteSpace: "nowrap",
            overflow: "auto",
            textAlign: "right",
            width: "280px",
            border: (theme) =>
              `1px solid ${
                theme.palette.mode === "light"
                  ? "rgba(0,0,0,0.23)"
                  : "rgba(255,255,255,0.23)"
              }`,
            fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
            "&::-webkit-scrollbar": {
              width: "0px",
              height: "0px",
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
            { value: "AC", color: "info" },
            EMPTY_ITEM,
            EMPTY_ITEM,
            { value: "/", color: "primary" },
            { value: "7", color: "secondary" },
            { value: "8", color: "secondary" },
            { value: "9", color: "secondary" },
            { value: "*", color: "primary" },
            { value: "4", color: "secondary" },
            { value: "5", color: "secondary" },
            { value: "6", color: "secondary" },
            { value: "-", color: "primary" },
            { value: "1", color: "secondary" },
            { value: "2", color: "secondary" },
            { value: "3", color: "secondary" },
            { value: "+", color: "primary" },
            EMPTY_ITEM,
            { value: "0", color: "secondary" },
            { value: ".", color: "secondary" },
            { value: "=", color: "primary" },
          ].map((item, index) => {
            if (item.value === "") {
              return <div key={index} style={{ width: "64px" }}></div>;
            }
            return (
              <Button
                key={index}
                variant="contained"
                color={(item.color as ButtonOwnProps["color"]) || "info"}
                sx={RoundButtonStyles}
                onClick={() => handleButtonClick(item.value)}
              >
                {MATH_OPERATORS_TRANSFORMED[item.value] || item.value}
              </Button>
            );
          })}
        </Box>
      </div>
    </Paper>
  );
};

export default Calculator;
