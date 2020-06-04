import React from "react";
import { render } from "@testing-library/react";
import {formatSeasons} from "./formatSeasons";

const allEpisodes = [
    {
        name: "Episode one",
        season: "Season 1"
    },
    {
        name: "Episode two",
        season: "Season 1"
    },
    {
        name: "Episode three",
        season: "Season 2"
    }
];

/* jest.mock("./formatSeasons.js");
console.log(mockFormatSeasons); */

test("It returns an Object of Arrays with Seasons as keys", () => {
    const seasons = formatSeasons(allEpisodes);

    expect(Object.keys(seasons)).toHaveLength(2);
})