import chroma from "chroma-js";

function elevateColor(hex, elevation) {
  return chroma.mix(hex, "white", elevation, "rgb");
}

function getDarkTheme() {
  return {
    elevate01dp: (hex) => elevateColor(hex, 0.05),
    elevate02dp: (hex) => elevateColor(hex, 0.07),
    elevate03dp: (hex) => elevateColor(hex, 0.08),
    elevate04dp: (hex) => elevateColor(hex, 0.09),
    elevate06dp: (hex) => elevateColor(hex, 0.11),
    elevate08dp: (hex) => elevateColor(hex, 0.12),
    elevate12dp: (hex) => elevateColor(hex, 0.14),
    elevate16dp: (hex) => elevateColor(hex, 0.15),
    elevate24dp: (hex) => elevateColor(hex, 0.16),

    backgroundColor: "#121212",
    onBackgroundColor: "#FFFFFF",

    primaryColor: "#BB86FC",
    onPrimaryColor: "#000000",
    secondaryColor: "#03DAC6",
    onSecondaryColor: "#000000",

    errorColor: "#CF6679",
    onErrorColor: "#000000",

    surfaceColor: "#121212",
    onSurfaceColor: "#FFFFFF",
    borderColor00dp: chroma.mix("#121212", "white", 0.16, "rgb"),

    highEmphasisOpacity: 0.87,
    mediumEmphasisOpacity: 0.6,
    disabledTextOpacity: 0.38,

    iconColor: chroma(255, 255, 255).hex(),
    iconColorHighlighted: chroma(255, 255, 255).darken(2).hex(),
  };
}

function getDarkThemeExtended() {
  const darkTheme = getDarkTheme();

  const darkPrimary = chroma.mix(
    darkTheme.backgroundColor,
    darkTheme.primaryColor,
    0.08,
    "rgb"
  );

  return Object.assign(darkTheme, {
    backgroundColor: darkPrimary,
    surfaceColor: darkPrimary,
  });
}

export default getDarkThemeExtended();
