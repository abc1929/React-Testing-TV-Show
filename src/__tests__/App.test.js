import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("Testing that the document renders", async () => {
   // let appcontainer = null;
   const appcontainer = render(<App />);

   await waitFor(async () => {
      await appcontainer.getByText(/select a season/i);
      return;
   });

   expect(
      appcontainer.getByText(
         /As friends, family and local police search for answers/i
      )
   ).toBeTruthy();
});

test("Dropdown behaves normally", async () => {
   const appcontainer = render(<App />);

   await waitFor(async () => {
      await appcontainer.getByText(/select a season/i);
      return;
   });

   const btn = appcontainer.getByText(/select a season/i);

   userEvent.click(btn);
   expect(appcontainer.getByText(/season 2/i)).toBeTruthy();

   expect(appcontainer.getByText(/season 4/i)).toBeTruthy();
});
test("Can select a season from initial state", async () => {
   const appcontainer = render(<App />);

   await waitFor(async () => {
      await appcontainer.getByText(/select a season/i);
      return;
   });

   const btn = appcontainer.getByText(/select a season/i);

   userEvent.click(btn);
   userEvent.click(appcontainer.getByText(/season 3/i));

   expect(screen.getByText("Chapter Five: The Flayed")).toBeTruthy();
});

test("Can select a different season from a selected state", async () => {
   const appcontainer = render(<App />);

   await waitFor(async () => {
      await appcontainer.getByText(/select a season/i);
      return;
   });

   const btn = appcontainer.getByText(/select a season/i);

   userEvent.click(btn);
   userEvent.click(appcontainer.getByText(/season 3/i));

   expect(
      screen.getByText(/While the girls try to find the missing lifeguard/i)
   ).toBeTruthy();

   userEvent.click(appcontainer.getAllByText("Season 3")[0]);
   userEvent.click(appcontainer.getByRole("option", { name: /Season 1/i }));

   expect(screen.getByText(/Chapter Three: Holly, Jolly/i)).toBeTruthy();
});
