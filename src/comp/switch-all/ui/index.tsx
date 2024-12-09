import { FC } from "react";
import { ToggleSwitch } from "../../base/toggle-switch";
import styles from "./index.module.scss";

interface SwitchAllProps {
  changeAll: () => void;
  isChecked: boolean;
}

export const SwitchAll: FC<SwitchAllProps> = ({ isChecked, changeAll }) => {
  return (
    <div className={styles.themeWrapper}>
      <ToggleSwitch isChecked={isChecked} onChange={changeAll} /> -{" "}
      <span>toggle all</span>
    </div>
  );
};
