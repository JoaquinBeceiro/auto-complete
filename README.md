# Auto complete component example

This is an example auto-complete component. It is asynchronous using a fake API call and has a pseudo cache to save the results and avoid duplicated api calls.
The input timeout between keys is `500ms` and could be changed [here](https://github.com/JoaquinBeceiro/auto-complete/blob/1e6e532f59e0518654bb6e7a6eb04cb4ee02d50a/src/components/autoComplete/index.tsx#L7).
Also the fake api timeout its a random between `300ms` and `1000ms` [here](https://github.com/JoaquinBeceiro/auto-complete/blob/1e6e532f59e0518654bb6e7a6eb04cb4ee02d50a/src/services/index.ts#L4-L5).
There is a simulation so that 10% of API calls fail according to a random number [here](https://github.com/JoaquinBeceiro/auto-complete/blob/f2d529ad528ed79e8116db1cae70ec8f8ef3bbf6/src/services/index.ts#L12).


## Start

1. Clone this project
`git clone git@github.com:JoaquinBeceiro/auto-complete.git`
2. Install dependencies `pnpm install`
3. Run the project `pnpm run dev`

## Example

There is an example working in Netlify
### [Netlify Example](https://joaquin-autocomplete.netlify.app/)