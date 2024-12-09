import React, { FC } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { useTheme } from "../../../theme";

interface ToggleSwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: () => void;
  isChecked?: boolean;
}

export const ToggleSwitch: FC<ToggleSwitchProps> = ({
  isChecked,
  onChange,
}) => {
  const { theme } = useTheme();
  return (
    <label className={classNames(styles.switch, styles[`switch_${theme}`])}>
      <input checked={isChecked} type="checkbox" onChange={onChange} />
      <span className={styles.slider} />
    </label>
  );
};
