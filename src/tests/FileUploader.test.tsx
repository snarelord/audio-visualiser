import { expect, test, describe, vi } from "vitest";
import FileUploader from "../components/file-uploader/FileUploader";
import { render, fireEvent } from "@testing-library/react";

describe("FileUploader", () => {
  test("should call onFileUpload when a file is uploaded", () => {
    const mockOnFileUpload = vi.fn();
    const props = {
      onFileUpload: mockOnFileUpload,
      audioFile: null,
    };

    const { getByRole } = render(<FileUploader {...props} />);
    const fileInput = getByRole("file-input");
    const testFile = new File(["test content"], "test.mp3", { type: "audio/mp3" });
    fireEvent.change(fileInput, { target: { files: [testFile] } });

    expect(mockOnFileUpload).toHaveBeenCalledTimes(1);
    expect(mockOnFileUpload).toHaveBeenCalledWith(testFile);
  });
});
