import { useSWRConfig } from 'swr';

export function MatchMutate(
  matcher: string | RegExp,
  data?: any,
  shouldRevalidate = true
) {
  const { cache, mutate } = useSWRConfig();

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
