import { createCache } from 'swr';

export const { cache, mutate } = createCache(new Map());

export function matchMutate(
  matcher: string | RegExp,
  data?: any,
  shouldRevalidate = true
) {
  const keys = [];

  if (matcher instanceof RegExp) {
    for (const k of Array.from((cache as Map<string, any>).keys())) {
      if (matcher.test(k)) {
        keys.push(k);
      }
    }
  } else {
    keys.push(matcher);
  }

  const mutations = keys.map((k) => mutate(k, data, shouldRevalidate));

  return Promise.all(mutations);
}
