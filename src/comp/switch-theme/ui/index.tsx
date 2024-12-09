import { FC } from "react";
import { ToggleSwitch } from "../../base/toggle-switch";
import styles from "./index.module.scss";

interface SwitchThemeProps {
  toggleTheme: () => void;
  theme: string;
  isChecked: boolean;
}

export const SwitchTheme: FC<SwitchThemeProps> = ({
  isChecked,
  toggleTheme,
  theme,
}) => {
  return (
    <div className={styles.themeWrapper}>
      <ToggleSwitch isChecked={isChecked} onChange={toggleTheme} /> -
      <span>toggle theme : {theme}</span>
    </div>
  );
};
