import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

interface IThemeInterface {
  headerColor: string;
  bgColor: string;
  greyColor: string;
  blackColor: string;
  blueColor: string;
  boxBorder: string;
  randColor: string;
  whiteColor: string;
  darkBlueColor: string;
  size: string;
  bg: string;
  borderRadius: string;
  font: string;
  fontColor: string;
  fontSize: string;
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<IThemeInterface>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
