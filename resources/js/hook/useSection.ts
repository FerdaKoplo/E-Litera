import React, { useEffect, useMemo, useRef } from 'react'


export const useSectionRefs = (navList: { key: string }[]) => {
    const refs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});

    useEffect(() => {
        navList.forEach((section) => {
            if (!refs.current[section.key]) {
                refs.current[section.key] = React.createRef<HTMLDivElement>();
            }
        });
    }, [navList]);

    return refs.current;
};
