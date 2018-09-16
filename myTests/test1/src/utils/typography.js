import Typography from "typography";
import obt from "typography-theme-ocean-beach";

obt.baseFontSize = 16;
obt.baseLineHeight = 1.21;
obt.headerWeight = 400;

const typography = new Typography(obt);

export default typography;
export const rhythm = typography.rhythm;
