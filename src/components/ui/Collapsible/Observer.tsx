"use client";
import React, { useRef, useEffect, useState, ReactElement } from "react";
import { Expander } from "./Expander";
import styles from "./style.module.scss";

interface ObserverProps {
  children: ReactElement;
  className: string;
  expanderClass?: string;
}

interface EntriesType {
  [key: string]: boolean;
}

export const Observer = ({
  children,
  className,
  expanderClass,
}: ObserverProps): JSX.Element => {
  const navRef = useRef<HTMLDivElement>(null);
  const [visibilityMap, setVisibilityMap] = useState<EntriesType>({});
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const updatedEntries: EntriesType = {};
    entries.forEach((entry) => {
      const target = entry.target as HTMLDivElement;
      const targetid = target.dataset.targetid as string;
      if (entry.isIntersecting) {
        updatedEntries[targetid] = true;
      } else {
        updatedEntries[targetid] = false;
      }
    });

    setVisibilityMap((prev) => ({
      ...prev,
      ...updatedEntries,
    }));
  };
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: navRef.current,
      threshold: 1,
    });

    if (navRef.current) {
      Array.from(navRef.current.children).forEach((item: any) => {
        if (item.dataset.targetid) {
          observer.observe(item);
        }
      });
    }

    return () => observer.disconnect();
  }, [children]);
  return (
    <div ref={navRef} className={className}>
      {React.Children.map(children, (child: ReactElement) => {
        return React.cloneElement(child, {
          className: visibilityMap[child.props["data-targetid"]]
            ? styles.visible
            : styles.hidden,
        });
      })}
      <Expander visibilityMap={visibilityMap} className={expanderClass} />
    </div>
  );
};
