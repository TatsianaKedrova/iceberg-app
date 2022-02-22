import React from "react";
import { FieldError } from "react-hook-form";

type LabelFormPropsType = {
  labelName: string;
  isError: FieldError | undefined;
};

const starLabel = "*";

const LabelForm: React.FC<LabelFormPropsType> = ({ labelName, isError }) => {
  return (
    <>
      <span id="label">{labelName} </span>
      <span id="star" style={{ color: isError ? "error.main" : "#f44336" }}>
        {starLabel}
      </span>
    </>
  );
};

export default LabelForm;
