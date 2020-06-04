import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";
import {fetchShow as mockFetchShow} from "./api/fetchShow";
import { episodesFixture } from "./components/Episodes.test";

jest.mock("./api/fetchShow.js");

const showFixture = {
    image: {
        original: "https://www.images.com/strangerThings"
    },
    name: "Stranger Things",
    summary: "<p>kosjhdfkjsdhnf</p>",
    _embedded: {
        episodes: episodesFixture
    }
}

test("Renders App after fetching data", async () => {
    mockFetchShow.mockResolvedValueOnce(showFixture);

    const {queryByText, getByTestId, queryAllByTestId} = render(<App />);

    expect(queryByText(/fetching data.../i).textContent).toBe("Fetching data...");

    await waitFor(() => expect(queryByText(/stranger things/i).textContent).toBe("Stranger Things"));

    const seasonDropdown = getByTestId("selectedSeason");

    fireEvent.change(seasonDropdown, {target: {value: "Season 1"}});

    await waitFor(() => {
        expect(queryAllByTestId("episode")).toHaveLength(1);
    });
    
});