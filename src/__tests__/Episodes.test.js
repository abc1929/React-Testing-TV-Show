import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { data } from "../mockdata.js";
import { formatSeasons } from "../utils/formatSeasons";
import Episodes from "../components/Episodes";

test("Testing that the component renders", () => {
   const episodecontainer = render(<Episodes episodes={[]} />);
   expect(episodecontainer).toBeTruthy();
});

test("Episodes renders for a season", () => {
   const temp = data[0]._embedded.episodes;
   const episodecontainer = render(
      <Episodes episodes={formatSeasons(temp)["Season 2"]} />
   );
   expect(
      episodecontainer.getByText(
         /El travels to Chicago to find her sister Eight, aka Kali, who has teamed up with other outcasts to kill the men who tormented her at Hawkins Labs./i
      )
   ).toBeTruthy();
});

test("Episodes can change for different seasons", () => {
   const temp = data[0]._embedded.episodes;
   const episodecontainer = render(
      <Episodes episodes={formatSeasons(temp)["Season 2"]} />
   );
   expect(
      episodecontainer.getByText(
         /El travels to Chicago to find her sister Eight, aka Kali, who has teamed up with other outcasts to kill the men who tormented her at Hawkins Labs./i
      )
   ).toBeTruthy();

   episodecontainer.rerender(
      <Episodes episodes={formatSeasons(temp)["Season 3"]} />
   );
   expect(
      episodecontainer.getByText(/Max to help them learn who the Mind/i)
   ).toBeTruthy();
   expect(
      episodecontainer.getByText(/The Case of the Missing Lifeguard/i)
   ).toBeTruthy();
});
