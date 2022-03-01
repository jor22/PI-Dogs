import React from "react";
import { render, screen } from "@testing-library/react";
import Landing from "./Landing";

describe("Landing page test", () => {
  xit("footer", () => {
    render(<Landing/>);
    expect(screen.queryByText("A project by Jorge Ariel Castillo")).toBeInTheDocument();
  });
});
