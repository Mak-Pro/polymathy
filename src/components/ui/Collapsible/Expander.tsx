import React, { useState, useMemo } from "react";
import styles from "./style.module.scss";

interface VisibilityMap {
  [key: string]: boolean;
}

interface ExpanderProps {
  visibilityMap: VisibilityMap;
  className?: string;
}

export const Expander = ({
  visibilityMap,
  className,
}: ExpanderProps): JSX.Element | null => {
  const [expandItemsLength, setExpandItemsLength] = useState<number>(0);

  const shouldShowMenu = useMemo(() => {
    setExpandItemsLength(
      Object.values(visibilityMap).filter((value) => value !== true).length
    );
    return Object.values(visibilityMap).some((v) => v === false);
  }, [visibilityMap]);
  if (!shouldShowMenu) {
    return null;
  }

  return (
    <div
      className={`${styles.collapsible_expander} ${className ? className : ""}`}
    >
      <span>...</span>
    </div>
  );
};
