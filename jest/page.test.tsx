// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import "@testing-library/jest-dom/";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/page";

describe("Page", () => {
  it("Renders heading", () => {
    render(<Page />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
