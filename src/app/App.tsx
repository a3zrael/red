import styles from "./App.module.scss";
import { SwitchTheme } from "../comp/switch-theme/ui";
import { useTheme } from "../comp/theme/";
import { SwitchSounds } from "../comp/switch-sound";
import { SwitchAll } from "../comp/switch-all";
import { FC, useEffect, useRef, useState } from "react";

import sound_1 from "../comp/switch-sound/audio/sound_1.wav";

const App: FC = () => {
  const [themeActive, setThemeActive] = useState<boolean>(false);
  const [audioActive, setAudioActive] = useState<boolean>(false);
  const [toggleAll, setToggleAll] = useState<boolean>(true);

  // stack функций
  const [stack, setStack] = useState<string[]>(["changeAll"]);

  // Смена темы
  const { theme, toggleTheme } = useTheme();

  // Аудио
  const [audioState, setAudioState] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(sound_1);
    audioRef.current.volume = 0.1;
  }, []);

  function toggleAudio() {
    if (!audioRef.current) {
      return;
    }

    if (!audioState) {
      audioRef.current.play();
      setAudioState(true);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAudioState(false);
    }
  }

  useEffect(() => {
    if (stack.length === 3) {
      switch (stack[1]) {
        case "theme":
          toggleThemeState();
          break;
        case "audio":
          toggleAudioState();
          break;
        case "changeAll":
          changeAll();
          break;
      }
    }
  });

  const updateStack = (action: string) => {
    setStack((prev) => {
      if (prev.includes(action)) {
        return prev.filter((elem) => elem !== action);
      }
      return [...prev, action];
    });
  };

  const toggleThemeState = () => {
    toggleTheme();
    setThemeActive((prev) => !prev);
    updateStack("theme");
  };

  const toggleAudioState = () => {
    toggleAudio();
    setAudioActive((prev) => !prev);
    updateStack("audio");
  };

  const changeAll = () => {
    toggleAudioState();
    toggleThemeState();
    setToggleAll((prev) => !prev);
    updateStack("changeAll");
  };

  return (
    <div className={styles.switchContainer}>
      <SwitchTheme
        isChecked={themeActive}
        theme={theme}
        toggleTheme={toggleThemeState}
      />
      <SwitchSounds isChecked={audioActive} toggleAudio={toggleAudioState} />
      <SwitchAll isChecked={toggleAll} changeAll={changeAll} />
    </div>
  );
};

export default App;
