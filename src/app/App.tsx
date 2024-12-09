import "./App.scss";
import { SwitchTheme } from "../comp/switch-theme/ui";
import { useTheme } from "../comp/theme/";
import { SwitchSounds } from "../comp/switch-sound";
import { SwitchAll } from "../comp/switch-all";
import { useCallback, useEffect, useRef, useState } from "react";

import sound_1 from "../comp/switch-sound/audio/sound_1.wav";

const App = () => {
  const [themeActive, setThemeActive] = useState<boolean>(true);
  const [audioActive, setAudioActive] = useState<boolean>(false);
  const [toggleAll, setToggleAll] = useState<boolean>(false);

  const [stack, setStack] = useState<Set<string>>(new Set());

  const callStack = useCallback(() => {
    const firstElem = stack.values().next().value;

    if (stack.size === 3) {
      if (firstElem === "theme") {
        toggleThemeState();
      }
      if (firstElem === "audio") {
        toggleAudioState();
      }
      if (firstElem === "changeAll") {
        changeAll();
      }
      setStack(new Set());
    }
  }, [stack]);

  useEffect(() => {
    callStack();
  }, [callStack, stack.size]);

  // Смена темы
  const { theme, toggleTheme } = useTheme();

  // Аудио
  const [audioState, setAudioState] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(sound_1);
    audioRef.current.volume = 0;
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

  const toggleThemeState = () => {
    setStack((prev) => {
      const temporarySet = new Set(prev);
      temporarySet.add("theme");
      return temporarySet;
    });
    toggleTheme();
    setThemeActive((prev) => !prev);
  };

  const toggleAudioState = () => {
    setStack((prev) => {
      const temporarySet = new Set(prev);
      temporarySet.add("audio");
      return temporarySet;
    });
    toggleAudio();
    setAudioActive((prev) => !prev);
  };

  const changeAll = () => {
    setStack((prev) => {
      const temporarySet = new Set(prev);
      temporarySet.add("changeAll");
      return temporarySet;
    });
    toggleTheme();
    setThemeActive((prev) => !prev);
    toggleAudio();
    setAudioActive((prev) => !prev);
    setToggleAll((prev) => !prev);
  };

  return (
    <div className="switch-container">
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
