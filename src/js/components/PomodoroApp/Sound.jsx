import { useState, useEffect } from "react";

export default function Sound(audio, loop = true) {
  audio.loop = loop;

  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(playing => !playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  return [playing, toggle];
}
