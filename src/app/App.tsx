import styles from "./App.module.scss";

import { useTheme } from "../comp/theme/";

import { FC, useEffect, useRef, useState } from "react";

import sound_1 from "../assets/sound_1.wav";

import { ToggleSwitch } from "../comp/base/toggle-switch";
import { SwitchActions } from "./types";

const App: FC = () => {
  const [isThemeActive, setThemeActive] = useState<boolean>(false);
  const [isAudioActive, setAudioActive] = useState<boolean>(false);
  const [isToggleAll, setToggleAll] = useState<boolean>(true);

  // stack функций
  const [stack, setStack] = useState<string[]>([SwitchActions.ALL]);

  // Смена темы
  const { toggleTheme } = useTheme();

  // Аудио
  const [audioState, setAudioState] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(sound_1);
    audioRef.current.volume = 0.1;
  }, []);

  const data = [
    {
      title: "change theme",
      isChecked: isThemeActive,
      onChange: toggleThemeState,
    },
    {
      title: "audio",
      isChecked: isAudioActive,
      onChange: toggleAudioState,
    },
    {
      title: "toggle all",
      isChecked: isToggleAll,
      onChange: toggleAll,
    },
  ];

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
        case SwitchActions.THEME:
          toggleThemeState();
          break;
        case SwitchActions.AUDIO:
          toggleAudioState();
          break;
        case SwitchActions.ALL:
          toggleAll();
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

  function toggleThemeState() {
    toggleTheme();
    setThemeActive((prev) => !prev);
    updateStack(SwitchActions.THEME);
  }

  function toggleAudioState() {
    toggleAudio();
    setAudioActive((prev) => !prev);
    updateStack(SwitchActions.AUDIO);
  }

  function toggleAll() {
    toggleAudioState();
    toggleThemeState();
    setToggleAll((prev) => !prev);
    updateStack(SwitchActions.ALL);
  }

  return (
    <div className={styles.switchContainer}>
      {data.map(({ title, isChecked, onChange }) => (
        <div className={styles.themeWrapper}>
          <ToggleSwitch isChecked={isChecked} onChange={onChange} /> -
          <span>{title}</span>
        </div>
      ))}
    </div>
  );
};

export default App;
