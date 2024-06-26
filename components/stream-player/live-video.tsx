import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import FullscreenControl from "./fullscreen-control";
import { useEventListener } from "usehooks-ts";
import VolumeControl from "./volume-control";

interface LiveVideoProps {
  participant: Participant;
}

const LiveVideo = ({ participant }: LiveVideoProps) => {
    
  const [isFullScreen, setIsFyllScreen] = useState(false);
  const [volume, setVolume] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fullScreanToggle = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else if (wrapperRef?.current) {
      wrapperRef.current.requestFullscreen();
    }
  };

  const handleFullScreenChange = () => {
    const isCurrentFullScreen = document.fullscreenElement !== null;
    setIsFyllScreen(isCurrentFullScreen);
  };

  useEventListener("fullscreenchange", handleFullScreenChange, wrapperRef);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((trackEl) => trackEl.participant.identity === participant.identity)
    .forEach((trackEl) => {
      if (videoRef.current) {
        trackEl.publication.track?.attach(videoRef.current);
      }
    });

  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;
    setVolume(isMuted ? 50 : 0);

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  return (
    <div ref={wrapperRef} className="relative h--full flex">
      <video ref={videoRef} width="100%" />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl
            onToggle={toggleMute}
            onChange={onVolumeChange}
            value={volume}
          />
          <FullscreenControl
            isFullScreen={isFullScreen}
            onToggle={fullScreanToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveVideo;
