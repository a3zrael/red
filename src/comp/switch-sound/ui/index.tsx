import { ToggleSwitch } from "../../base/toggle-switch";
import styles from "./index.module.scss";
import { FC } from "react";

interface SwitchSoundsProps {
  toggleAudio: () => void;
  isChecked: boolean;
}

export const SwitchSounds: FC<SwitchSoundsProps> = ({
  isChecked,
  toggleAudio,
}) => {
  return (
    <div className={styles.themeWrapper}>
      <ToggleSwitch isChecked={isChecked} onChange={toggleAudio} /> -{" "}
      <span>audio</span>
    </div>
  );
};
