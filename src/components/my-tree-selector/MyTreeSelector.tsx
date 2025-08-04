import React, { useEffect } from "react";
import styles from "./MyTreeSelector.less";

const MyTreeSelect = () => {
  useEffect(() => {
    console.log("Styles object:", styles);
  }, []);

  return (
    <div className={styles.mySelector}>
      Styled Component Text
    </div>
  );
};

export default MyTreeSelect;