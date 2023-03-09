This project contains two challenges - a "Ticket Breakdown" challenge and a
"Refactoring" challenge. The two challenges are unrelated, but you should
complete both in the same folder and share the link in Coderbyte. Any written
answers should be included in markdown files within this folder.

## [Ticket Breakdown](Ticket_Breakdown.md)

- Ticket 1: Custom IDs for Agents. Description: We need to let Facilities use
  their own IDs for Agents.

- Ticket 2: Custom IDs in Shift Responses. Description: We need to show Agents'
  custom IDs in Shift responses.

## [Refactoring](Refactoring.md)

If you are a JS novice, here's how to get started:

1. [Install Node.js](https://nodejs.org/en/download/) (we use `^16`, the latest
   LTS)
2. Run `npm i` in this repo to install dependencies
3. Run `npm test` to run the automated tests
4. Run `npm start` to launch `index.js` for any manual testing

### Refactoring explanation

- Added a new variable called `newKey` to avoid computing the hash function
  unnecessarily when the `event.partitionKey` is already valid.
- Changed the signature of the newPartitionKey function to pass
  `MAX_PARTITION_KEY_LENGTH` as a parameter to ensure consistency throughout the
  code.
- Added a check for the length of `newKey` before returning to ensure that it does
  not exceed the `MAX_PARTITION_KEY_LENGTH`.
- Create new single purposed functions and renamed variables to be more
  descriptive and consistent with the function's purpose, making the code more
  readable.
