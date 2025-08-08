import { expect, test, describe } from "vitest";
import AudioControls from "../components/audio-controls/AudioControls";
import { render } from "@testing-library/react";

describe("AudioControls", () => {
  test("should render correctly with default props", () => {
    const props = {
      isPlaying: false,
      volume: 0.7,
      currentTime: 0,
      duration: 100,
      onPlayPause: () => {},
      onVolumeChange: () => {},
      onSeek: () => {},
      hasAudio: true,
    };

    const { container } = render(<AudioControls {...props} />);
    expect(container.firstChild).toBeTruthy();
  });

  test("voulme bar should change volume", () => {
    const props = {
      isPlaying: false,
      volume: 0.7,
      currentTime: 0,
      duration: 100,
      onPlayPause: () => {},
      onVolumeChange: (volume: number) => {
        expect(volume).toBe(0.5);
      },
      onSeek: () => {},
      hasAudio: true,
    };

    const { getAllByRole } = render(<AudioControls {...props} />);
    const volumeInput = getAllByRole("slider")[0]; // access first slider which is volume control
    (volumeInput as unknown as HTMLInputElement).value = "0.5";
    volumeInput.dispatchEvent(new Event("input"));
    expect((volumeInput as HTMLInputElement).value).toBe("0.5");
  });
});
