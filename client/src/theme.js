import chroma from "chroma-js";

const theme = {
  backgroundColor: chroma(50, 50, 50).hex(),

  primaryColor: chroma(180, 180, 180).hex(),
  primaryColorLighter: chroma(180, 180, 180).brighten().hex(),
  primaryColorDarker: chroma(180, 180, 180).darken().hex(),
};

export default theme;
