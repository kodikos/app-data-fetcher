# App Data Fetcher

This is a small test project simulating part of a bigger application that has a settings screen that can control the behaviour of data fetching in other parts of the codebase. I'm not sure on the cleanest approach to this, so wanted to look into possible solutions. The application's true purpose I can't reveal, but it's along the lines of a monitoring app that has different sets of things to monitor, and you can click on links in the monitor data to view details of particular things. We need only be concerned with what endpoint it's looking at, and how up to date it is.

I'll keep main branch as the one with the original problem, then run experiments in branches.

I'll also state my ~bias~approach. I'm intending to not use redux, I see it as global state and pub/sub in one library. I also tend to not like using data components, I prefer JSX to be describing just the rendering, not defining data sources. But if it does truly keep the code tidy, so be it! I'm willing to see how contexts or hooks might help, but I need to understand how to refactor the code into them, so they might be a final refinement.

## Project Goals

The aim of this experiment is to add the following functionality:
1. That pressing the Go button causes the content to load from the path in the prefix field, even if the value of prefix is unchanged
2. That a refresh takes place periodically, the period set by the form too
3. That URLs can appear in the content and be clicked on, and they would update the prefix field
4. To keep the top App class as uncluttered as possible

Other invariants:
- Components must fully isolate, as per React guidelines
- The SettingsForm must remain at the top level (think of it as an overlaid menu)
- A refresh period of 0 stops the refreshing, though the Go button would keep working


## Application overview

There are only 3 classes, loosely representing the structure of the bigger app being modelled. The application in question loads data into a data area, `ContentFetcher`. 

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
