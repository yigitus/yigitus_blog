// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import "@testing-library/jest-dom/";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/(home)/page";
import Layout from "../src/app/(home)/layout"; // Import the layout component

describe("Page", () => {
  it("Renders header", () => {
    render(
      <Layout>
        <Page />
      </Layout>
    );
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});