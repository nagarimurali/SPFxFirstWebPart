/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
// import styles from './SpFxFirstWebpart.module.scss';
import type { ISpFxFirstWebpartProps } from "./ISpFxFirstWebpartProps";
import App from "../../../Code/components/App";
// import { escape } from '@microsoft/sp-lodash-subset';

const SpFxFirstWebpart = (props: ISpFxFirstWebpartProps) => {
  return <App context={props.context} />;
};
export default SpFxFirstWebpart;
