import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { Activity } from '../models/Activity';
import useSWR from 'swr';
import { ResultsObject } from '../models/ResultsObject';
import { ActivityType } from '../models/ActivityType';
import { useUserProperties } from '../hooks/useUserProperties';

interface HeaderMessageProps {}

export default function HeaderMessage({}: HeaderMessageProps) {
  const [key, setKey] = useState(1);

  let timeTak = 15000;

  const first: string = 'Diese Software ist ein Angebot vom I LOVE YOU CHURCH';
  const second: string = 'The Church the Place to be';
  const three: string = 'lass uns gemeinsam den Herrn ehren';

  const array: string[] = Array.of(first, second, three);

  const [item, setItem] = useState<string>('');

  let eventCount = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      if (eventCount < array.length) {
        setItem(array[eventCount]);
        eventCount++;
      } else {
        eventCount = 0;
        setItem(array[eventCount]);
      }
    }, timeTak);
    return () => clearInterval(interval);
  }, []);

  const scrolling = useSpring({
    from: { transform: 'translate(80%,20%)' },
    to: { transform: 'translate(20%,80%)' },
    position: 'relative',
    config: { duration: 1000 },
    skipAnimation: true,
    reset: true,
    //reverse: key % 2 == 0,
    onRest: () => {}
  });

  return (
    <div key={key}>
      <animated.div style={scrolling}>
        <h1>{item}</h1>
      </animated.div>
    </div>
  );
}
