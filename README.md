# AquaFall AI — SIH Demo Dashboard

A responsive, dark-only frontend concept for **AquaFall AI**, an AI/ML heavy-rainfall early-warning and inundation prediction system for the India Meteorological Department / Ministry of Earth Sciences.

The interface is a presentation prototype: every alert, model output, and weather value is clearly shown as simulated demo data. It does not make operational flood decisions.

## Run locally

1. Install the current LTS release of [Node.js](https://nodejs.org/).
2. Open a terminal in this folder.
3. Run `npm install` once.
4. Run `npm run dev` and open the local address shown in the terminal.

For a production-style build, run `npm run build`.

## Included demo interactions

- District queue updates the selected risk item.
- Search filters the district queue.
- Map layer switch toggles the layer label.
- Forecast control changes between play and pause state.
- The layout adapts from a presentation desktop screen down to mobile.
